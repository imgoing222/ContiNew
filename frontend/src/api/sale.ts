import camelToSnake from "@utils/camelToSnake";
import { AxiosResponse } from "axios";
import { SearchCondition } from "src/pages/saleList";
import House from "src/types/getListType";
import { request } from "./request";

export interface ArticleData {
	houses: House[];
	total_page_count: number;
	current_page_count: number;
}

interface SaleApiType {
	getSales: (
		coordinateInfo: SearchCondition,
		currentPage: number,
	) => Promise<AxiosResponse<ArticleData>>;
	createSale: (data: FormData) => Promise<AxiosResponse> | string;
	getCoodinates: (searchCondition: SearchCondition) => Promise<AxiosResponse>;
}

const saleApi: SaleApiType = {
	getSales: (coordinateInfo, currentPage) =>
		request.post(
			`houses/list?page=${currentPage}&size=10`,
			camelToSnake(checkMaxValue(coordinateInfo)),
		),
	createSale: (data) => request.post("auth/houses", data),
	getCoodinates: (data) => request.post("houses/all-list", camelToSnake(checkMaxValue(data))),
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
