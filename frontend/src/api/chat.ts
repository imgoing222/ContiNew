import { AxiosResponse } from "axios";
import { request } from "./request";

interface ChatData {
	buyer: string;
	seller: string;
	sale: number;
}

interface ChatApiType {
  getChat: () => Promise<AxiosResponse>;
	createChat: (chatData: ChatData) => Promise<AxiosResponse>;
}

const chatApi: ChatApiType = {
	getChat: () => request.get("chat/room"),
	createChat: (chatData) => request.post("chat/room", chatData),
};

export default chatApi;
