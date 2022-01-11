import React, { useContext } from "react";
import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import { BsEmojiSmileFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { app } from "../Base";
import firebase from "firebase";
import { GlobalContext } from "./Global/AuthState";
import DisplayImage from "./DisplayImage";
import PostComents from "./PostComents";
import LengthComp from "./LengthComp";
import LinkingPage from "./LinkingPage";

const RightCom = () => {
	const { current } = useContext(GlobalContext);
	const [title, setTitile] = React.useState("");
	const [image, setImage] = React.useState("");
	const [avatar, setAvatar] = React.useState("");
	const [percent, setPercent] = React.useState(0.0000001);
	const [data, setData] = React.useState([]);

	const getPostData = async () => {
		await app
			.firestore()
			.collection("post")

			.onSnapshot((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setData(item);
			});
	};

	const onUploadImage = async (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);

		const fileRef = await app.storage().ref();
		const storageRef = fileRef.child("avatar/" + file.name).put(file);

		storageRef.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			(snapShot) => {
				const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

				setPercent(counter);
				console.log(counter);
			},
			(err) => console.log(err.message),
			() => {
				storageRef.snapshot.ref.getDownloadURL().then((URL) => {
					setAvatar(URL);
					console.log(URL);
				});
			},
		);
	};

	const PostData = async () => {
		await app.firestore().collection("post").doc().set({
			title,
			avatar,
			createdBy: current?.uid,
		});
		setTitile("");
	};

	React.useEffect(() => {
		getPostData();
		console.log(data);
	}, []);

	return (
		<Container>
			<StoryCard>
				<Hold>
					{" "}
					<UserImage />
					<span>gideon ekeke</span>
				</Hold>
			</StoryCard>
			<br />
			<Card>
				<Sep>
					<UserImage2 />
					<input
						onChange={(e) => {
							setTitile(e.target.value);
						}}
						placeholder="What's on your mind?"
					/>
				</Sep>
				<UploadHold>
					<Holding>
						<div>
							{" "}
							<input type='file' />
							<LabelHold>
								<span>
									<FaVideo style={{ color: "red" }} />
								</span>
								<div> Live Video</div>
							</LabelHold>
						</div>
						<div>
							{" "}
							<input onChange={onUploadImage} id='pix' type='file' />
							<LabelHold htmlFor='pix'>
								<div>
									<div style={{ display: "flex", alignItems: "center" }}>
										{" "}
										<span>
											<MdPhoto style={{ color: "green" }} />
										</span>
										<div> Photos/Video</div>
									</div>
									<button onClick={PostData}> Upload</button>
								</div>
							</LabelHold>
						</div>
						<div>
							{" "}
							<input type='file' />
							<LabelHold>
								<span>
									<BsEmojiSmileFill style={{ color: "yellow" }} />
								</span>
								<div> Feeling/activty</div>
							</LabelHold>
						</div>
					</Holding>
				</UploadHold>
			</Card>
			<br />
			<CardHold>
				{data.map((props) => (
					<Card ke={props.id}>
						<UserHold>
							<NameHold>
								<DisplayImage location name image myID={props.createdBy} />
							</NameHold>
							<FiMoreHorizontal />
						</UserHold>
						{props.avatar === "" ? null : props.avatar
								?.split(".")[5]
								.split("?")[0] === "mp4" ? (
							<MainVideo controls src={props.avatar} />
						) : props.avatar?.split(".")[5].split("?")[0] === "png" ||
						  "jpg" ||
						  "gif" ? (
							<MainImage src={props.avatar} />
						) : null}
						<MainIcon>
							<Both>
								<span>
									<LinkingPage btt pID={props.id} />
								</span>

								<span>
									<BsChat />
								</span>

								<span>
									<RiShareForwardFill />
								</span>
							</Both>
							<span>
								<BsBookmark />
							</span>
						</MainIcon>
						<Bul>
							<div style={{ display: "flex" }}>
								{" "}
								<LinkingPage you pID={props.id} />
								<LinkingPage oth pID={props.id} />
							</div>
							<p
								style={{
									fontSize: "12px",
									display: "flex",
									alignItems: "center",
								}}>
								<span style={{ fontWeight: "bold" }}>
									<DisplayImage name />
								</span>{" "}
								{props.title}{" "}
							</p>
							<Link style={{ color: "silver" }} to={`/comments/${props.id}`}>
								<LengthComp id={props.id} />
							</Link>
							<span>December 30, 2021</span>
						</Bul>
						<PostComents id={props.id} />
					</Card>
				))}
			</CardHold>
		</Container>
	);
};

export default RightCom;

const ComPart = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid silver;
	width: 100%;
	align-items: center;
	padding-bottom: 10px;

	input {
		width: 500px;
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

const Bul = styled.div`
	padding-left: 20px;
	padding-bottom: 20px;

	div {
		color: silver;
	}

	span {
		color: silver;
		font-size: 13px;
	}
`;

const Both = styled.div`
	display: flex;
	margin: 10px;

	span {
		margin: 10px;
	}
`;
const MainIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 95%;

	font-size: 22px;
`;

// const inputHol = styled.input;

const Holding = styled.div`
	display: flex;
	justify-content: space-around;
	padding-bottom: 20px;
`;
const LabelHold = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;

	span {
		margin-top: 5px;
	}

	div {
		margin-left: 10px;
		font-size: 12px;
		font-weight: bold;
	}

	button {
		height: 40px;
		width: 150px;
		margin-top: 20px;
		border: none;
		color: white;
		background-color: #0080f7;
		cursor: pointer;
	}
`;
// const Holding = styled.div``

const UploadHold = styled.div`
	input {
		display: none;
	}
`;

const Sep = styled.div`
	display: flex;
	align-items: center;

	input {
		width: 500px;
		height: 40px;
		border: none;
		outline: none;
		background-color: #efefef;
		border-radius: 20px;
		padding-left: 20px;
	}
`;

const MainImage = styled.img`
	height: 400px;
	background: silver;
	object-fit: cover;
`;
const MainVideo = styled.video`
	height: 400px;
	background: silver;
`;

const UserHold = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 95%;
`;
const NameHold = styled.div`
	display: flex;
	align-items: center;
`;
const DownHold = styled.div`
	display: flex;
	flex-direction: column;

	div {
		color: black;
		font-size: 12px;
	}

	span {
		font-weight: bold;
	}
`;

const UserImage2 = styled.div`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background-color: silver;
	margin: 10px;
`;

const Card = styled.div`
	/* height: 90px; */
	width: 622px;
	background: white;
	display: flex;
	/* justify-content: center; */
	flex-direction: column;
	/* align-items: center; */
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	margin: 10px;

	/* margin-top: 30px; */
	/* padding-left: 20px; */
`;
const CardHold = styled.div`
	display: flex;

	flex-direction: column;
`;

const Hold = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	span {
		font-size: 10px;
		margin-top: 4px;
		font-weight: bold;
	}
`;

const UserImage = styled.div`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	background-color: silver;
	/* margin: 10px; */
`;
const StoryCard = styled.div`
	height: 90px;
	width: 590px;
	background: white;
	display: flex;
	/* justify-content: center; */
	/* flex-direction: column; */
	/* align-items: center; */
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	margin-top: 30px;
	padding-left: 30px;
	margin-left: 10px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
