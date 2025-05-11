const express = require("express");
const router = express.Router();
const { User, Order, Sample } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require('sequelize');

//Get -all samples
router.get('/', async (req, res) => {
    try{
        const allSamples = await Sample.findAll({
            include: [
                {
                    model: Order,
                    attributes: [
                        "id",
                        "status",
                        "number_of_samples",
                    ]
                }
            ]
        })

        return res.json({
            Samples: allSamples
        })
    } catch (error) {
        console.log("Error fetching samples:", error)
        return res.status(500).json({ message: "Internal Server Error"})
    }
})

//Get samples by user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    try {
        const userSamples = await Sample.findAll({
            where: {userId: userId},
            include: [
                {
                    model: Order,
                    attributes: [
                        "id",
                        "status"
                    ]
                    
                }
            ],
            attributes: [
                "id",
                "sample_name",
                "sample_type",
                "test_type",
                "status",
                "createdAt",
                "updatedAt",
            ]
        })

        return res.json({
            userSamples: userSamples
        })

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

// GET /api/samples/search?term=flower
router.get('/search', requireAuth, async (req, res) => {
    const { term } = req.query;

    try {
        let searchConditions = {};

        // Only restrict to userId if the user is a client
        if (req.user.role === 'client') {
            searchConditions.userId = req.user.id;
        }

        let searchTerms = [];

        if (term) {
            if (["R&D", "Full Compliance"].includes(term)) {
                searchTerms.push({ test_type: { [Op.eq]: term } });
            } else if (["Flower", "Concentrate", "Injestible", "Oil"].includes(term)) {
                searchTerms.push({ sample_type: { [Op.eq]: term } });
            }

            if (!isNaN(term)) {
                searchTerms.push({ id: term }); 
                searchTerms.push({ sample_name: { [Op.like]: `%${term}%` } });
            } else {
                searchTerms.push({ sample_name: { [Op.like]: `%${term}%` } });
            }

            if (searchTerms.length > 0) {
                searchConditions[Op.or] = searchTerms;
            }
        }

        const samples = await Sample.findAll({
            where: searchConditions
        });

        res.json({ samples });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});






//Get - sample details
router.get("/:sampleId", async (req, res) => {
    const sampleId = req.params.sampleId

    try {
        const sample = await Sample.findByPk(sampleId)

        if(!sample){
            return res.status(404).json({
                error: "Sample not found"
            })
        }
        return res.json(sample)
    } catch {
        console.error(error)
        return res.status(500).json({error: "An error occured while fetching sample details"})
    }
})

//Post - create a sample
router.post("/current", requireAuth, async (req, res) => {
    const userId = req.user.id

    const {
        sample_name,
        sample_type,
        test_type,
        orderId
        } = req.body

    try {
        const newSample = await Sample.create({
            userId: userId,
            sample_name: sample_name,
            sample_type: sample_type,
            test_type: test_type,
            orderId: orderId,
            status: 'placed',
            result: null
        })

        return res.status(201).json(newSample)
    } catch (error) {
    console.error("Sample creation error:", error);
    return res
        .status(500)
        .json({ error: "An error occurred during sample creation" });
    }
})

//PUT - update a sample
router.put("/:sampleId", requireAuth, async (req, res) => {
    const sampleId = req.params.sampleId
    const {sample_name, sample_type, test_type} = req.body

    if(!sample_name || !sample_type || !test_type){
        return res.status(400).json({
            message: "Bad request",
            errors: {
                sample_name: "New sample name is required",
                sample_type: "New sample type is required",
                test_type: "New test type is required"
            }
        })
    }

    const sample = await Sample.findByPk(sampleId)

    if(!sample){
        return res.status(400).json({
            message: "Sample not found"
          })
    }

    if(sample.userId !== req.user.id){
        res.status(400).json({
            error: "Must be owner to edit this sample"
        })
    }

    await sample.update({
        sample_name,
        sample_type,
        test_type
    })

    return res.json(sample)
})



// Delete - delete a sample
router.delete("/:sampleId", requireAuth, async (req, res) => {
    const sampleId = req.params.sampleId
    const sample = await Sample.findByPk(sampleId)

    if(!sample){
        return res.status(400).json({
            message: "Sample not found"
        })
    }

    if(sample.userId !== req.user.id){
        res.status(400).json({
            error: "Must be owner to delete this sample"
        })
    }

    sample.destroy()

    res.status(200).json({
        message: "Successfully deleted"
    })
})

module.exports = router;