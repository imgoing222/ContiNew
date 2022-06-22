import { getByTitle, render, screen } from "@testing-library/react";
import SaleList from "@components/saleList/SaleList";
import * as reactRedux from "react-redux";

const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
useDispatchMock.mockReturnValue(jest.fn());
const setData = jest.fn();
describe("saleList rendering test when there's nothing", () => {
	it("saleList render test", async () => {
		render(
			<SaleList
				saleList={[]}
				searchCondition={{}}
				totalPage={3}
				currentPage={0}
				setData={setData}
			/>,
		);
		const content = screen.getByText("매물 목록이 없습니다");
		expect(content).toBeInTheDocument();
	});
});
