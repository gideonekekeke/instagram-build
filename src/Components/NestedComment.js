import React, { useContext } from "react";
import InputEmoji from "react-input-emoji";
import styled from "styled-components";
import { app } from "../Base";
import firebase from "firebase";
import { GlobalContext } from "./Global/AuthState";
import DisplayImage from "./DisplayImage";
const NestedComment = ({ pID, cID, handleShow, show }) => {
	const [data, setData] = React.useState([]);
	const { current } = useContext(GlobalContext);
	const [nesCom, setNesCom] = React.useState("");

	const Commenting = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(pID)
			.collection("comment")
			.doc(cID)
			.collection("nestedcomment")
			.doc()
			.set({
				nesCom,
				createdBy: current?.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			});
		setNesCom("");
	};

	const getNestComment = async () => {
		await app
			.firestore()
			.collection("post")
			.doc(pID)
			.collection("comment")
			.doc(cID)
			.collection("nestedcomment")
			.onSnapshot((snap) => {
				const item = [];
				snap.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setData(item);
			});
	};

	React.useEffect(() => {
		getNestComment();
	}, []);

	return (
		<MainComp>
			<div style={{ marginLeft: "70px", marginTop: "10px" }}>
				<div>
					{data.map((props) => (
						<div style={{ display: "flex", alignItems: "center" }}>
							<DisplayImage name smallimage myID={props?.createdBy} />
							<div style={{ marginLeft: "5px" }}>{props?.nesCom}</div>
						</div>
					))}
				</div>
				{show ? (
					<ComPart>
						<InputEmoji
							onChange={setNesCom}
							value={nesCom}
							width={300}
							placeholder='Type a message'
						/>

						<span
							onClick={() => {
								Commenting();
								handleShow();
							}}>
							Post
						</span>
					</ComPart>
				) : null}
			</div>
		</MainComp>
	);
};

export default NestedComment;

const MainComp = styled.div`
	display: flex;
	flex-direction: column;
`;

const ComPart = styled.div`
	display: flex;
	justify-content: space-between;

	width: 80%;

	align-items: center;
	/* margin-left: 60px; */

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
