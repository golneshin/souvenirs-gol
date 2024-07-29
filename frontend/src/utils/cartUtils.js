     
export const addDecimals = (num) => {
  return (Math.round(num*100)/100).toFixed(2)
};

export const updateCart = (state) => {
  // calculate item's price:
  // 1- all items price before tax and shipping price. "acc" is sum of previous items price.
  state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  // 2- shipping price.( more than 100$ is free ).
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
  // 3- tax price. (15% tax)
  state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed(2))
  // total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2)

  localStorage.setItem('cart', JSON.stringify(state))

  return state
};