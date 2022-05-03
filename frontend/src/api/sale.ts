import { AxiosResponse } from "axios";
import { request } from "./request";

interface Coordinate {
	y_bottom: number;
	y_top: number;
	x_left: number;
	x_right: number;
}

interface SaleApiType {
	getSales: (coordinateInfo: Coordinate) => Promise<AxiosResponse>;
	createSale: (data: FormData) => Promise<AxiosResponse>;
}

const saleApi: SaleApiType = {
	getSales: (coordinateInfo) => request.post("houses/list", coordinateInfo),
	createSale: (data) => request.post("houses", data),
};

export default saleApi;
