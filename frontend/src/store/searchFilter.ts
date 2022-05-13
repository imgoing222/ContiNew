import { SearchCondition } from "src/pages/saleList";

const SEARCH = "user/setUserInfo";

interface actionType {
	type: string;
	data: SearchCondition;
}

export const SET_FILTER = (data: string | number, keyName: string) => ({
	type: SEARCH,
	data,
	keyName,
});

const initialState = {
	yBottom: 32.438093757167825,
	yTop: 38.458093757167825,
	xLeft: 126.35492857215698,
	xRight: 129.65492857215698,
	saleType: " ",
	houseType: "",
	contractType: "",
	minDeposit: "",
	maxDeposit: "",
	minMonthlyRent: "",
	minMaintenanceFee: "",
	maxMaintenanceFee: "",
	period: "",
};

function searchFilter(state = initialState, action: actionType, keyName: string) {
	switch (action.type) {
		case SEARCH:
			return {
				...state,
			};
		default:
			return state;
	}
}

export default searchFilter;
