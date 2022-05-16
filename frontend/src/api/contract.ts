import { AxiosResponse } from "axios";
import { request } from "./request";
import { ContractType } from "src/types/contractType";

interface required {
	buyer: string;
	buyer_agree: string;
	house_id: number;
	seller: string;
	seller_agree: string;
}
interface ContractRequestType {
	house_id: number;
	seller_login_id: string;
	buyer_login_id: string;
	member_type: string;
}
interface ContractApiType {
	getContract: (value: required) => Promise<AxiosResponse>;
	breakContract: (value: required) => Promise<AxiosResponse>;
	createContract: (contractInfo: ContractType) => Promise<AxiosResponse>;
	getContractAgree: (vlalue: required) => Promise<AxiosResponse>;
	agreeContract: (requestInfo: ContractRequestType) => Promise<AxiosResponse>;
}

const contractApi: ContractApiType = {
	getContract: ({ buyer, seller, house_id }) =>
		request.get(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
	breakContract: ({ buyer, seller, house_id }) =>
		request.delete(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
	createContract: (contractInfo) => request.post(`auth/contracts`, contractInfo),
	getContractAgree: ({ buyer_agree, house_id, seller_agree }) =>
		request.get(
			`auth/contracts/agree?buyer_agree=${buyer_agree}&house_id=${house_id}&seller_agree=${seller_agree}`,
		),
	agreeContract: (requestInfo) => request.post(`auth/contracts`, requestInfo),
};

export default contractApi;
