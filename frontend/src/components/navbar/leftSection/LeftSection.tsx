import styled from "styled-components";

function LeftSection() {
	return (
		<Container>
			<div>지도</div>
			<div>방내놓기</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

export default LeftSection;
