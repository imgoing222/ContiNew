import { AxiosResponse } from "axios";
import { request } from "./request";

interface MainApiType {
	getAroundHouse: (addressData: AddressDataType) => Promise<AxiosResponse>;
}

interface AddressDataType {
	sido_name: string;
	gungu_name: string;
	dong_name: string;
}

const mainApi: MainApiType = {
  getAroundHouse: (addressData) => request.post("houses/around", addressData),
};

export default mainApi;
