import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors';

dotenv.config()

import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Order.deleteMany()
    await Product.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(product => {
      return {...product, user: adminUser}
    })
    await Product.insertMany(sampleProducts)
    console.log('Data Imported'.green.inverse)
    process.exit(1)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Order.deleteMany()
    await Product.deleteMany()

    console.log('Data destroyed'.red.inverse)
    process.exit(1)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}