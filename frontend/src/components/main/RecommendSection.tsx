import styled from "styled-components";

interface DataProps {
	recommendData: { id: number; imageUrl: string }[];
	addressName: string;
}

function RecommendSection({ recommendData, addressName }: DataProps) {
	return (
		<Section>
			<Title>oo동 추천매물</Title>
			<Ul>
				{recommendData.map((recommend) => (
					<Li key={recommend.id}>
						<Image src={recommend.imageUrl} alt="recommend-img" />
					</Li>
				))}
			</Ul>
		</Section>
	);
}

const Section = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 40rem;
`;

const Title = styled.div`
	height: 5rem;
	font-size: 3rem;
`;

const Ul = styled.ul`
	display: flex;
	justify-content: center;
	list-style: none;
	padding: 0;
`;

const Li = styled.li`
	margin: 1rem;
`;

const Image = styled.img`
	width: 15rem;
	height: 15rem;
`;
export default RecommendSection;
