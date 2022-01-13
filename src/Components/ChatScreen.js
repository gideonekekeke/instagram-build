import React, { useContext } from "react";
import styled from "styled-components";
import { app } from "../Base";
import DisplayImage from "./DisplayImage";
import { BiSend } from "react-icons/bi";
import { GlobalContext } from "./Global/AuthState";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { getChatId } from "./Global/reduxState";
import firebase from "firebase";
const ChatScreen = () => {
	const dispach = useDispatch();
	const { current } = useContext(GlobalContext);
	const [chatNow, setChatNow] = React.useState("");
	const [followData, setFollowData] = React.useState([]);
	const [getChat, setGetChat] = React.useState([]);

	const getIt = useSelector((state) => state.persistedReducer.chatID);

	const Chatting = async () => {
		await app
			.firestore()
			.collection("follows")
			.doc(getIt)
			.collection("chat")
			.doc()
			.set({
				chatNow,
				createdBy: current?.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			});
		setChatNow("");
	};

	const getFollowData = async () => {
		await app
			.firestore()
			.collection("follows")

			.onSnapshot((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setFollowData(item);
			});
	};
	const getChattingData = async () => {
		await app
			.firestore()
			.collection("follows")
			.doc(getIt)
			.collection("chat")
			.onSnapshot((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setGetChat(item);
			});
	};

	React.useEffect(() => {
		getFollowData();
		getChattingData(getIt);
	}, [getIt]);

	return (
		<Container>
			<MainHold>
				<First>
					<Head>
						<span>Chat Room</span>
					</Head>
					{followData?.map((props) => (
						<div>
							{props.follow === current?.uid && props.id ? (
								<Holder
									onClick={() => {
										dispach(getChatId(props.id));
									}}>
									<Div style={{ display: "flex", alignItems: "center" }}>
										<DisplayImage name image myID={props.createdBy} />

										<Span>2</Span>
									</Div>
								</Holder>
							) : (
								<div>
									{props.id && props.createdBy === current?.uid ? (
										<Holder
											onClick={() => {
												dispach(getChatId(props.id));
											}}>
											<Div style={{ display: "flex", alignItems: "center" }}>
												<DisplayImage name image myID={props.follow} />

												<Span>2</Span>
											</Div>
										</Holder>
									) : null}
								</div>
							)}
						</div>
					))}
				</First>
				<Second>
					<Heading>gfdz</Heading>
					<br />
					<MessComp>
						{getChat?.map((props) => (
							<div>{props.chatNow}</div>
						))}
					</MessComp>

					<ComPart>
						<InputEmoji
							onChange={setChatNow}
							value={chatNow}
							placeholder='Type a message'
						/>

						<span>
							<BiSend onClick={Chatting} style={{ fontSize: "20px" }} />
						</span>
					</ComPart>
				</Second>
			</MainHold>
		</Container>
	);
};

export default ChatScreen;

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

	height: 300px;
	overflow-y: scroll;
`;

const Heading = styled.div`
	background-color: white;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	/* height: 70px; */
	width: 100%;
	display: flex;
	align-items: center;
`;

const Span = styled.div`
	height: 20px;
	width: 20px;
	background: #0080f7;
	margin-left: 200px;
	border-radius: 50%;
	color: white;
	display: flex;
	justify-content: center;

	align-items: center;
`;

const Div = styled.div`
	cursor: pointer;
	width: 100%;

	:hover {
		background: rgba(225, 225, 225, 0.5);
	}
	span {
	}
`;

const Holder = styled.div`
	display: flex;
	justify-content: space-between;

	align-items: center;
`;

const Head = styled.div`
	height: 70px;
	width: 500px;
	background-color: white;
	box-shadow: 0px 5px 2px -4px rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
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

const First = styled.div`
	height: 100%;
	width: 500px;
	background: white;
	border-right: 1px solid gray;
	border-radius: 5px;
`;
const Second = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	flex: 1;
`;
