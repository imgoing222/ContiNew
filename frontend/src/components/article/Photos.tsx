import { Splide, SplideSlide } from "@splidejs/react-splide";
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import { HouseInfoProps } from "src/pages/article/[id]";

function Photos({ houseInfo }: HouseInfoProps) {
	return (
		<Container
			aria-label="House Images"
			options={{
				width: 1200,
				height: 300,
				drag: true,
				rewind: true,
			}}
		>
			{houseInfo.images.map((item, idx) => (
				<SplideSlide key={idx}>
					<Img src={item} />
				</SplideSlide>
			))}
		</Container>
	);
}

export default Photos;

const Container = styled(Splide)`
	display: flex;
	margin-bottom: 4rem;
	justify-content: center;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
`;
