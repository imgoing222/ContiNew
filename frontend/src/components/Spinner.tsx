import Image from "next/image";
import SpinImg from "public/Spinner.gif";
import styled from "styled-components";

function Spinner() {
	return (
		<Container>
			<Spin src={SpinImg} alt="Loading..." />;
		</Container>
	);
}

export default Spinner;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const Spin = styled(Image)`
	width: 20rem;
	height: 20rem;
`;
