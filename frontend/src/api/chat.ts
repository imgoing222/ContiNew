import { AxiosResponse } from "axios";
import { request } from "./request";

interface ChatData {
	buyer: string;
	seller: string;
	sale: number;
}

interface ChatApiType {
  getChattingRoom: () => Promise<AxiosResponse>;
	createChattingRoom: (chatData: ChatData) => Promise<AxiosResponse>;
}

const chatApi: ChatApiType = {
	getChattingRoom: () => request.get("chat/room/list/"),
	createChattingRoom: (chatData) => request.post("chat/room", chatData),
};

export default chatApi;
