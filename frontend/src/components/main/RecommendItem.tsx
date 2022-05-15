import styled from "styled-components";

import House from "src/types/getListType";

interface HouseType {
	house: House;
}

function RecommendItem({ house }: HouseType) {
	return (
		<Li>
			<Image src={house.main_image} alt="house-img" />
		</Li>
	);
}

const Li = styled.li`
	margin: 1rem;
`;

const Image = styled.img`
	width: 15rem;
	height: 15rem;
`;

export default RecommendItem;
