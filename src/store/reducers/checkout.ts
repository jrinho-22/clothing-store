import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { IProdutoCart } from "../../interfaces/IProduct";
import localStorage from "../localStorage"

type checkoutType = {
  items: IProdutoCart[],
}

const initialState: checkoutType = {
  items: []
}

console.log(localStorage)
const checkoutSlice: Slice<checkoutType> = createSlice({
  name: "checkout",
  initialState: localStorage.localState?.checkout ? localStorage.localState.checkout : initialState,
  reducers: {
    addItem(state, action: PayloadAction<IProdutoCart>) {
        state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<IProdutoCart>) {
      const index = state.items.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export default checkoutSlice;