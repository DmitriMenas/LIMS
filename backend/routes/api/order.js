const express = require("express");
const router = express.Router();
const { User, Order, Sample } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// GET  - all orders
router.get("/", async (req, res) => {
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

  // Validate orderId (optional)
  if (orderId !== undefined) {
    orderId = Number(orderId);
    if (isNaN(orderId) || orderId < 1) {
      return res.status(400).json({
        message: "Bad Request",
        errors: { orderId: "Order Id must be greater than 0" },
      });
    }
  }

  // Validate status (optional)
  const validStatuses = ["in progress", "completed", "placed"];
  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        status: "Order Status must be paid, in progress, or completed.",
      },
    });
  }

  const where = {};
  if (orderId) where.id = orderId;
  if (status) where.status = status;

  try {
    const allOrders = await Order.findAll({
      where,
      limit: size,
      offset: (page - 1) * size,
      include: [{ model: Sample }],
      attributes: [
        "id",
        "sample_type",
        "test_type",
        "status",
        "total_price",
        "number_of_samples",
        "createdAt",
        "updatedAt",
      ],
    });

    return res.json({
      Orders: allOrders,
      page,
      size,
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
            include: [{model: User}, {model: Sample}],
            attributes: [
                "id",
                "status",
                "total_price",
                "number_of_samples",
                "createdAt",
                "updatedAt",
            ]
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

module.exports = router;
