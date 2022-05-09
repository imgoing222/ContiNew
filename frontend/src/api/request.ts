import axios, { AxiosInstance } from "axios";
import cookie from "react-cookies";
import authApi from "./auth";

axios.defaults.withCredentials = true;

const setInterceptors = (instance: AxiosInstance, isReissue?: boolean) => {
	instance.interceptors.request.use(
		(config) => {
			if (isReissue) return config;
			const token = cookie.load("access_token");
			if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		(error) => Promise.reject(error),
	);
	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const refresh_token = cookie.load("refresh_token");
			const access_token = cookie.load("access_token");
			if (error.response.data.error_code === "J01") {
				authApi.reissue({ access_token, refresh_token });
				return instance.request(error.config);
			}
			// if (error.response.data.error_code === "A08") {
			// 	return authApi.logout();
			// }
			return error.response.status;
		},
	);
	return instance;
};

const createInstance = () => {
	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance);
};

const authCreateInstance = () => {
	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_URL,
		timeout: 10000,
		headers: { "Content-Type": "application/json" },
	});
	return setInterceptors(instance, true);
};

export const authRequest = authCreateInstance();
export const request = createInstance();
