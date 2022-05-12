import _ from "lodash";

function camelToSnake(data: any) {
	const newObj = _.mapKeys(data, (value, key) => _.snakeCase(key));
	console.log(newObj);
	return newObj;
}

export default camelToSnake;
