import { AxiosResponse } from "axios";
import { request } from "./request";

interface MainApiType {
	getAroundHouse: (addressName: AddressNameType) => Promise<AxiosResponse>;
}

interface AddressNameType {
	sido_name: string;
	gungu_name: string;
	dong_name: string;
}

const mainApi: MainApiType = {
	getAroundHouse: (addressName) => request.post("houses/around", addressName),
};

export default mainApi;
