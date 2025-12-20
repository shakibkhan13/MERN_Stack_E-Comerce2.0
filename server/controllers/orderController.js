import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
//     const status = req.query.status;
//     const paymentStatus = req.query.paymentStatus;

//     const filter = {};
//     if (status && status !== "all") {
//         filter.status = status;
//     }

//     if (paymentStatus && paymentStatus !== "all") {
//       if (paymentStatus === "paid") {
//         filter.status = { $in: ["paid", "completed"] };
//       }
//       if (paymentStatus === "pending") {
//         filter.status = "pending";
//       }
//       if (paymentStatus === "cancelled") {
//         filter.status = "cancelled";
//       }
//     }


//     const skip = (page - 1) * perPage;

//     const orders = await Order.find(filter)
//         .populate("userId", "name email")
//         .populate("items.productId", "name price image")
//         .sort({ createdAt: sortOrder })
//         .skip(skip)
//         .limit(perPage);

//     const total = await Order.countDocuments(filter);
//     const totalPages = Math.ceil(total / perPage);

//     const transformedOrders = orders.map((order) => ({
//       _id: order._id,
//       orderId: `ORD-${order._id.toString().slice(-6).toUpperCase()}`,
//       user: {
//         _id: order.userId._id,
//         name: order.userId.name,
//         email: order.userId.email,
//       },
//       items: order.items.map((item) => ({
//         product: {
//           _id: item.productId._id,
//           name: item.productId.name,
//           price: item.productId.price,
//           image: item.productId.image,
//         },
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       totalAmount: order.total,
//       status: order.status,
//       paymentStatus:
//         order.status === "paid" || order.status === "completed"
//           ? "paid"
//           : order.status === "cancelled"
//           ? "cancelled"
//           : "pending",
//       shippingAddress: order.shippingAddress || {
//         street: "N/A",
//         city: "N/A",
//         state: "N/A",
//         zipCode: "N/A",
//         country: "N/A",
//       },
//       createdAt: order.createdAt,
//       updatedAt: order.updatedAt,
//     }));

//     res.json({
//         orders: transformedOrders,
//         total,
//         totalPages,
//         currentPage: page,
//     });
// });

// GET /orders

export const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const status = req.query.status;
  const paymentStatus = req.query.paymentStatus;

  const filter = {};

  if (status && status !== "all") {
    filter.status = status;
  }

  if (paymentStatus && paymentStatus !== "all") {
    if (paymentStatus === "paid") {
      filter.status = { $in: ["paid", "completed"] };
    }
    if (paymentStatus === "pending") {
      filter.status = "pending";
    }
    if (paymentStatus === "cancelled") {
      filter.status = "cancelled";
    }
  }

  const skip = (page - 1) * perPage;

  const orders = await Order.find(filter)
    .populate("userId", "name email")
    .populate("items.productId", "name price image")
    .sort({ createdAt: sortOrder })
    .skip(skip)
    .limit(perPage);

  const total = await Order.countDocuments(filter);

  res.json({
    success: true,
    orders,
    total,
    totalPages: Math.ceil(total / perPage),
    currentPage: page,
  });
});


export const getOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({
        userId: req.user._id,
    })
        .populate("items.productId", "name price image")
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: orders.length,
        orders,
    });
});


export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("userId", "name email")
        .populate("items.productId", "name price image");
    
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    const isOwner = order.userId._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error("Not authorized to view this order");
    }

    res.json({
        success: true,
        order
    });
}); 


export const createOrderFormCart = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || !items.length) {
    res.status(400);
    throw new Error("Cart items required");
  }

  if (
    !shippingAddress?.street ||
    !shippingAddress?.city ||
    !shippingAddress?.country ||
    !shippingAddress?.postalCode
  ) {
    res.status(400);
    throw new Error("Complete shipping address required");
  }

  const validItems = items.map((item) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const total = validItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    userId: req.user._id,
    items: validItems,
    total,
    status: "pending",
    shippingAddress,
  });

  res.status(201).json({
    success: true,
    order,
  });
});


export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, paymentIntentId, stripeSessionId } = req.body;

  const validStatuses = ["pending", "paid", "completed", "cancelled"];
  if (!status || !validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (req.user) {
    const isOwner = order.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && !isOwner) {
      res.status(403);
      throw new Error("Not authorized");
    }

    if (!isAdmin && order.status !== "pending") {
      res.status(403);
      throw new Error("Only admin can update after payment");
    }
  }

  order.status = status;
  order.updatedAt = new Date();

  if (status === "paid") {
    order.paidAt = new Date();
    if (paymentIntentId) order.paymentIntentId = paymentIntentId;
    if (stripeSessionId) order.stripeSessionId = stripeSessionId;
  }

  await order.save();

  res.json({
    success: true,
    order,
    message: `Order status updated to ${status}`,
  });
});



export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized");
  }

  await order.deleteOne();

  res.json({
    success: true,
    message: "Order deleted successfully",
  });
});
