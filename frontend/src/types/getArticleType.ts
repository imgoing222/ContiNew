interface ArticleType {
	address_detail: string;
	contract_type: string;
	deposit: number;
	description: string;
	floor: number;
	house_id: number;
	house_type: string;
	images: string[];
	jibun_address: string;
	maintenance_detail: string;
	maintenance_fee: number;
	monthly_rent: number;
	options: number[];
	period: number;
	phone_auth: boolean;
	sale_type: string;
	username: string;
}

export default ArticleType;
