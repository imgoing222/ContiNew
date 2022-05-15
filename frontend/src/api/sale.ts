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
	if (houseInfo.maxDeposit && houseInfo.maxDeposit === 10000)
		houseInfo.maxDeposit = "" as unknown as number;
	if (houseInfo.maxMonthlyRent && houseInfo.maxMonthlyRent === 300)
		houseInfo.maxMonthlyRent = "" as unknown as number;
	if (houseInfo.maxMaintenanceFee && houseInfo.maxMaintenanceFee === 50)
		houseInfo.maxMaintenanceFee = "" as unknown as number;
	if (houseInfo.period && houseInfo.period === 13) houseInfo.period = "" as unknown as number;

	console.log(houseInfo);
	return houseInfo;
};
