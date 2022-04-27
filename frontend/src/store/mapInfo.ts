const SET = "map/mapInfo";

interface dataType {
	zoom: number;
}

interface actionType {
	type: string;
	data: dataType;
}

export const SET_MAP = (data: dataType) => ({ type: SET, data });

const initialState = {
	zoom: 0,
};

const mapInfo = (state = initialState, action: actionType) => {
	switch (action.type) {
		case SET:
			return {
				...state,
				zoom: action.data.zoom,
			};
		default:
			return state;
	}
};

export default mapInfo;
