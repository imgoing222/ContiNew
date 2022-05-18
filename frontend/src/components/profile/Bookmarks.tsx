import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profileApi from "src/api/profile";
import House from "src/types/getListType";
import styled from "styled-components";
import { Container } from "./Container";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function Bookmarks() {
	const [bookmarks, setFavorites] = useState<House[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const router = useRouter();

	useEffect(() => {
		getBookmarks(currentPage);
	}, []);

	const getBookmarks = async (page: number) => {
		const res = await profileApi.getBookmarks(page);
		if (bookmarks) setFavorites((prev) => prev?.concat(res.data.houses));
		else setFavorites(res.data.houses);
		setCurrentPage(res.data.current_page_count);
		setTotalPage(res.data.total_page_count);
	};

	const handleBookmarkClick = (houseId: number) => {
		router.push(`/article/${houseId}`);
	};

	const handleShowmoreClick = () => {
		getBookmarks(currentPage + 1);
	};

	return (
		<Container>
			{bookmarks.length > 0 ? (
				<>
					<ul>
						{bookmarks.map((bookmark) => (
							<ListItem
								key={bookmark.house_id}
								onClick={() => {
									handleBookmarkClick(bookmark.house_id);
								}}
							>
								<Image src={bookmark.main_image} />
								<div>
									<p>{bookmark.contract_type}</p>
									<p>{bookmark.jibun_address}</p>
								</div>
							</ListItem>
						))}
					</ul>
					{currentPage < totalPage - 1 && (
						<Button onClick={handleShowmoreClick}>
							<FontAwesomeIcon icon={faCirclePlus} size="3x" color="#DC143C" />
						</Button>
					)}
				</>
			) : (
				<h2>등록한 관심 매물 목록이 없습니다</h2>
			)}
		</Container>
	);
}

const ListItem = styled.li`
	display: flex;
	margin: 3rem 0;
	border: 0.3px solid #dddddd;
	cursor: pointer;
`;

const Image = styled.img`
	max-width: 50%;
	display: block;
	margin-right: 2rem;
	height: 20vh;
`;

const Button = styled.button`
	background-color: inherit;
	border: none;
	outline: none;
	cursor: pointer;
	width: 4rem;
	margin: 1rem auto;
`;
export default Bookmarks;
