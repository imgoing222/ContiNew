import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

interface useInfiniteScrollProps {
	roomId: string | null | undefined;
	requestApi: (roomId: string | null | undefined, currentPage: number) => Promise<any>;
}

interface ChatMessageType {
	room_id: string;
	sender: string;
	content: string;
	read_at: string;
	created_at: string;
}

const useInfiniteScroll = ({ roomId, requestApi }: useInfiniteScrollProps) => {
	const [savedChatMessage, setSavedChatMessage] = useState<ChatMessageType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getChatList(roomId, currentPage);
	}, [currentPage]);

	const getChatList = async (roomId: string | null | undefined, currentPage: number) => {
		try {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 500));
			const res = await requestApi(roomId, currentPage);
			setTotalPage(res.data.total_page_count);
			setSavedChatMessage(res.data.chat_message);
			console.log(savedChatMessage);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
		if (entry.isIntersecting && !isLoading) {
			if (currentPage >= totalPage) return;
			observer.unobserve(entry.target);
			setCurrentPage((prev) => prev + 1);
			observer.observe(entry.target);
		}
	};

	const { setTarget } = useIntersectionObserver({
		root: null,
		rootMargin: "0px",
		threshold: 1,
		onIntersect,
	});

	return { setTarget, savedChatMessage, isLoading, currentPage };
};

export default useInfiniteScroll;
