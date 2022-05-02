import { EventProps } from "src/pages/createSale";
import styled from "styled-components";
import Layout from "./Layout";
import Title from "./Title";

interface ContainerProps {
	height?: number;
}

function Photos({ houseInfo, changeEvent }: EventProps) {
	return (
		<Layout>
			<Title>사진 등록</Title>
			<Container>
				<Text>- 사진은 최소 3장 최대 10장 까지 업로드가 가능합니다.</Text>
				<Text>- 사진 용량은 최대 100MB까지 가능합니다.</Text>
				<Text>- 사진은 가로로 찍은 사진을 권장합니다.</Text>
			</Container>
			<Container></Container>
		</Layout>
	);
}

export default Photos;

const Container = styled.div<ContainerProps>`
	width: calc(100% - 2rem);
	height: ${({ height }) => (height ? `${height}rem` : "auto")};
	margin: 1rem;
	padding: 2rem;
	border: 1px solid ${(props) => props.theme.borderColor};
`;

const Text = styled.p`
	font-size: 1.3rem;
`;
