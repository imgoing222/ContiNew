export interface ContractType {
	location: string | undefined;
	area: number | undefined;
	net_leasable_area: number | undefined;
	contract_type: string | undefined;
	tenancy_deposit: string | undefined;
	maintenance_fee: string | undefined;
	contract_start: string | undefined;
	contract_end: string | undefined;
	total_premium: string | undefined;
	down_payment: string | undefined;
	middle_payment: string | undefined;
	middle_date: string | undefined;
	balance_payment: string | undefined;
	balance_date: string | undefined;
	seller_address: string | undefined;
	seller_name: string | undefined;
	seller_birth: string | undefined;
	seller_phone: string | undefined;
	seller_signature: string | undefined;
	buyer_address: string | undefined;
	buyer_name: string | undefined;
	buyer_birth: string | undefined;
	buyer_phone: string | undefined;
	buyer_signature: string | undefined;
	current_level: number | undefined;
	house_id: number | undefined;
	seller_login_id: string | undefined;
	buyer_login_id: string | undefined;
	next_level: boolean | undefined;
}

export interface ContractStore {
	contract: ContractType;
	level: {
		next_level: boolean;
	};
	id: {
		house_id: number;
		seller_login_id: string;
		buyer_login_id: string;
	};
	step: {
		current_step: number;
	};
	role: {
		user_role: string;
	};
}
