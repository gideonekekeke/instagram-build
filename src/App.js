import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./Components/HomeScreen";
import RegistrationPage from "./Components/RegistrationPage";
import HeaderView from "./Components/HeaderView";
import CommentPage from "./Components/CommentPage";
import { GlobalProvider } from "./Components/Global/AuthState";

function App() {
	return (
		<div>
			<GlobalProvider>
				<Router>
					<HeaderView />
					<Routes>
						<Route path='/' element={<HomeScreen />} />
						<Route path='/register' element={<RegistrationPage />} />
						<Route path='/comments/:id' element={<CommentPage />} />
					</Routes>
				</Router>
			</GlobalProvider>
		</div>
	);
}

export default App;
