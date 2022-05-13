import { SearchCondition } from "src/pages/saleList";

const SEARCH = "user/setUserInfo";

interface actionType {
	type: string;
	data: SearchCondition;
}

export const SET_FILTER = (data: string | number) => ({
	type: SEARCH,
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
	maxDeposit: Number.MAX_SAFE_INTEGER,
	minMonthlyRent: 0,
	maxMonthlyRnet: Number.MAX_SAFE_INTEGER,
	minMaintenanceFee: 0,
	maxMaintenanceFee: Number.MAX_SAFE_INTEGER,
	period: Number.MAX_SAFE_INTEGER,
};

function searchFilter(state = initialState, action: actionType) {
	switch (action.type) {
		case SEARCH:
			return {
				...state,
				xRight: action.data.xRight,
			};
		default:
			return state;
	}
}

export default searchFilter;
