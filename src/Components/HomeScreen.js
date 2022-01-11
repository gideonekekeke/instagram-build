import React from "react";
import styled from "styled-components";
import LeftComp from "./LeftComp";
import RightCom from "./RightCom";

const HomeScreen = () => {
	return (
		<Container>
			<RightCom />
			<LeftComp />
		</Container>
	);
};

export default HomeScreen;

const Container = styled.div`
	display: flex;
	/* align-items: center; */
	justify-content: center;
	/* margin-top: 30px; */
	background-color: #efefef;
	min-height: 100vh;
`;
