import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./postSlice"
import commentReducer from "./commentSlice"

export const store = configureStore({
	reducer: {
		postReducer,
		commentReducer,
	},
})

export default store
