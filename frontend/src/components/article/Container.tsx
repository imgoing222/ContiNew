import styled from "styled-components";

interface ContainerProps {
	title: string;
	children: React.ReactNode;
}

function Container({ title, children }: ContainerProps) {
	return (
		<Section>
			<Title>{title}</Title>
			{children}
		</Section>
	);
}

export default Container;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	margin-bottom: 8rem;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	margin-bottom: 3rem;
`;
