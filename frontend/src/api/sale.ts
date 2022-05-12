import camelToSnake from "@utils/camelToSnake";
import { AxiosResponse } from "axios";
import { SearchCondition } from "src/pages/saleList";
import House from "src/types/getListType";
import { request } from "./request";

interface SaleApiType {
	getSales: (coordinateInfo: SearchCondition) => Promise<AxiosResponse<{ houses: Array<House> }>>;
	createSale: (data: FormData) => Promise<AxiosResponse>;
}

const saleApi: SaleApiType = {
	getSales: (coordinateInfo) => request.post("houses/list", camelToSnake(coordinateInfo)),
	createSale: (data) => request.post("auth/auth/houses", data),
};

export default saleApi;
