import { AxiosResponse } from "axios";
import House from "src/types/getListType";
import { request } from "./request";

interface Coordinate {
	y_bottom: number;
	y_top: number;
	x_left: number;
	x_right: number;
}

interface SaleApiType {
	getSales: (coordinateInfo: Coordinate) => Promise<AxiosResponse<{ houses: Array<House> }>>;
	createSale: (data: FormData) => Promise<AxiosResponse>;
}

const saleApi: SaleApiType = {
	getSales: (coordinateInfo) => request.post("houses/list", coordinateInfo),
	createSale: (data) => request.post("auth/auth/houses", data),
};

export default saleApi;
