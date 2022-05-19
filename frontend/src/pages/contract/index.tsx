import MyContractsForm from "@components/contract/MyContracts";
import { useEffect, useState } from "react";
import { contractApi } from "src/api";
import { MyContracts } from "src/types/MyContracts";
import { Header } from "@components/account/Header";
import Tabs from "@components/profile/Tabs";
import styled from "styled-components";
import House from "src/types/getListType";

function MyContractsList() {
	const [onGoingContracts, setOnGoingContracts] = useState<MyContracts[]>([]);
	const [completedContracts, setCompletedContracts] = useState<MyContracts[]>([]);
	const [currentTab, setCurrentTab] = useState(0);

	const tabs = ["계약중", "계약완료"];
	useEffect(() => {
		getMyContracts();
	}, []);

	const getMyContracts = async () => {
		const res = await contractApi.getMyContracts();
		res.data.forEach((contract: MyContracts) => {
			if (contract.current_level === 4) {
				setCompletedContracts((prev) => [...prev, contract]);
			} else setOnGoingContracts((prev) => [...prev, contract]);
		});
		console.log(onGoingContracts, completedContracts);
	};

	return (
		<Container>
			<Tabs setCurrentTab={setCurrentTab} tabs={tabs} />
			<MyContractsForm contracts={currentTab === 0 ? onGoingContracts : completedContracts} />
		</Container>
	);
}

const Container = styled.div`
	width: 60%;
	margin: 5rem auto;
`;
export default MyContractsList;
