import styled from "styled-components";

interface Props {
	setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
	tabs: string[];
}

function Tabs({ setCurrentTab, tabs }: Props) {
	const handleTabClick = (tab: string) => {
		if (tab === "내 정보") setCurrentTab(0);
		else if (tab === "북마크") setCurrentTab(1);
		else if (tab === "내 매물") setCurrentTab(2);
	};

	return (
		<Container>
			{tabs.map((tab) => (
				<Tab onClick={() => handleTabClick(tab)}>{tab}</Tab>
			))}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 0.5px solid #dedede;
`;

const Tab = styled.p`
	padding: 0 6rem;
	font-size: 1.8rem;
	cursor: pointer;
	margin: 2rem 0;
	color: #ababab;
`;

export default Tabs;
