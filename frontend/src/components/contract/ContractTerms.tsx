import styled from "styled-components";

function ContractTerms() {
	return (
		<>
			<Term>
				<StyledStrong>제2조&#40;임차인의 의무&#41;</StyledStrong>
				<StyledP>
					① 임차인은 신규임차인을 임대인에게 주선하여야 하며, 임대인과 신규임차인 간에 임대차계약이
					체결될 수 있도록 협력하여야 한다.
				</StyledP>
				<StyledP>
					② 임차인은 신규임차인이 정상적으로 입주할 수 있도록 임차인 명의 변경절차 등에 협력하여야
					한다.
				</StyledP>
				<StyledP>
					③ 은 신규임차인이 잔금을 지급할 때까지 권리금의 대가로 임차인의 권리를 이전한다. ※ 필요한
					경우 이전 대상 목록을 별지로 첨부할 수 있다.
				</StyledP>
				<StyledP>
					④ 임차인은 신규임차인에게 제3항의 임차인의 권리를 이전할 때까지 선량한 관리자로서의
					주의의무를다하여 제3항의 재산적 가치를 유지ㆍ관리하여야 한다.
				</StyledP>
				<StyledP>
					⑤ 임차인은 본 계약체결 후 신규임차인이 잔금을 지급할 때까지 임차목적물상 권리관계, 보증금,
					월차임 등 임대차계약 내용이 변경된 경우 이를 즉시 신규임차인과 개업공인중개사에게
					고지하여야 한다. 계약은 무효로 하며, 임차인은 지급받은 계약금 등을 신규임차인에게 즉시
					반환하여야 한다.
				</StyledP>
			</Term>
			<Term>
				<StyledStrong>제3조&#40;임대차계약과의 관계&#41;</StyledStrong>
				<StyledP>
					임대인의 계약거절, 무리한 임대조건 변경, 목적물의 훼손 등 임차인과 신규임차인의 책임 없는
					사유로 임대차계약이 체결되지 못하는 경우 본 계약은 무효로 하며, 임차인은 지급받은 계약금
					등을 신규임차인에게 즉시 반환하여야 한다.
				</StyledP>
			</Term>
			<Term>
				<StyledStrong>제4조&#40;계약의 해제 및 손해배상&#41;</StyledStrong>
				<StyledP>
					① 신규임차인이 중도금&#40;중도금 약정이 없을 때는 잔금&#41;을 지급하기 전까지임차인은
					계약금의 2배를 배상하고, 신규임차인은 계약금을 포기하고 본 계약을 해제할 수 있다.
				</StyledP>
				<StyledP>
					② 임차인 또는 신규임차인이 본 계약상의 내용을 이행하지 않는 경우 그 상대방은 계약상의
					채무를 이행하지 않은 자에 대해서 서면으로 최고하고 계약을 해제할 수 있다.
				</StyledP>
				<StyledP>
					③계약의 해제 및 손해배상에 관하여는 이 계약서에 정함이 없는 경우 「민법」의 규정에 따른다.
				</StyledP>
			</Term>
		</>
	);
}

const Term = styled.div`
	font-size: 1.2rem;
	font-weight: 900;
	margin-bottom: 1.5rem;
`;

const StyledStrong = styled.strong`
	display: block;
	margin-bottom: 1rem;
`;

const StyledP = styled.p`
	margin-bottom: 0.5rem;
	color: rgba(0, 0, 0, 0.5);
`;
export default ContractTerms;
