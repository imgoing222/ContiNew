import _ from "lodash";
import ArticleType from "src/types/getArticleType";
import HouseInfo from "src/types/houseInfo";

function snakeToCamel(data: any, modified?: string) {
	const newObj = _.mapKeys(data, (value, key) => _.camelCase(key));
	if (modified) return newObj as HouseInfo;
	return newObj as ArticleType;
}

export default snakeToCamel;
