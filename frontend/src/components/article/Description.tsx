import { HouseInfoProps } from "src/pages/article/[id]";
import styled from "styled-components";
import Container from "./Container";

function Description({ houseInfo }: HouseInfoProps) {
	return (
		<Container title="상세 설명">
			<TextArea>
				{houseInfo.description.split("\n").map((line, idx) => (
					<span key={idx}>
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
	background-color: rgba(233, 233, 233, 0.3);
	width: 100%;
	min-height: 30rem;
	padding: 3rem 1rem;
	font-size: 1.5rem;
	margin-bottom: 10rem;
	@media ${(props) => props.theme.mobileXS} {
		margin-bottom: 2rem;
		height: 25rem;
	}
`;
