import { SearchCondition } from "src/pages/saleList";

const COORDINATES = "searchFilter/setCoodinates";
const SALE_TYPE = "searchFilter/saleType";
const HOUSE_TYPE = "searchFilter/houseType";
const CONTRACT_TYPE = "searchFilter/contractType";
const DEPOSIT = "searchFilter/deposit";
const MONTHLY_RENT = "searchFilter/monthlyRent";
const MAINTENANCE_FEE = "searchFilter/maintenanceFee";
const PERIOD = "searchFilter/Period";

interface actionType {
	type: string;
	data: SearchCondition;
}

export const SET_FILTER = (data: string | number, name: string) => {
	const mapper = {
		coordinates: () => ({
			type: COORDINATES,
			data,
		}),
		saleType: () => ({
			type: SALE_TYPE,
			data,
		}),
		houseType: () => ({
			type: HOUSE_TYPE,
			data,
		}),
		contractType: () => ({
			type: CONTRACT_TYPE,
			data,
		}),
		deposit: () => ({
			type: DEPOSIT,
			data,
		}),
		monthlyRent: () => ({
			type: MONTHLY_RENT,
			data,
		}),
		maintenanceFee: () => ({
			type: MAINTENANCE_FEE,
			data,
		}),
		period: () => ({
			type: PERIOD,
			data,
		}),
	};
	mapper[name as keyof typeof mapper]();
};

const initialState = {
	yBottom: 32.438093757167825,
	yTop: 38.458093757167825,
	xLeft: 126.35492857215698,
	xRight: 129.65492857215698,
	saleType: "",
	houseType: "",
	contractType: "",
	minDeposit: 0,
	maxDeposit: 2147483646,
	minMonthlyRent: 0,
	maxMonthlyRent: 2147483646,
	minMaintenanceFee: 0,
	maxMaintenanceFee: 2147483646,
	period: 2147483646,
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
				minDeposit: action.data.minDeposit,
				maxDeposit: action.data.maxDeposit,
			};
		case MONTHLY_RENT:
			return {
				...state,
				maxMonthlyRent: action.data.maxMonthlyRent,
				minMonthlyRent: action.data.minMonthlyRent,
			};
		case MAINTENANCE_FEE:
			return {
				...state,
				minMaintenanceFee: action.data.minMaintenanceFee,
				maxMaintenanceFee: action.data.maxMaintenanceFee,
			};
		case PERIOD:
			return {
				...state,
				period: action.data.period,
			};

		default:
			return state;
	}
}

export default searchFilter;
