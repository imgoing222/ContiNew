import { render, screen } from "@testing-library/react";
import Article from "../[id]";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

jest.mock("react-redux");
jest.mock("next/router", () => ({
	useRouter() {
		return {
			query: { id: 1 },
		};
	},
}));

describe("Article Loading page test", () => {
	it("Article Loading Page rendering", () => {
		render(<Article />);

		screen.getByAltText("Loading...");
	});
});
