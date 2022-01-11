import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { app } from "../Base";
import DisplayImage from "./DisplayImage";
import firebase from "firebase";
import { GlobalContext } from "./Global/AuthState";
import moment from "moment";

const CommentPage = () => {
	const { current } = useContext(GlobalContext);
	const { id } = useParams();

	const [data, setData] = React.useState([]);
	const [getComment, setGetComment] = React.useState([]);

	const [com, setCom] = React.useState("");

	const Commenting = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(id)
			.collection("comment")
			.doc()
			.set({
				com,
				createdBy: current?.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			});
		setCom("");
	};

	const getDetails = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(id)
			.get()
			.then((doc) => {
				setData(doc.data());
			});
	};

	const CommentData = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(id)
			.collection("comment")
			.onSnapshot((snap) => {
				const item = [];
				snap.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setGetComment(item);
			});
	};

	React.useEffect(() => {
		getDetails();
		CommentData();
	}, []);

	return (
		<Container>
			<MainHold>
				<First>
					{data.avatar === "" ? null : data.avatar
							?.split(".")[5]
							.split("?")[0] === "mp4" ? (
						<MainVideo controls src={data.avatar} />
					) : data.avatar?.split(".")[5].split("?")[0] === "png" ||
					  "jpg" ||
					  "gif" ? (
						<Image src={data.avatar} />
					) : null}
				</First>
				<Second>
					<Heading>
						<DisplayImage location name myID={data.createdBy} image />
					</Heading>
					<br />
					<MessComp>
						<Main>
							{getComment.map((props) => (
								<div>
									{" "}
									<div
										style={{
											display: "flex",
											alignItems: "center",
										}}>
										<DisplayImage tme name myID={props.createdBy} image />
										<div style={{ marginLeft: "10px", color: "silver" }}>
											{moment(props.createdAt.toDate()).fromNow()}
										</div>
									</div>
									<div
										style={{
											// width: "150px",
											// background: "red",
											marginTop: "-10px",
											marginLeft: "70px",
										}}>
										{props.com}
									</div>
									<div
										style={{
											color: "silver",

											marginLeft: "70px",
										}}>
										Reply
									</div>
								</div>
							))}
						</Main>
					</MessComp>

					<ComPart>
						<input
							onChange={(e) => {
								setCom(e.target.value);
							}}
							placeholder='Add a comment...'
						/>
						<span
							onClick={() => {
								Commenting();
								setCom("");
							}}>
							Post
						</span>
					</ComPart>
				</Second>
			</MainHold>
		</Container>
	);
};

export default CommentPage;

const ComPart = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid silver;

	align-items: center;
	padding-bottom: 10px;

	input {
		width: 200px;
		height: 40px;
		border: none;
		padding-left: 30px;
		outline: none;
	}

	span {
		color: #0080f7;
		cursor: pointer;
		padding: 10px 20px;
		border-radius: 20px;

		:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;

const Main = styled.div`
	display: flex;
	// align-items: center;
	flex-direction: column;
	padding-left: 20px;
	span {
		margin-left: 10px;
	}
`;

const LastComp = styled.div``;
const MessComp = styled.div`
	flex: 1;
`;

const Heading = styled.div`
	background-color: white;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	/* height: 70px; */
	width: 100%;
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #efefef;

	min-height: 100vh;
`;
const MainHold = styled.div`
	height: 600px;
	width: 1000px;
	background-color: white;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	border-radius: 5px;
	display: flex;
`;
const MainVideo = styled.video`
	height: 100%;
	width: 100%;
	object-fit: fit;
	border-radius: 5px;
`;
const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 5px;
`;
const First = styled.div`
	height: 100%;
	width: 500px;
	background: silver;
	border-right: 1px solid gray;
	border-radius: 5px;
`;
const Second = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	flex: 1;
`;
