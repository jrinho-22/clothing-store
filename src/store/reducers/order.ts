import { configureStore, createSlice, EnhancedStore, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import localStorage from "../localStorage"
import { cardInformation, endereco } from "../../views/checkout/checkout";

type orderType = {
    payment: cardInformation | undefined
    delivery: endereco | undefined
    loading: boolean
}

const initialState: orderType = {
    payment: undefined,
    delivery: undefined,
    loading: false
}

const orderSlice: Slice<orderType> = createSlice({
    name: "order",
    initialState: localStorage.localState?.user.user?.cardInformation.length
        && localStorage.localState?.user.user?.endereco
        ? {
            payment: localStorage.localState?.user.user?.cardInformation[0],
            delivery: localStorage.localState?.user.user?.endereco,
            loading: false,
        }
        : initialState,
    reducers: {
        setPayment(state, action: PayloadAction<cardInformation>) {
            state.payment = action.payload
        },
        setDelivery(state, action: PayloadAction<endereco>) {
            state.delivery = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
});

export default orderSlice;