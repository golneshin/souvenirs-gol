import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = 
  localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {cartItems: []}

// In this slice we want to manage the state of items in the Cart.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTOCart: (state, action) => {
      // item that user has clicked to add to cart
      const item = action.payload
      // check if it is existed in user's cart items
      const existItem = state.cartItems.find((x) => x._id === item._id)
      // if it is exsited in user's cart items then just update it.
      if (existItem) {
        // if the action id is equal to one of the cart items id then update else just keep it.
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
      } else {
        // if it doesnt exist in cart items then add the action item to the car items.
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state)
    },

    incrementQty: (state, action) => {
      const item = state.cartItems.find(x => x._id === action.payload);
      if (item && item.qty < item.countInStock) {
        item.qty += 1;
      }
      return updateCart(state)
    },

    decrementQty: (state, action) => {
      const item = state.cartItems.find(x => x._id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
      return updateCart(state)
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
      return updateCart(state)
    }
    
  }
})

export const { addTOCart, incrementQty, decrementQty, removeFromCart } = cartSlice.actions
// for store.js file
export default cartSlice.reducer