import { createSlice } from "@reduxjs/toolkit";

function getCartFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("cart")) || {
      calculator: { products: [], price: 0, amount: 0 },
    }
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage,
  reducers: {
    addProduct: (state, { payload }) => {
      const item = state.calculator.products.find(
        (product) => product.id == payload.id
      );
      if (item) {
        item.amount += payload.amount;
      } else {
        state.calculator.products.push(payload);
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    changeAmount: (state, { payload }) => {
      const item = state.calculator.products.find(
        (item) => item.id == payload.id
      );
      if (payload.type == "increase") {
        item.amount += 1;
      } else {
        item.amount -= 1;
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeAll: (state, { payload }) => {
      state.calculator = { products: [], amount: 0, price: 0 };
    },
    removeProduct: (state, { payload }) => {
      state.calculator.products = state.calculator.products.filter((item) => {
        return item.id != payload;
      });
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      let price = 0;
      let amount = 0;

      state.calculator.products.forEach((item) => {
        let allPrices = item.prise * item.amount;
        price += allPrices;
        amount += item.amount;
      });

      state.calculator.amount = amount;
      state.calculator.price = price;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addProduct, changeAmount, removeProduct, calculateTotal, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
