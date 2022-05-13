import { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

interface useInfiniteScrollProps {
	requestApi: (currentPage: number) => Promise<any>;
}

interface ChatMessageType {
	room_id: string;
	sender: string;
	content: string;
	read_at: string;
	created_at: string;
}

const useInfiniteScroll = ({ requestApi }: useInfiniteScrollProps) => {
	const [savedChatMessage, setSavedChatMessage] = useState<ChatMessageType[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const getChatList = async (currentPage: number) => {
		try {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 500));

			const res = await requestApi(currentPage);
			setTotalPage(res.data.total_page_count);
			setSavedChatMessage((prevSavedChatMessage) => [
				...prevSavedChatMessage,
				...res.data.chat_message,
			]);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
};

export default useInfiniteScroll;
