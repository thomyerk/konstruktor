import React from "react"
import Posts from "./components/Posts"
import { store } from "./redux/store"
import { Provider } from "react-redux"
function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Posts />
			</div>
		</Provider>
	)
}

export default App
