import { AxiosResponse } from "axios";
import { request } from "./request";

interface ProfileApiType {
	getUserInfo: () => Promise<AxiosResponse>;
	changeUsername: (username: string) => Promise<AxiosResponse>;
	changePassword: (passwords: {
		before_password: string;
		new_password: string;
	}) => Promise<AxiosResponse>;
	getBookmarks: (page: number) => Promise<AxiosResponse>;
	getMyArticles: () => Promise<AxiosResponse>;
}

const profileApi: ProfileApiType = {
	getUserInfo: () => request.get(`auth/members`),
	changeUsername: (username) => request.put(`auth/members/info`, username),
	changePassword: (passwords) => request.put(`auth/members/password`, passwords),
	getBookmarks: (page) => request.get(`auth/houses/likes?page=${page}&size=5`),
	getMyArticles: () => request.get(`auth/houses/mine`),
};

export default profileApi;
