import { AxiosResponse } from "axios";
import { request } from "./request";
import { ContractType } from "src/types/contractType";

interface required {
	buyer: string;
	house_id: number;
	seller: string;
}
interface ContractApiType {
	getContract: (value: required) => Promise<AxiosResponse>;
	breakContract: (value: required) => Promise<AxiosResponse>;
	createContract: (contractInfo: ContractType) => Promise<AxiosResponse>;
}

const contractApi: ContractApiType = {
	getContract: ({ buyer, seller, house_id }) =>
		request.get(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
	breakContract: ({ buyer, seller, house_id }) =>
		request.delete(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
	createContract: (contractInfo) => request.post(`auth/contracts`, contractInfo),
};

export default contractApi;
