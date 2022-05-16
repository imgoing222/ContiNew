import { ArticleData } from "src/pages/saleList";
import styled from "styled-components";

interface Props {
	total: number;
	page: number;
	setData: React.Dispatch<React.SetStateAction<ArticleData>>;
}

function Pagination({ total, page, setData }: Props) {
	return (
		<>
			<Nav>
				<Button
					onClick={() => setData((prev) => ({ ...prev, currentPage: page - 1 }))}
					disabled={page === 0}
				>
					&lt;
				</Button>
				{Array(total)
					.fill("")
					.map((_, i) => (
						<Button
							key={i + 1}
							onClick={() => setData((prev) => ({ ...prev, currentPage: i }))}
							aria-current={page === i && "true"}
						>
							{i + 1}
						</Button>
					))}
				<Button
					onClick={() => setData((prev) => ({ ...prev, currentPage: page + 1 }))}
					disabled={page === total - 1}
				>
					&gt;
				</Button>
			</Nav>
		</>
	);
}

export default Pagination;

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	margin: 2rem;
	margin-right: 3rem;
	margin-bottom: 5rem;
`;

const Button = styled.button`
	border: none;
	border-radius: 0.8rem;
	width: max-content;
	padding: 1rem;
	margin: 0;
	background: transparent;
	color: black;
	font-size: 1.5rem;
	&:hover {
		background: rgba(255, 80, 80, 0.8);
		cursor: pointer;
		transform: translateY(-2px);
		height: auto;
	}

	&:disabled {
		background: transparent;
		cursor: revert;
		transform: revert;
	}
	&[aria-current="true"] {
		background: #000;
		font-weight: bold;
		color: white;
		cursor: revert;
		transform: revert;
		font-size: 2rem;
		width: max-content;
		height: auto;
	}
`;
