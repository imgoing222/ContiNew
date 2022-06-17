import { render, screen } from "@testing-library/react";
import SignupComplete from "./signupComplete";

describe("singupComplete test", () => {
	it("should render signupComplete", () => {
		render(<SignupComplete />);
		screen.getByText("변경");
	});
});
