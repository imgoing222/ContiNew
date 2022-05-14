import { SearchCondition } from "src/pages/saleList";

const COORDINATES = "searchFilter/setCoodinates";
const SALE_TYPE = "searchFilter/saleType";
const HOUSE_TYPE = "searchFilter/houseType";
const CONTRACT_TYPE = "searchFilter/contractType";
const DEPOSIT = "searchFilter/deposit";
const MONTHLY_RENT = "searchFilter/monthlyRent";
const MAINTENANCE_FEE = "searchFilter/maintenanceFee";
const PERIOD = "searchFilter/Period";
const OPTIONS = "searchFilter/Options";
export interface actionProps extends SearchCondition {
	min?: number;
	max?: number;
}

interface actionType {
	type: string;
	data: actionProps;
}

export const setSaleType = (data: actionProps) => ({
	type: SALE_TYPE,
	data,
});
export const setCoodinates = (data: actionProps) => ({
	type: COORDINATES,
	data,
});
export const sethouseType = (data: actionProps) => ({
	type: HOUSE_TYPE,
	data,
});
export const setContractType = (data: actionProps) => ({
	type: CONTRACT_TYPE,
	data,
});
export const setDeposit = (data: actionProps) => ({
	type: DEPOSIT,
	data,
});
export const setMonthlyRent = (data: actionProps) => ({
	type: MONTHLY_RENT,
	data,
});
export const setMaintenanceFee = (data: actionProps) => ({
	type: MAINTENANCE_FEE,
	data,
});
export const setPeriod = (data: actionProps) => ({
	type: PERIOD,
	data,
});
export const setOptions = (data: actionProps) => ({
	type: OPTIONS,
	data,
});

const initialState = {
	yBottom: 32.438093757167825,
	yTop: 38.458093757167825,
	xLeft: 126.35492857215698,
	xRight: 129.65492857215698,
	saleType: "",
	houseType: "",
	contractType: "",
	minDeposit: 0,
	maxDeposit: 10000,
	minMonthlyRent: 0,
	maxMonthlyRent: 300,
	minMaintenanceFee: 0,
	maxMaintenanceFee: 50,
	period: 13,
	options: [],
};

function searchFilter(state = initialState, action: actionType) {
	switch (action.type) {
		case COORDINATES:
			return {
				...state,
				xRight: action.data.xRight,
				yBottom: action.data.yBottom,
				yTop: action.data.yTop,
				xLeft: action.data.xLeft,
			};
		case SALE_TYPE:
			return {
				...state,
				saleType: action.data.saleType,
			};
		case HOUSE_TYPE:
			return {
				...state,
				houseType: action.data.houseType,
			};
		case CONTRACT_TYPE:
			return {
				...state,
				contractType: action.data.contractType,
			};
		case DEPOSIT:
			return {
				...state,
				minDeposit: action.data.min,
				maxDeposit: action.data.max,
			};
		case MONTHLY_RENT:
			return {
				...state,
				maxMonthlyRent: action.data.max,
				minMonthlyRent: action.data.min,
			};
		case MAINTENANCE_FEE:
			return {
				...state,
				minMaintenanceFee: action.data.min,
				maxMaintenanceFee: action.data.max,
			};
		case PERIOD:
			return {
				...state,
				period: action.data.period !== 12 ? action.data.period : 13,
			};
		case OPTIONS:
			return {
				...state,
				options: action.data.options,
			};

		default:
			return state;
	}
}

export default searchFilter;
