import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
	loading: false,
	hasErrors: false,
	comments: [],
}

const commentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		commentsLoading: (state) => {
			state.loading = true
			state.comments = []
		},
		getComments: (state, { payload }) => {
			state.comments = payload
			state.loading = false
			state.hasErrors = false
		},
		getCommentsFailed: (state) => {
			state.hasErrors = true
			state.loading = false
		},
		changeText: (state, { text, commentId }) => {
			state.loading = true
		},
	},
})

export const {
	getCommentsFailed,
	getComments,
	commentsLoading,
	changeText,
} = commentSlice.actions

export const commentSelector = (state) => state.commentReducer

export default commentSlice.reducer

export function fetchComments(postid) {
	return async (dispatch) => {
		dispatch(commentsLoading())
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${postid}/comments`
			)
			const data = await response.json()

			dispatch(getComments(data))
		} catch (error) {
			dispatch(getCommentsFailed())
		}
	}
}

export function commentChange({ text, commentId }) {
	return async (dispatch) => {
		dispatch(changeText(text, commentId))
	}
}
