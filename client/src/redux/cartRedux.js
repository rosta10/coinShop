import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    shippingCost: 150,
    shippingDiscount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
          state.quantity += 1;
          state.products.push(action.payload);
          state.total += action.payload.price * action.payload.quantity;
          state.shippingDiscount = state.total >= 1000 ? -state.shippingCost : 0;
      },

    removeFromCart(state, action) {
      state.products.map((cartProduct) => {
        if (cartProduct._id === action.payload._id) {
          const nextCartProduct = state.products.filter(
            (product) => product._id !== cartProduct._id
          );
          state.products = nextCartProduct;
        }
        
        localStorage.setItem("products", JSON.stringify(state.products));
        return state;
      });
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
      state.shippingDiscount = state.total >= 1000 ? -state.shippingCost : 0;
    },

    decreaseQuantity(state, action) {
      state.products.map((cartProduct) => {
        if (cartProduct._id === action.payload._id) {
          if(cartProduct.quantity > 1){
            cartProduct.quantity -= 1;
            state.total -= action.payload.price;
            state.shippingDiscount = state.total >= 1000 ? -state.shippingCost : 0;
          }
        }
        localStorage.setItem("products", JSON.stringify(state.products));
        return state;
      });
    },

    increaseQuantity(state, action) {
      state.products.map((cartProduct) => {
        if (cartProduct._id === action.payload._id) {
          cartProduct.quantity += 1;
          state.total += action.payload.price;
          state.shippingDiscount = state.total >= 1000 ? -state.shippingCost : 0;
        }
        
        localStorage.setItem("products", JSON.stringify(state.products));
        return state;
      });
    },
  },
});

export const { addProduct, removeFromCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
