import { AxiosResponse } from "axios";
import { request } from "./request";

interface ContractApiType {
	breakContract: () => Promise<AxiosResponse>;
}

const contractApi: ContractApiType = {
	breakContract: () => request.delete(`auth/contracts`),
};

export default contractApi;
