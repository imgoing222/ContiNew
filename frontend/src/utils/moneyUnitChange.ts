const changeMoneyUnit = (money: string) => {
	if (money) {
		const len = money.length;
		if (len > 4 && +money.slice(len - 4) > 0)
			return `${money.slice(0, len - 4)}억 ${+money.slice(len - 4)}만원`;
		if (len > 4 && +money.slice(len - 4) <= 0) return `${money.slice(0, len - 4)}억`;
		return `${money} 만원`;
	}
	return "";
};

export default changeMoneyUnit;
