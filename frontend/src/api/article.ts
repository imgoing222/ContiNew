import { AxiosResponse } from "axios";
import { request } from "./request";

interface ArticleApiType {
	deleteArticle: (id: number) => Promise<AxiosResponse>;
	editArticle: (id: number) => Promise<AxiosResponse>;
}

const articleApi: ArticleApiType = {
	deleteArticle: (id) => request.post(`houses/${id}`),
	editArticle: (id) => request.post("houses", id),
};

export default articleApi;
