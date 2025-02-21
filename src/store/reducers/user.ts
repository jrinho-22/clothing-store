import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import localStorage from "../localStorage"
import { IUsers } from "../../interfaces/IUser";

type userType = {
  user: IUsers | null,
}

const initialState: userType = {
  user: null
}

console.log(localStorage)
const userSlice: Slice<userType> = createSlice({
  name: "user",
  initialState: localStorage.localState?.user ? localStorage.localState.user : initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUsers>) {
      console.log(action, 'actionaction')
      state.user = action.payload
    },
    removeUser(state) {
      state.user = null
    },
  },
});

export default userSlice;