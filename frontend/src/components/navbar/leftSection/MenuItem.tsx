import Link from "next/link";
import styled from "styled-components";

interface ItemProps {
	item: { name: string; address: string };
}

function MenuItem({ item }: ItemProps) {
	return (
		<Container>
			<Link href={item.address} passHref>
				<Title>{item.name}</Title>
			</Link>
		</Container>
	);
}

const Container = styled.li``;

const Title = styled.a`
	font-size: 2rem;
  margin-left: 1.5rem;
`;

export default MenuItem;
