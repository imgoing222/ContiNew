import Link from "next/link";
import styled from "styled-components";

interface ItemProps {
	item: { name: string; address: string };
}

function MenuItem({ item }: ItemProps) {
	return (
		<Container>
			<Link href={item.address}>
				{item.name}
			</Link>
		</Container>
	);
}

const Container = styled.li``;

export default MenuItem;
