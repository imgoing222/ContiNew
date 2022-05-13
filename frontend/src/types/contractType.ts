interface ContractType {
	location: string;
	area: number;
	net_leasable_area: number;
	contract_type: string;
	tenancy_deposit: string;
	maintenance_fee: string;
	contract_start: string;
	contract_end: string;
	total_premium: string;
	down_payment: string;
	middle_payment: string;
	middle_date: string;
	balance_payment: string;
	balance_date: string;
	seller_address: string;
	seller_name: string;
	seller_birth: string;
	seller_phone: string;
	seller_signature: string;
	buyer_address: string;
	buyer_name: string;
	buyer_birth: string;
	buyer_phone: string;
	buyer_signature: string;
	current_level: number;
}

export default ContractType;
