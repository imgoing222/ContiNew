export interface Result {
	address_name: string;
	category_group_code: string;
	category_group_name: string;
	category_name: string;
	distance: string;
	id: string;
	phone: string;
	place_name: string;
	place_url: string;
	road_address_name: string;
	x: string;
	y: string;
}

export interface GeoCodeType {
	address_name: string;
	address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
	x: string;
	y: string;
	address: kakao.maps.services.Address;
	road_address: kakao.maps.services.RoadAaddress;
}
