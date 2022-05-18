import { HouseInfoProps } from "src/pages/article/[id]";
import styled from "styled-components";
import Container from "./Container";

function Description({ houseInfo }: HouseInfoProps) {
	return (
		<Container title="상세 설명">
			<TextArea>
				{houseInfo.description.split("\n").map((line) => (
					<span>
						{line}
						<br />
					</span>
				))}
			</TextArea>
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
	@media ${(props) => props.theme.mobileXS} {
		margin-bottom: 2rem;
		height: 25rem;
	}
`;
