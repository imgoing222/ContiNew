import styled from "styled-components";
import { HouseInfoProps } from "src/pages/article/[id]";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Photos({ houseInfo }: HouseInfoProps) {
	const [screenSize, setScreenSize] = useState(1);

	window.onresize = function () {
		setScreenSize(window.outerWidth);
		screenSize;
	};

	const handleScroll = (direction?: string) => {
		if (direction) return document.getElementById("container")?.scrollBy(-250, 0);
		document.getElementById("container")?.scrollBy(250, 0);
	};

	return (
		<Container>
			<StyledDiv id="container">
				<ButtonDiv direction="right">
					<Button icon={faChevronRight} onClick={() => handleScroll()} />
				</ButtonDiv>
				<ButtonDiv>
					<Button icon={faChevronLeft} onClick={() => handleScroll("left")} />
				</ButtonDiv>
				{houseInfo.images.map((item, idx) => (
					<Img src={item} key={idx} />
				))}
			</StyledDiv>
		</Container>
	);
}

export default Photos;

const Container = styled.div`
	margin-bottom: 4rem;
	position: relative;
`;

const Img = styled.img`
	width: auto;
	max-height: 30rem;
	margin-right: 2rem;
`;

const StyledDiv = styled.div`
	display: flex;
	overflow-x: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

interface Button {
	direction?: string;
}
const Button = styled(FontAwesomeIcon)`
	display: block;
	font-size: 3rem;
	z-index: 2;
	cursor: pointer;
	color: #fff;
`;

const ButtonDiv = styled.div<Button>`
	width: 5rem;
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(34, 34, 34, 0.6);
	top: 45%;
	position: absolute;
	right: ${({ direction }) => direction && "-5rem"};
	left: ${({ direction }) => !direction && "-5rem"};
`;
