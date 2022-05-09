import { Splide, SplideSlide } from "@splidejs/react-splide";
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";

function Photos() {
	const list = ["/aircon.svg", "/bookmark.svg"];
	return (
		<Container
			aria-label="My Favorite Images"
			options={{
				width: 1200,
				height: 300,
				drag: true,
				rewind: true,
			}}
		>
			{list.map((item, idx) => (
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
	width: auto;
`;
