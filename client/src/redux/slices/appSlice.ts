import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: IAppSliceState = {
    currentUser: {},
    isLoggedIn: false
}

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        updateCurrentUser: (state, action: PayloadAction<IAppSliceState["currentUser"]>) => {
            state.currentUser = action.payload
        },
        updateIsLoggedIn: (state, action: PayloadAction<IAppSliceState["isLoggedIn"]>) => {
            state.isLoggedIn = action.payload
        }
    }
})


export default appSlice.reducer

export const { updateCurrentUser, updateIsLoggedIn } = appSlice.actions