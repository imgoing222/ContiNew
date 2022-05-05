import styled from "styled-components";

interface ListProps {
	name: string;
	content: string;
	content2?: string;
	div?: boolean;
	price?: boolean;
}

interface Price {
	price?: string;
}

function PriceInfoList({ name, content, content2, div, price }: ListProps) {
	return (
		<Li>
			<Name>{name}</Name>
			{div ? (
				<div>
					{price ? <Content color="on">{content}</Content> : <Content>{content}</Content>}
					<Content>{content2}</Content>
				</div>
			) : (
				<Content>{content}</Content>
			)}
		</Li>
	);
}

export default PriceInfoList;

const Name = styled.p`
	width: 20rem;
	font-size: 1.8rem;
	font-weight: bold;
`;

const Li = styled.li`
	display: flex;
	padding: 1.5rem 0;
	border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Content = styled.p<Price>`
	font-size: 1.6rem;
	color: ${(props) => props.color && props.theme.mainColor};
	font-weight: ${(props) => props.color && "700"}; ;
`;
