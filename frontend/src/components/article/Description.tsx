import styled from "styled-components";
import Container from "./Container";

function Description() {
	const houseInfo = { description: "6개월짜리 방 내놓습니다." };
	return (
		<Container title="상세 설명">
			<TextArea>{houseInfo.description}</TextArea>
		</Container>
	);
}

export default Description;

const TextArea = styled.div`
	background-color: ${(props) => props.theme.borderColor};
	width: 100%;
	height: 30rem;
	padding: 3rem 1rem;
	font-size: 1.5rem;
	margin-bottom: 10rem;
`;
