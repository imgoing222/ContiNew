import styled from "styled-components";

interface Props {
	setOnUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tabs({ setOnUserInfo }: Props) {
	const handleTabClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
		const { innerHTML } = e.target as HTMLParagraphElement;
		if (innerHTML === "내 정보") setOnUserInfo(true);
		else if (innerHTML === "관심목록") setOnUserInfo(false);
	};

	return (
		<Container>
			<Tab onClick={handleTabClick}>내 정보</Tab>
			<Tab onClick={handleTabClick}>관심목록</Tab>
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
`;

export default Tabs;
