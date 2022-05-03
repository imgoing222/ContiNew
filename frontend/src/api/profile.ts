import { AxiosResponse } from "axios";
import { request } from "./request";

interface ProfileApiType {
	getUserInfo: () => Promise<AxiosResponse>;
}

const profileApi: ProfileApiType = {
	getUserInfo: () => request.get(`auth/members`),
};

export default profileApi;
