import React, { createContext } from "react";
import { app } from "../../Base";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [current, setCurrent] = React.useState(null);
	const [currentData, setCurrentData] = React.useState(null);

	React.useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			setCurrent(user);

			app
				.firestore()
				.collection("users")
				.doc(user.uid)
				.get()
				.then((doc) => {
					setCurrentData(doc.data());
				});
		});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				current,
				currentData,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
