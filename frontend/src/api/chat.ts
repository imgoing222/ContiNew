import { AxiosResponse } from "axios";
import { request } from "./request";

interface ChatData {
	buyer: string;
	seller: string;
	sale: number;
}

interface ChatApiType {
  getChattingRoom: () => Promise<AxiosResponse>;
	createChat: (chatData: ChatData) => Promise<AxiosResponse>;
}

const chatApi: ChatApiType = {
	getChattingRoom: () => request.get("chat/room/list/"),
	createChat: (chatData) => request.post("chat/room", chatData),
};

export default chatApi;
