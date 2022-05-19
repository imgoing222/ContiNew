import { useState } from "react";
import styled from "styled-components";

interface Props {
	setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
	tabs: string[];
}

function Tabs({ setCurrentTab, tabs }: Props) {
	const [clicked, setClicked] = useState(0);
	const handleTabClick = (idx: number) => {
		setCurrentTab(idx);
		setClicked(idx);
	};

	return (
		<Container>
			{tabs.map((tab, idx) => (
				<Tab onClick={() => handleTabClick(idx)} clicked={clicked === idx ? true : false} key={idx}>
					{tab}
				</Tab>
			))}
		</Container>
	);
}

interface ContainerProps {
	marginBottom?: number;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	justify-content: space-evenly;
	border-bottom: 0.5px solid #dedede;
	margin-bottom: 5rem;
`;
interface TabProps {
	clicked?: boolean;
}

const Tab = styled.p<TabProps>`
	padding: 0 6rem;
	font-size: 1.8rem;
	cursor: pointer;
	margin: 2rem 0;
	color: ${({ clicked }) => (clicked ? "#000000" : "#dedede")};
`;

export default Tabs;
