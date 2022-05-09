import { Axios, AxiosResponse } from "axios";
import { authRequest, request } from "./request";

interface AuthApiType {
	signup: (userInfo: {
		login_id: string;
		password: string;
		username?: string;
	}) => Promise<AxiosResponse>;
	signin: (userInfo: { login_id: string; password: string }) => Promise<AxiosResponse>;
	reissue: (tokens: { access_token: string; refresh_token: string }) => Promise<AxiosResponse>;
	sendCode: (phoneNumber: { phone_number: string }) => Promise<AxiosResponse>;
	confirmCode: (code: { code: string }) => Promise<AxiosResponse>;
	duplicateIdCheck: (id: { value: string }) => Promise<AxiosResponse>;
	duplicateUsernameCheck: (username: { value: string }) => Promise<AxiosResponse>;
	deleteAccount: () => Promise<AxiosResponse>;
}

const authApi: AuthApiType = {
	signup: (userInfo) => request.post("members", userInfo),
	signin: (userInfo) => request.post("members/login", userInfo),
	reissue: (tokens) => authRequest.post("members/reissue", tokens),
	sendCode: (phoneNumber) => request.post("auth/members/phone-send", phoneNumber),
	confirmCode: (code) => request.post("auth/members/phone-check", code),
	duplicateIdCheck: (id) => request.post("members/exist-login-id", id),
	duplicateUsernameCheck: (username) => request.post("members/exist-username", username),
	deleteAccount: () => request.delete("members"),
};

export default authApi;
