import { render, screen } from "@testing-library/react";
import SaleList from "@components/saleList/SaleList";

jest.mock("react-redux");

const setData = jest.fn();
it("saleList rendering test when there's nothing", () => {
	render(
		<SaleList saleList={[]} searchCondition={{}} totalPage={3} currentPage={0} setData={setData} />,
	);
	const content = screen.getByText("매물 목록이 없습니다");
	expect(content).toBeInTheDocument();
});

it("saleList render test when ther are sales", () => {
	const searchCondition = {
		yBottom: 37.464403462045794,
		yTop: 37.64268459862409,
		xLeft: 126.77103447067478,
		xRight: 127.16968636277439,
		saleType: "",
		houseType: "",
		contractType: "",
		minDeposit: 0,
		maxDeposit: 10000,
		minMonthlyRent: 0,
		maxMonthlyRent: 500,
		minMaintenanceFee: 0,
		maxMaintenanceFee: 50,
		period: 13,
		options: [],
	};
	const sales = [
		{
			address_detail: "203호",
			contract_type: "월세",
			deposit: 500,
			description: "외대 후문 인근 투룸입니다. 협의 가능 문의 주세요",
			dong_name: "이문동",
			floor: "2",
			gungu_name: "동대문구",
			house_id: 2,
			house_type: "투룸",
			jibun_address: "서울 동대문구 이문동 264-359",
			latitude: 37.5986218795271,
			longitude: 127.054658630154,
			main_image:
				"https://continew.s3.ap-northeast-2.amazonaws.com/house/a02a44fb-2a75-457f-9eb1-08c8952ded5a%EB%B0%A92-1.jpg",
			maintenance_fee: 3,
			monthly_rent: 30,
			sale_type: "쉐어하우스",
			sido_name: "서울",
		},
	];
	render(
		<SaleList
			saleList={sales}
			searchCondition={searchCondition}
			totalPage={1}
			currentPage={0}
			setData={setData}
		/>,
	);
	expect(screen.getByText("서울 동대문구 이문동"));
	expect(screen.getByText(1));
	expect(screen.getByText("쉐어하우스"));
	expect(screen.getByText("투룸"));
	expect(screen.getByText("이어살기"));
});
