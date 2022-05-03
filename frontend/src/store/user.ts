const LOGIN = "user/setUserInfo";
const DELETE = "user/deleteUserInfo";
interface dataType {
	id: number;
	login_id: string;
	username: string;
	phone_nunber: string;
	phone_auth: boolean;
	provider: string;
}

interface userName {
	username: string;
}

interface actionType {
	type: string;
	data: dataType;
}

export const SET_USER = (data: dataType | userName) => ({ type: LOGIN, data });
export const DELETE_USER = () => ({ type: DELETE });

const initialState = {
	id: 0,
	login_id: "",
	username: "",
	phone_nunber: "",
	phone_auth: false,
	provider: "",
};

function userInfo(state = initialState, action: actionType) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				id: action.data.id,
				login_id: action.data.login_id,
				username: action.data.username,
				phone_nunber: action.data.phone_nunber,
				phone_auth: action.data.phone_auth,
				provider: action.data.provider,
			};
		case DELETE:
			return {
				id: 0,
				login_id: "",
				username: "",
				phone_nunber: "",
				phone_auth: false,
				provider: "",
			};
		default:
			return state;
	}
}

export default userInfo;
