import { AxiosResponse } from "axios";
import { request } from "./request";

interface ChatData {
	buyer: string;
	buyer_id: string;
	seller: string;
	seller_id: string;
	sale: number;
}

interface ChatApiType {
	getChattingRoom: () => Promise<AxiosResponse>;
	createChattingRoom: (chatData: ChatData) => Promise<AxiosResponse>;
	getChatList: (roomId: string | null | undefined, currentPage?: number) => Promise<AxiosResponse>;
}

const chatApi: ChatApiType = {
	getChattingRoom: () => request.get("chat/room/list/"),
	createChattingRoom: (chatData) => request.post("chat/room", chatData),
	getChatList: (roomId, currentPage) =>
		request.get(`chat/messages/?room_id=${roomId}&page=${currentPage}`),
};

export default chatApi;
