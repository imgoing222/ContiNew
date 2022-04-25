import { AxiosResponse } from "axios";
import { request } from "./request";

interface AuthApiType {
	signup: (userInfo: {
		login_id: string;
		password: string;
		username: string;
	}) => Promise<AxiosResponse>;
}

const authApi: AuthApiType = {
	signup: (userInfo) => request.post("members", userInfo),
};

export default authApi;
