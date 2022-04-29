import { AxiosResponse } from "axios";
import { request } from "./request";

interface AuthApiType {
	signup: (userInfo: {
		login_id: string;
		password: string;
		username?: string;
	}) => Promise<AxiosResponse>;
	signin: (userInfo: { login_id: string; password: string }) => Promise<AxiosResponse>;
	sendCode: (phoneNumber: { phone_number: string }) => Promise<AxiosResponse>;
}

const authApi: AuthApiType = {
	signup: (userInfo) => request.post("members", userInfo),
	signin: (userInfo) => request.post("members/login", userInfo),
	sendCode: (phoneNumber) => request.post("auth/members/phone-send", phoneNumber),
};

export default authApi;
