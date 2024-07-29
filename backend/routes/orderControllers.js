import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { calcPrices } from '../utils/calcPrices.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // Get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        console.error(`Product not found in DB: ${itemFromClient._id}`);
        res.status(400);
        throw new Error(`Product not found in database: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // Log the state of dbOrderItems before proceeding
    // console.log('dbOrderItems:', JSON.stringify(dbOrderItems, null, 2));

    // Calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    if (!req.user || !req.user._id) {
      res.status(400);
      throw new Error('req.user from protect middleware is empty');
    }

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});


// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user', 'name email'
  )
  if(order) {
    res.status(200).json(order)
  }else{
    res.status(404)
    throw new Error('No Order founded for getOrderById')
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isPaid = true,
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)
  }else{
    res.status(404)
    throw new Error('Not found any order')
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = order.save()
    res.status(200).json(updatedOrder)
  }else{
    res.status(404)
    throw new Error('No Order')
  }
});

// @desc    get all orders
// @route   GET /api/orders
// @access  Private
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200).json(orders)
});

// @desc    get order by user ID
// @route   GET /api/orders/p/userId
// @access  Private / Admin
export const getOrdersByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const userOrders = await Order.find({user : userId})
  
  if(userOrders) {
    res.status(200).json(userOrders)
  }else{
    res.status(404)
    throw new Error('No Order founded for getOrderById')
  }
});
