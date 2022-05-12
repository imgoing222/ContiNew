import { useEffect, useState } from "react";
import profileApi from "src/api/profile";
import House from "src/types/getListType";
import { Container } from "./Container";

function Favorites() {
	const [favorites, setFavorites] = useState<House[] | []>();
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		getFavorites();
	}, []);

	const getFavorites = async () => {
		const res = await profileApi.getFavorites();
		setFavorites(res.data.houses);
		setCurrentPage(res.data.current_page);
		setTotalPage(res.data.total_page);
	};

	return (
		<Container>
			<div>관심 매물 목록</div>
			<button>Show More</button>
		</Container>
	);
}

export default Favorites;
