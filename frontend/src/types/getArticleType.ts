interface ArticleType {
	addressDetail: string;
	contractType: "전세" | "월세";
	deposit: number;
	description: string;
	floor: number;
	houseId: number;
	houseType: string;
	images: string[];
	jibunAddress: string;
	maintenanceDetail: string;
	maintenanceFee: number;
	monthlyRent: number;
	options: number[];
	period: number;
	phoneAuth: boolean;
	saleType: "이어살기" | "쉐어하우스";
	loginId: string;
	username: string;
	sidoName: string;
	gunguName: string;
	dongName: string;
	latitude: number;
	longitude: number;
}

export default ArticleType;
