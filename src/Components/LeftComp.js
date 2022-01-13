import React, { useContext } from "react";
import styled from "styled-components";
import { app } from "../Base";
import { GlobalContext } from "./Global/AuthState";

const LeftComp = () => {
	const [data, setData] = React.useState([]);
	const [followData, setFollowData] = React.useState([]);
	const { current } = useContext(GlobalContext);
	const [toggle, setToggle] = React.useState(false);

	const hangleToggle = () => {
		setToggle(!toggle);
	};

	const getPostData = async () => {
		await app
			.firestore()
			.collection("users")

			.onSnapshot((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setData(item);
			});
	};
	const getPostDatas = async () => {
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

	React.useEffect(() => {
		getPostData();
		getPostDatas();
		console.log(followData);
	}, []);

	return (
		<Container>
			<br />
			<div style={{ marginTop: "30px", marginLeft: "20px", color: "silver" }}>
				suggession for you
			</div>
			{data.map((props) => (
				<div>
					{props.id !== current?.uid ? (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "300px",
							}}>
							<div style={{ display: "flex", alignItems: "center" }}>
								{" "}
								<UserImage2 src={props.avatar} />
								<DownHold>
									<span>{props.userName}</span>
									<div>Lagos, Nigeria</div>
								</DownHold>
							</div>
							{toggle ? (
								<button
									onClick={() => {
										hangleToggle();
									}}>
									unfollow
								</button>
							) : (
								<button
									onClick={() => {
										app.firestore().collection("follows").doc().set({
											follow: props?.id,
											tog: true,
											createdBy: current?.uid,
										});
										hangleToggle();
									}}>
									+follow
								</button>
							)}
						</div>
					) : null}
				</div>
			))}
		</Container>
	);
};

export default LeftComp;

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

const UserImage2 = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background-color: silver;
	margin: 10px;
	object-fit: cover;
`;
const Container = styled.div`
	margin-top: 25px;
	height: 400px;
	position: sticky;
	top: 20;
	/* height: 100px; */
	width: 350px;
	background-color: white;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	border-radius: 5px;
	display: flex;
	/* justify-content: center; */
	font-weight: bold;
	flex-direction: column;

	button {
		background: none;

		border: none;
		align-items: center;
		outline: none;
		color: #0080f7;
		cursor: pointer;
	}
	/* align-items: center; */
`;

const MainHold = styled.div`
	height: 600px;
	width: 1000px;
	background-color: white;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	border-radius: 5px;
	display: flex;
`;
