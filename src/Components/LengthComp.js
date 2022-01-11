import React from "react";
import { app } from "../Base";

const LengthComp = ({ id }) => {
	const [data, setData] = React.useState([]);

	const getPostData = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(id)
			.collection("comment")
			.onSnapshot((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setData(item);
			});
	};

	React.useEffect(() => {
		getPostData();
		console.log("rshet", data);
	}, [id]);

	return (
		<div>
			{data.length >= 1 ? (
				<div>View all {data.length} comments</div>
			) : (
				<div>Make a comment</div>
			)}
		</div>
	);
};

export default LengthComp;
