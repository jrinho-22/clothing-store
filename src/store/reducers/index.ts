import { Reducer } from "@reduxjs/toolkit";
import checkoutSlice from "./checkout"
import user from "./user";
import userSlice from "./user";
import orderSlice from "./order";

export type Reducers = { [key: string]: Reducer };

const reducers = {
    checkout: checkoutSlice.reducer,
    user: user.reducer,
    order: orderSlice.reducer
};

export const actions = {
    checkout: checkoutSlice.actions,
    user: userSlice.actions,
    order: orderSlice.actions
}


export default reducers;