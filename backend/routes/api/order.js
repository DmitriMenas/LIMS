const express = require("express");
const router = express.Router();
const { User, Order, Sample } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// GET  - all orders
router.get("/", async (req, res) => {
  console.log('made it to the route')
  try {
    const allOrders = await Order.findAll({
      include: [
        { model: Sample,
          attributes: [
            "id",
            "sample_name",
            "sample_type",
            "test_type",
            "status",
            "createdAt",
            "updatedAt",
          ],
         }],
         attributes: [
          "id",
          "status",
          "total_price",
          "number_of_samples",
          "createdAt",
          "updatedAt",
        ],
    });

    return res.json({
      Orders: allOrders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET - orders by user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    let { page = 1, size = 20, orderId, status } = req.query;

    page = Number(page);
    size = Number(size);

    // Validate page
    if (isNaN(page) || page < 1) {
        return res.status(400).json({
        message: "Bad Request",
        errors: { page: "Page must be greater than or equal to 1" },
        });
    }

    // Validate size
    if (isNaN(size) || size < 1 || size > 20) {
        return res.status(400).json({
        message: "Bad Request",
        errors: { size: "Size must be between 1 and 20" },
        });
    }
  
    try{
        const userOrders = await Order.findAll({
            where: {userId: userId},
            include: [
              { model: Sample,
                attributes: [
                  "id",
                  "sample_name",
                  "sample_type",
                  "test_type",
                  "status",
                  "createdAt",
                  "updatedAt",
                ],
               },
               {model: User}
              ],
               attributes: [
                "id",
                "status",
                "total_price",
                "number_of_samples",
                "createdAt",
                "updatedAt",
              ],
        })
        return res.json({
            userOrders: userOrders,
            page,
            size
        })
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

// Get - order details
router.get("/:orderId", async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Sample,
                    attributes: [
                        "id",
                        "sample_name",
                        "sample_type",
                        "test_type",
                        "collection_date",
                        "received_date",
                        "status",
                        "result",
                        "createdAt",
                        "updatedAt"
                    ]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                error: "Order not found"
            });
        }

        return res.json(order); // Send the order details as the response

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching order details." });
    }
});

//POST - create an order
router.post("/current", requireAuth, async (req, res) => {
  const { number_of_samples } = req.body;

  if (!number_of_samples) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newOrder = await Order.create({
      userId: req.user.id,
      status: "placed",
      total_price: 69 * number_of_samples,
      number_of_samples,
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during order creation" });
  }
});

//PUT - update an order
router.put("/:orderId", requireAuth, async (req, res) => {
  const orderId = req.params.orderId
  const { number_of_samples } = req.body

  if(!number_of_samples){
    return res.status(400).json({
      message: "Bad request",
      errors: {
        number_of_samples: "Number of samples is required"
      }
    })
  }

  const order = await Order.findByPk(orderId)

  if(!order){
    return res.status(400).json({
      message: "Order not found"
    })
  }

  if(order.userId !== req.user.id){
    res.status(400).json({
      error: "Must be owner to edit this order"
    })
  }

  await order.update({
    number_of_samples
  })

  return res.json(order)

})

//Delete - delete an order
router.delete("/:orderId", requireAuth, async (req, res) => {
  const orderId = req.params.orderId
  const order = await Order.findByPk(orderId)
  const samples = await Sample.findAll({
    where: {
      orderId: orderId
    }
  });

  if (samples.length === 0) {
    return res.status(404).json({ error: 'Samples not found in specified order' });
  }

  if(!order){
    return res.status(400).json({
      message: "Order not found"
    })
  }

  if(order.userId !== req.user.id){
    res.status(400).json({
      error: "Must be owner to delete this order"
    })
  }

  for (const sample of samples) {
      if (sample.userId !== req.user.id) {
          return res.status(403).json({ error: 'Unauthorized to delete this sample' });
      }
      await sample.destroy(); // Delete the samples
  }

  order.destroy()

  res.status(200).json({
    message: "Successfuly deleted"
  })

})



module.exports = router;
