import { useRouter } from "next/router";
import { MyContracts } from "src/types/MyContracts";
import styled from "styled-components";

interface Props {
	contracts: MyContracts[] | undefined;
}

function MyContractsForm({ contracts }: Props) {
	const router = useRouter();
	const handleMyContractClick = (articleId: number, sellerId: string, buyerId: string) => {
		router.push(
			{
				pathname: `/contract/${articleId}`,
				query: { buyerId, sellerId, articleId },
			},
			`/contract/${articleId}`,
		);
	};
	return (
		<div>
			{contracts && contracts.length > 0 ? (
				<>
					{contracts.map((contract, idx) => (
						<MyContractItem
							key={idx}
							onClick={() => {
								handleMyContractClick(contract.house_id, contract.seller_id, contract.buyer_id);
							}}
						>
							<Img src={contract.house_image} />
							<DescriptionBox>
								{contract.current_level === 1 ? (
									<>
										<Info>계약이 시작되었습니다</Info>
										<Info>클릭하여 계약서 내용을 작성해주세요</Info>
									</>
								) : (
									<>
										<Info>{contract.location}</Info>
										<Info>{contract.contract_type}</Info>
										<Info>
											계약 기간 : {contract.contract_start} ~ {contract.contract_end}
										</Info>
									</>
								)}
								<StatusBadge
									color={contract.current_level === 4 ? "#007012" : "#CA0000"}
									backgroundColor="white"
									borderColor={contract.current_level === 4 ? "#008D28" : "#DB0202"}
								>
									{contract.current_level === 4 ? "계약 완료" : "계약중"}
								</StatusBadge>
							</DescriptionBox>
						</MyContractItem>
					))}
				</>
			) : (
				<p>진행중이거나 완료된 계약이 없습니다</p>
			)}
		</div>
	);
}

const MyContractItem = styled.div`
	cursor: pointer;
	border: 0.5px solid #dedede;
	font-size: 2rem;
	display: flex;
	max-height: 20vh;
	margin: 4rem auto;
	width: 100%;
`;

const Img = styled.img`
	display: block;
	max-width: 30%;
	padding: 2.5rem;
`;

const DescriptionBox = styled.div`
	width: 100%;
	padding: 2rem 4rem;
`;

const Info = styled.p`
	margin: 1.5rem 0 0;
	font-size: 1.8rem;
`;
interface StatusProps {
	backgroundColor: string;
	color: string;
	borderColor: string;
}

const StatusBadge = styled.button<StatusProps>`
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: ${({ color }) => color};
	border: ${({ borderColor }) => ` 0.3rem solid ${borderColor}`};
	border-radius: 0.6rem;
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	margin-left: auto;
	display: block;
`;
export default MyContractsForm;
