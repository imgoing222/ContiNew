import articleApi from "src/api/article";

const getArticleData = async (id: number) => {
	const article = await articleApi.getArticle(id);
	return article.data;
};

export default getArticleData;
