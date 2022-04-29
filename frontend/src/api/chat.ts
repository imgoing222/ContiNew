import { AxiosResponse } from "axios";
import { request } from "./request";

interface ChatData {
  buyer: string;
  seller: string;
  sale: number;
}

interface ChatApiType {
  createChat: (chatData: ChatData) => Promise<AxiosResponse>;
}

const chatApi: ChatApiType = {
  createChat: (chatData) => request.post("chat/room", chatData),
};

export default chatApi;