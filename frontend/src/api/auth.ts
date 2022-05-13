import { Axios, AxiosResponse } from "axios";
import { persistor } from "src/pages/_app";
import { authRequest, request } from "./request";
import cookie from "react-cookies";

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
	logout: () => void;
	findPassword: (userInfo: { login_id: string; phone_number: string }) => Promise<AxiosResponse>;
	confirmChangeCode: (code: string) => Promise<AxiosResponse>;
	changePassword: (value: { new_password: string; change_token: string }) => Promise<AxiosResponse>;
	googleLogin: (code: string) => Promise<AxiosResponse>;
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
	logout: () => {
		cookie.remove("access_token");
		cookie.remove("refresh_token");
		persistor.purge();
		window.location.replace("/");
	},
	findPassword: (userInfo) => request.post("members/find-pw/phone-send", userInfo),
	confirmChangeCode: (code) => request.post("members/find-pw/phone-check", { code }),
	changePassword: (value) => request.post("members/find-pw/change-pw", value),
	googleLogin: (code) => request.get(`api/members/login/google/callback?code=${code}`),
};

export default authApi;
