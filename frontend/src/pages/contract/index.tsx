import MyContractsForm from "@components/contract/MyContracts";
import { useEffect, useState } from "react";
import { contractApi } from "src/api";
import { MyContracts } from "src/types/MyContracts";

function MyContractsList() {
	const [myContracts, setMyContracts] = useState<MyContracts[]>();

	useEffect(() => {
		getMyContracts();
	}, []);

	const getMyContracts = async () => {
		const res = await contractApi.getMyContracts();
		console.log(res.data);
		setMyContracts([...res.data]);
	};

	return (
		<>
			<MyContractsForm header="내 계약서" contracts={myContracts} />
		</>
	);
}

export default MyContractsList;
