import { AxiosResponse } from "axios";
import { request } from "./request";

interface ProfileApiType {
	getUserInfo: () => Promise<AxiosResponse>;
	changeUsername: (username: string) => Promise<AxiosResponse>;
	changePassword: (passwords: {
		before_password: string;
		new_password: string;
	}) => Promise<AxiosResponse>;
}

const profileApi: ProfileApiType = {
	getUserInfo: () => request.get(`auth/members`),
	changeUsername: (username) => request.put(`auth/members/info`, username),
	changePassword: (passwords) => request.put(`auth/members/password`, passwords),
};

export default profileApi;
