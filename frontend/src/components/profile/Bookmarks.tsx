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
									<Info>
										{bookmark.sale_type}({bookmark.contract_type})
									</Info>
									<Info>
										{bookmark.deposit} / {bookmark.monthly_rent}
									</Info>
									<Info></Info>
									<Info>{bookmark.house_type}</Info>
									<Info>{bookmark.jibun_address}</Info>
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
				<Text>등록한 북마크가 없습니다</Text>
			)}
		</Container>
	);
}

const ListItem = styled.li`
	display: flex;
	margin: 3rem 0;
	border: 0.3px solid #dddddd;
	cursor: pointer;
	padding: 2rem;
`;

const Image = styled.img`
	width: 50%;
	display: block;
	margin-right: 4rem;
	height: 20vh;
	border-radius: 0.5rem;
`;

const Button = styled.button`
	background-color: inherit;
	border: none;
	outline: none;
	cursor: pointer;
	width: 4rem;
	margin: 1rem auto;
`;

const Text = styled.p`
	font-size: 1.6rem;
	text-align: center;
	margin-top: 20rem;
`;

const Info = styled.p`
	margin: 1.5rem 0 0;
	font-size: 1.4rem;
`;

export default Bookmarks;
