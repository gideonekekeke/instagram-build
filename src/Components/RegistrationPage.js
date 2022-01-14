import React from "react";
import firebase from "firebase";
import { app } from "../Base";
import styled from "styled-components";
import pic from "./img/1.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
	const navigate = useNavigate();
	const [show, setShow] = React.useState(false);
	const [image, setImage] = React.useState("");
	const [avatar, setAvatar] = React.useState("");
	const [percent, setPercent] = React.useState(0.0000001);

	const schema = yup.object().shape({
		userName: yup.string().required("this field is required"),
		email: yup.string().email().required("this field is required"),
		password: yup.string().required("this field is required"),
	});

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const uploadToFirebase = handleSubmit(async (val) => {
		const { userName, email, password } = val;

		const newUser = await app
			.auth()
			.createUserWithEmailAndPassword(email, password);

		if (newUser) {
			await app.firestore().collection("users").doc(newUser.user.uid).set({
				userName,
				email,
				password,
				avatar,
				createdBy: newUser.user.uid,
			});
			navigate("/");
			reset();
		}
	});

	const LoginUser = handleSubmit(async (val) => {
		const { email, password } = val;
		app.auth().signInWithEmailAndPassword(email, password);
	});

	const handleShow = () => {
		setShow(!show);
	};

	return (
		<Container>
			{show ? (
				<div>
					{" "}
					<Card>
						<Logo src={pic} />

						<input {...register("email")} placeholder='Email' />
						<input
							{...register("password")}
							placeholder='Password'
							type='password'
						/>
						<button onClick={LoginUser}>Log In</button>
					</Card>
					<Card2>
						<p>
							Don't have and Account? <span onClick={handleShow}>Sign Up</span>
						</p>
					</Card2>
				</div>
			) : (
				<div>
					{" "}
					<Card>
						<Logo src={pic} />
						<br />
						<ImagePreview src={image} />
						<Input onChange={onUploadImage} id='pix' type='file' />
						<LabelButton htmlFor='pix'>Upload Image</LabelButton>
						<br />
						<input {...register("userName")} placeholder='UserName' />
						<input {...register("email")} placeholder='Email' />
						<input
							{...register("password")}
							placeholder='Password'
							type='password'
						/>
						<button onClick={uploadToFirebase}>Sign Up</button>
					</Card>
					<Card2>
						<p>
							Already have and Account? <span onClick={handleShow}>Login</span>
						</p>
					</Card2>
				</div>
			)}
		</Container>
	);
};

export default RegistrationPage;

const Card2 = styled.div`
	height: 50px;
	width: 380px;
	background: white;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	margin-top: 10px;

	span {
		color: red;
		font-weight: bold;
		cursor: pointer;
	}
`;
const Input = styled.input`
	display: none;
`;

const LabelButton = styled.label`
	padding: 15px 50px;
	background-color: #0080f7;
	color: white;
	font-weight: bold;
	transition: all 350ms;
	border-radius: 20px;
	cursor: pointer;

	:hover {
		transform: scale(0.95);
	}
`;

const ImagePreview = styled.img`
	height: 80px;
	width: 80px;
	border-radius: 50%;
	background-color: silver;
`;

const Logo = styled.img`
	height: 40px;
	width: 100px;
	object-fit: contain;
	/* margin-top: 50px; */
`;

const Card = styled.div`
	height: 480px;
	width: 380px;
	background: white;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);

	input {
		height: 30px;
		width: 300px;
		margin: 5px;
		border: none;
		outline: none;
		background-color: white;
		box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	}

	button {
		width: 300px;
		height: 50px;
		margin-top: 10px;
		cursor: pointer;
		background-color: #0080f7;
		color: white;
		font-weight: bold;
		font-size: 14px;
		border: none;
		border-radius: 10px;
	}
`;

const Container = styled.div`
	min-height: 90vh;
	width: 100%;
	background: #efefef;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
