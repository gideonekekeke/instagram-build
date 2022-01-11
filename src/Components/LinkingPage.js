import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { app } from "../Base";
import { GlobalContext } from "./Global/AuthState";
import { FcLike } from "react-icons/fc";

const LinkingPage = ({ pID, btt, you, oth }) => {
	const [data, setData] = React.useState([]);
	const { current } = useContext(GlobalContext);
	const ClickToLike = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(pID)
			.collection("like")
			.doc(current?.uid)
			.set({
				like: true,
				LikedBy: current?.uid,
			});
	};

	const mapLikeData = async () => {
		app
			.firestore()
			.collection("post")
			.doc(pID)
			.collection("like")
			.onSnapshot((snap) => {
				const item = [];
				snap.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setData(item);
			});
	};

	React.useEffect(() => {
		mapLikeData();
		console.log("dfghjk", data);
	}, []);

	return (
		<div>
			<div>
				{btt ? (
					<div>
						{" "}
						{data.every((el) => el.id !== current?.uid) ? (
							<AiOutlineHeart onClick={ClickToLike} />
						) : (
							<div>
								{data.map(({ id, like, likedBy }) => (
									<div>
										{id === current?.uid && like ? (
											<div>
												<FcLike
													onClick={() => {
														app
															.firestore()
															.collection("post")
															.doc(pID)
															.collection("like")
															.doc(id)
															.delete(id);
													}}
												/>
											</div>
										) : null}
									</div>
								))}
							</div>
						)}
					</div>
				) : null}
				{you ? (
					<div>
						{data.find((el) => el.id === current?.uid) ? (
							<p>Liked by you and {data.length - 1} others</p>
						) : (
							<p>{data.length} like</p>
						)}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default LinkingPage;
