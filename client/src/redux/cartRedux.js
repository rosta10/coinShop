import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    totalAmount: 0,
    //shippingCost: 150, nefunguje
    shippingDiscount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
          state.quantity += 1;
          state.products.push(action.payload);
          state.total += action.payload.price * action.payload.quantity;
          updateShippingDiscount(state);
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
      updateShippingDiscount(state);
    },

    decreaseQuantity(state, action) {
      state.products.map((cartProduct) => {
        if (cartProduct._id === action.payload._id) {
          if(cartProduct.quantity > 1){
            cartProduct.quantity -= 1;
            state.total -= action.payload.price;
            updateShippingDiscount(state);
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
          updateShippingDiscount(state);
        }
        
        localStorage.setItem("products", JSON.stringify(state.products));
        return state;
      });
    },
  },
});

function updateShippingDiscount(state) {
  state.shippingCost = state.total === 0 ? 0 : 150; //když jsem nastavil hodnotu v slideReducer, tak se mi pokaždé ukazovala hodnota jako undefined
  state.shippingDiscount = state.total >= 1000 ? -state.shippingCost : 0;
  state.totalAmount = state.total + state.shippingCost + state.shippingDiscount;
}

export const { addProduct, removeFromCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
