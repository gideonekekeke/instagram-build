import React, { useContext } from "react";
import styled from "styled-components";
import { app } from "../Base";
import { GlobalContext } from "./Global/AuthState";

const DisplayImage = ({ myID, image, name, location, tme }) => {
	const { current } = useContext(GlobalContext);
	const [data, setData] = React.useState([]);

	const getData = async () => {
		await app
			.firestore()
			.collection("users")
			.doc(myID)
			.get()
			.then((doc) => {
				setData(doc.data());
			});
	};

	React.useEffect(() => {
		getData(myID);
		console.log("fggnhmdt,", data);
		console.log(myID);
	}, [myID]);

	return (
		<>
			{image ? <UserImage2 src={data?.avatar} /> : null}
			<DownHold>
				{name ? <span>{data?.userName}</span> : null}
				{location ? <div>Lagos, Nigeria</div> : null}
			</DownHold>
		</>
	);
};

export default DisplayImage;
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
