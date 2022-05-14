import _ from "lodash";

function camelToSnake(data: any) {
	const newObj = _.mapKeys(data, (value, key) => _.snakeCase(key));
	return newObj;
}

export default camelToSnake;
