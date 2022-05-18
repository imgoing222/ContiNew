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
							<div>
								<p>{contract.location}</p>
								<p>{contract.contract_type}</p>
								<p>
									계약 기간: {contract.contract_start} ~ {contract.contract_end}
								</p>
								<p>{contract.current_level === 4 ? "계약 완료" : "계약중"} </p>
							</div>
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
`;
export default MyContractsForm;
