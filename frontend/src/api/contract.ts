import { AxiosResponse } from "axios";
import { request } from "./request";

interface ContractApiType {
	getContract: (buyer: string, house_id: number, seller: string) => Promise<AxiosResponse>;
	breakContract: (buyer: string, house_id: number, seller: string) => Promise<AxiosResponse>;
}

const contractApi: ContractApiType = {
	getContract: (buyer, house_id, seller) =>
		request.get(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
	breakContract: (buyer, house_id, seller) =>
		request.delete(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
};

export default contractApi;
