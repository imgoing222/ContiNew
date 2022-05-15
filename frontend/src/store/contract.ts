import { ContractType } from "src/types/contractType";

const CONTRACT = "user/setContractInfo";
const ID = "user/setContractIds";
const LEVEL = "user/setContractLevel";
const ROLE = "user/setRole";

interface actionType {
	type: string;
	data: ContractType;
}

export const SET_CONTRACT = (data: ContractType) => ({ type: CONTRACT, data });
export const SET_ID = (data: ContractType) => ({ type: ID, data });
export const SET_LEVEL = (data: ContractType) => ({ type: LEVEL, data });
export const SET_ROLE = (data: string) => ({ type: ROLE, data });

const initialState = {
	contract: {
		location: "",
		area: 0,
		net_leasable_area: 0,
		contract_type: "",
		tenancy_deposit: "",
		maintenance_fee: "",
		contract_start: "",
		contract_end: "",
		total_premium: "",
		down_payment: "",
		middle_payment: "",
		middle_date: "",
		balance_payment: "",
		balance_date: "",
		seller_address: "",
		seller_name: "",
		seller_birth: "",
		seller_phone: "",
		seller_signature: "",
		buyer_address: "",
		buyer_name: "",
		buyer_birth: "",
		buyer_phone: "",
		buyer_signature: "",
	},
	level: {
		next_level: true,
	},
	id: {
		house_id: 0,
		seller_login_id: "",
		buyer_login_id: "",
	},
	step: {
		current_step: 2,
	},
	role: {
		user_role: "",
	},
};

function contractInfo(state = initialState, action: actionType) {
	switch (action.type) {
		case CONTRACT:
			return {
				...state,
				contract: {
					location: action.data.location,
					area: action.data.area,
					net_leasable_area: action.data.net_leasable_area,
					contract_type: action.data.contract_type,
					tenancy_deposit: action.data.tenancy_deposit,
					maintenance_fee: action.data.maintenance_fee,
					contract_start: action.data.contract_start,
					contract_end: action.data.contract_end,
					total_premium: action.data.total_premium,
					down_payment: action.data.down_payment,
					middle_payment: action.data.middle_payment,
					middle_date: action.data.middle_date,
					balance_payment: action.data.balance_payment,
					balance_date: action.data.balance_date,
					seller_address: action.data.seller_address,
					seller_name: action.data.seller_name,
					seller_birth: action.data.seller_birth,
					seller_phone: action.data.seller_phone,
					seller_signature: action.data.seller_signature,
					buyer_address: action.data.buyer_address,
					buyer_name: action.data.buyer_name,
					buyer_birth: action.data.buyer_birth,
					buyer_phone: action.data.buyer_phone,
					buyer_signature: action.data.buyer_signature,
				},
				step: { current_step: action.data.current_level },
			};
		case ID:
			return {
				...state,
				id: {
					house_id: action.data.house_id,
					seller_login_id: action.data.seller_login_id,
					buyer_login_id: action.data.buyer_login_id,
				},
			};
		case LEVEL:
			return {
				...state,
				level: {
					next_level: action.data.next_level,
				},
			};
		case ROLE:
			return {
				...state,
				role: {
					user_role: action.data,
				},
			};
		default:
			return state;
	}
}

export default contractInfo;
