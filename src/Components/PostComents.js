import React, { useContext } from "react";
import styled from "styled-components";
import { app } from "../Base";
import { GlobalContext } from "./Global/AuthState";
import firebase from "firebase";

const PostComents = ({ id }) => {
	const { current } = useContext(GlobalContext);
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

	return (
		<>
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
		</>
	);
};

export default PostComents;
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
