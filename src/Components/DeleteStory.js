import React from "react";
import { app } from "../Base";
import moment from "moment";

const DeleteStory = ({ id, createdAt }) => {
	const parVal = parseFloat(createdAt);
	const momVal = moment(parVal).minute();

	React.useEffect(() => {
		setInterval(() => {
			app
				.firestore()
				.collection("story")
				.doc(id)

				.delete();
		}, 60000);
		console.log("fghnjm,", momVal);
	}, []);
	return <div></div>;
};

export default DeleteStory;
