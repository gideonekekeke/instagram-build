import React, { useContext } from "react";
import styled from "styled-components";
import pic from "./img/1.png";
import { MdHome } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { AiOutlineCompass } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GlobalContext } from "./Global/AuthState";
const HeaderView = () => {
	const { currentData } = useContext(GlobalContext);

	console.log(currentData);
	return (
		<Container>
			<MainHold>
				<Logo src={pic} />
				<input placeholder='Search' />
				<IconsHold>
					<span>
						<Link style={{ color: "black" }} to='/'>
							<MdHome />
						</Link>
					</span>
					<span>
						<RiMessengerLine />
					</span>
					<span>
						<AiOutlineCompass />
					</span>
					<span>
						<FcLike />
					</span>
					<UserImage src={currentData?.avatar} />
				</IconsHold>
			</MainHold>
		</Container>
	);
};

export default HeaderView;

const UserImage = styled.img`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: silver;
	margin: 10px;
	object-fit: cover;
`;

const Container = styled.div`
	height: 70px;
	background-color: #ffffff;
	box-shadow: 0px 5px 2px -5px rgba(0, 0, 0, 0.4);
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: sticky;
	top: 0;
	input {
		height: 40px;
		width: 250px;
		border: none;
		outline: none;
		background-color: #efefef;
		padding-left: 20px;
		border-radius: 5px;
	}
`;
const MainHold = styled.div`
	display: flex;
	align-items: center;
	width: 50%;
	justify-content: space-between;
`;
const IconsHold = styled.div`
	display: flex;
	align-items: center;

	span {
		font-size: 27px;
		cursor: pointer;
		margin: 10px;
	}
`;
const Logo = styled.img`
	height: 40px;
	width: 100px;
	object-fit: contain;
`;
