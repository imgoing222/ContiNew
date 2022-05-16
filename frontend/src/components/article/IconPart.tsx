import styled from "styled-components";
import Image from "next/image";
import HouseInfo from "src/types/houseInfo";

interface IconProps {
	content1: string;
	content2: string;
	info1: string | number;
	info2: string | number;
}
function IconPart({ content1, content2, info1, info2 }: IconProps) {
	return (
		<Ul>
			<Li>
				<Image src={`/${content1}.svg`} width="40" height="40" />
				<IconText>{info1}</IconText>
			</Li>
			<Li>
				<Image src={`/${content2}.svg`} width="40" height="40" />
				<IconText>{info2}</IconText>
			</Li>
		</Ul>
	);
}

export default IconPart;

const Ul = styled.ul`
	margin: 0 auto;
	display: flex;
	margin-bottom: 2rem;
`;

const Li = styled.li`
	display: flex;
	align-items: center;
`;

const IconText = styled.p`
	font-size: 1.5rem;
	margin-left: 2rem;
	width: 15rem;
	@media ${(props) => props.theme.mobile} {
		width: 10rem;
		font-size: 1.2rem;
	}
`;
