import React, { useEffect, useState } from "react"
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableHighlight,
	Button,
	ActivityIndicator,
	TextInput,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { selectPost, fetchPosts } from "../redux/postSlice"
import { fetchComments, commentChange } from "../redux/commentSlice"

export default function Posts() {
	const [editText, setEditText] = useState(false)
	const [text, setText] = useState("")
	const dispatch = useDispatch()
	const postSelected = (postid) => {
		return (dispatch) => {
			dispatch(fetchComments(postid))
			dispatch(selectPost(postid))
		}
	}
	const posts = useSelector((state) => {
		const all = state.postReducer.posts
		const postId = state.postReducer.postId
		if (!postId) {
			return all
		} else {
			return all.filter((post) => post.id === postId)
		}
	})

	const loading = useSelector((state) => state.commentReducer.loading)
	const comments = useSelector((state) => {
		const postId = state.postReducer.postId
		if (!postId) {
			return null
		} else {
			return state.commentReducer.comments
		}
	})

	const Comment = ({ title, body, id }) => (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
			<TextInput
				editable={true}
				placeholder={body}
				onChangeText={(text) => setText(text)}
				onPress={() => setEditText(true)}
				onBlur={() => dispatch(commentChange({ text, id }))}
			/>
		</View>
	)

	useEffect(() => {
		dispatch(fetchPosts())
	}, [])

	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
		item: {
			border: "1px solid grey",
			borderRadius: "5px",
			padding: 5,
			marginVertical: 8,
			marginHorizontal: 16,
		},
		title: {
			fontWeight: "bold",
		},
	})

	return (
		<View style={{ flex: 1, marginTop: 44, paddingHorizontal: 20 }}>
			<TouchableHighlight
				onPress={() => dispatch(selectPost())}
				underlayColor="dodgerblue">
				<Text style={{ fontSize: 22 }}>Posts</Text>
			</TouchableHighlight>
			<View style={{ flex: 1, marginTop: 12 }}>
				<FlatList
					data={posts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						return (
							<View style={{ marginVertical: 12 }}>
								<View style={{ flexDirection: "row", flex: 1 }}>
									<View style={{ flex: 1, marginLeft: 12 }}>
										<View>
											<Text
												style={{
													fontSize: 22,
													paddingRight: 16,
												}}>
												{item.title}
											</Text>
										</View>
										<View
											style={{
												flexDirection: "column",
												marginTop: 10,
												alignItems: "flex-start",
											}}>
											<Text
												style={{
													fontSize: 18,
													paddingLeft: 10,
													color: "#64676D",
												}}>
												{item.body}
											</Text>

											<Button
												onPress={() =>
													dispatch(
														postSelected(item.id)
													)
												}
												title="Show comments"
											/>
										</View>
									</View>
								</View>
							</View>
						)
					}}
					showsVerticalScrollIndicator={false}
				/>
				<FlatList
					data={comments}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						return (
							<>
								<Comment
									title={item.name}
									body={item.body}
									id={parseInt(item.id)}
								/>
							</>
						)
					}}
				/>

				{loading && <ActivityIndicator />}
			</View>
		</View>
	)
}
