const express = require("express");
const router = express.Router();
const { User, Order, Sample } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

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

module.exports = router;