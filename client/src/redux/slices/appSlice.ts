import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: IAppSliceState = {
    currentUser: {},
    isLoggedIn: false,
    windowWidth: window.innerWidth
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
        },
        updateWindowWidth: (state, action: PayloadAction<number>) => {
            state.windowWidth = action.payload
        }
    }
})


export default appSlice.reducer

export const { updateCurrentUser, updateIsLoggedIn, updateWindowWidth } = appSlice.actions