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
	getSales: (coordinateInfo) =>
		request.post("houses/list", camelToSnake(checkMaxValue(coordinateInfo))),
	createSale: (data) => request.post("auth/houses", data),
};

export default saleApi;

const checkMaxValue = (houseInfo: SearchCondition) => {
	const temp = Object.assign({}, houseInfo);
	if (temp.maxDeposit && temp.maxDeposit === 10000) temp.maxDeposit = "" as unknown as number;
	if (temp.maxMonthlyRent && temp.maxMonthlyRent === 300)
		temp.maxMonthlyRent = "" as unknown as number;
	if (temp.maxMaintenanceFee && temp.maxMaintenanceFee === 50)
		temp.maxMaintenanceFee = "" as unknown as number;
	if (temp.period && temp.period === 13) temp.period = "" as unknown as number;

	return temp;
};
