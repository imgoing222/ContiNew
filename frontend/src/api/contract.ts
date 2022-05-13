import { AxiosResponse } from "axios";
import { request } from "./request";

interface ContractApiType {
	breakContract: (buyer: string, house_id: number, seller: string) => Promise<AxiosResponse>;
}

const contractApi: ContractApiType = {
	breakContract: (buyer, house_id, seller) =>
		request.delete(`auth/contracts?buyer=${buyer}&house_id=${house_id}&seller=${seller}`),
};

export default contractApi;
