//redux toolkit
import { createSlice } from "@reduxjs/toolkit";

function dataFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      isAuthState: false,
      calculator: { products: [], price: 0, amount: 0 },
      user: null
    }
  );
}

const userSlice = createSlice({
  name: "user",
  initialState: dataFromLocalStorage,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthChange: (state) => {
      state.isAuthState = true;
    },
    addProduct: (state, { payload }) => {
      const item = state.calculator.products.find(
        (product) => product.id == payload.id
      );
      if (item) {
        item.amount += payload.amount;
      } else {
        state.calculator.products.push(payload);
      }
      userSlice.caseReducers.calculateTotal(state);
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
      userSlice.caseReducers.calculateTotal(state);
    },
    removeAll: (state, { payload }) => {
      state.calculator = { products: [], amount: 0, price: 0 };
    },
    removeProduct: (state, { payload }) => {
      state.calculator.products = state.calculator.products.filter((item) => {
        return item.id != payload;
      });
      userSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      let price = 0;
      let amount = 0;

      state.calculator.products.forEach((item) => {
        let AllPrices = item.prise * item.amount;
        price += AllPrices;
        amount += item.amount;
      });

      state.calculator.amount = amount;
      state.calculator.price = price;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const {
  isAuthChange,
  login,
  logout,
  addProduct,
  changeAmount,
  removeProduct,
  calculateTotal,
  removeAll
} = userSlice.actions;

export default userSlice.reducer;