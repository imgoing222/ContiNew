const changeMoneyUnit = (money: string) => {
	if (money) {
		const len = money.length;
		if (money.length > 4) return ` ${money.slice(0, len - 4)}억 ${money.slice(len - 4)}만원`;
		return `${money} 만원`;
	}
	return "";
};

export default changeMoneyUnit;
