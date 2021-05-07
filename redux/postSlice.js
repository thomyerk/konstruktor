import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
	loading: false,
	hasErrors: false,
	posts: [],
	postId: null,
}
const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		getPosts: (state) => {
			state.loading = true
		},
		getPostsFulfilled: (state, { payload }) => {
			state.posts = payload
			state.loading = false
			state.hasErrors = false
		},
		getPostsFailed: (state) => {
			state.loading = false
			state.hasErrors = true
		},
		selectPost: (state, { payload }) => {
			state.postId = payload
		},
	},
})

export const {
	getPosts,
	getPostsFulfilled,
	getPostsFailed,
	selectPost,
} = postSlice.actions

export default postSlice.reducer

export function fetchPosts() {
	return async (dispatch) => {
		dispatch(getPosts())

		try {
			const response = await fetch(`${BASE_URL}`)
			const data = await response.json()

			dispatch(getPostsFulfilled(data))
		} catch (error) {
			dispatch(getPostsFailed())
		}
	}
}
