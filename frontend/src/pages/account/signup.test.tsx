import { render, screen } from "@testing-library/react";
import SignupComplete from "./signupComplete";
import { useSelector } from "react-redux";

jest.mock("react-redux");

describe("singupComplete test", () => {
	it("should render signupComplete", () => {
		render(<SignupComplete />);
		screen.getByText("홈");
	});
});
