import Image from "next/image";
import styled from "styled-components";

interface OptionProps {
	name: string;
	fileName: string;
}

function OptionIcon({ name, fileName }: OptionProps) {
	return (
		<Container>
			<Image src={`/${fileName}.svg`} width="100%" height="100" alt="me" />
			<Text>{name}</Text>
		</Container>
	);
}

export default OptionIcon;

const Container = styled.div`
	margin-right: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Text = styled.p`
	font-size: 1.3rem;
	margin-top: 1rem;
`;
