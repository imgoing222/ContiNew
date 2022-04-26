import { AxiosResponse } from "axios";
import { request } from "./request";

interface Coordinate {
	y_bottom: number;
	y_top: number;
	x_left: number;
	x_right: number;
}

interface SaleListApiType {
	getSales: (coordinateInfo: Coordinate) => Promise<AxiosResponse>;
}

const saleListApi: SaleListApiType = {
	getSales: (coordinateInfo) => request.post("houses/list", coordinateInfo),
};

export default saleListApi;
