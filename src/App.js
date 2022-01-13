import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./Components/HomeScreen";
import RegistrationPage from "./Components/RegistrationPage";
import HeaderView from "./Components/HeaderView";
import CommentPage from "./Components/CommentPage";

import ChatScreen from "./Components/ChatScreen";

function App() {
	return (
		<div>
			<Router>
				<HeaderView />
				<Routes>
					<Route path='/' element={<HomeScreen />} />
					<Route path='/register' element={<RegistrationPage />} />
					<Route path='/comments/:id' element={<CommentPage />} />
					<Route path='/chat' element={<ChatScreen />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
