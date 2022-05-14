import { AxiosResponse } from "axios";
import { request } from "./request";

interface ArticleApiType {
	deleteArticle: (id: number) => Promise<AxiosResponse>;
	editArticle: (data: FormData, id: number) => Promise<AxiosResponse>;
	getArticle: (id: number) => Promise<AxiosResponse>;
	addBookmark: (id: number) => Promise<AxiosResponse>;
	deleteBookmark: (id: number) => Promise<AxiosResponse>;
}

const articleApi: ArticleApiType = {
	deleteArticle: (id) => request.delete(`auth/houses/${id}`),
	editArticle: (data, id) => request.put(`auth/houses/${id}`, data),
	getArticle: (id) => request.get(`houses/${id}`),
	addBookmark: (id) => request.post(`auth/houses/likes/${id}`),
	deleteBookmark: (id) => request.delete(`auth/houses/likes/${id}`),
};

export default articleApi;
