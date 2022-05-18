import styled from "styled-components";
import Head from "next/head";
function index() {
	return (
		<>
			<Head>
				<title>이용 약관</title>
			</Head>
			<StyledDiv>
				<Title>이용 약관</Title>
				<StyledUl>
					<StyledLi>
						1. ContiNew는 단지 거래 중개자 역할로서, 회원간의 거래에 관해 어떠한 법적 책임도 지지
						않는다.
					</StyledLi>
					<StyledLi>
						2. 임차권의 양도는 임차인(양도인)과 양수인 사이의 계약만으로 유효하게 성립하나,
						「민법」은 임차인은 임대인의 동의 없이 임차권을 양도하지 못하도록 제한하고 있으며,
						임대인은 자신의 동의 없이 임차권을 양도한 경우 임대차계약을 해지할 수 있도록 하고
						있습니다(「민법」 제629조).
					</StyledLi>
					<StyledLi>
						3. 그러나, 임차인이 비록 임대인으로부터 별도의 승낙을 얻지 않고 제3자에게 임차물을
						사용·수익하도록 한 경우에 있어서도, 임차인의 당해 행위가 임대인에 대한 배신적 행위라고
						할 수 없는 특별한 사정이 인정되는 경우에는, 임대인은 자신의 동의 없이 임차권 양도가
						이루어졌다는 것만을 이유로 임대차계약을 해지할 수 없으며, 임차권 양수인은 임차권 양수 및
						그에 따른 사용·수익을 임대인에게 주장할 수 있습니다(대법원 2010.6.10, 선고,
						2009다101275, 판결). ※ 임대인과 임차인 당사자 간의 특약으로 임차권 양도에 임대인의
						동의가 필요하지 않는 것으로 하는 것은 유효합니다(「민법」 제652조).
					</StyledLi>
				</StyledUl>
			</StyledDiv>
		</>
	);
}
index.displayName = "term";
export default index;

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Title = styled.h1`
	font-size: 3rem;
	margin-bottom: 3rem;
`;

const StyledUl = styled.ul`
	font-size: 1.5rem;
	border: ${(props) => `1px solid ${props.theme.borderColor}`};
	padding: 2rem;
`;

const StyledLi = styled.li`
	margin-bottom: 3rem;
`;
