const changeMonthToYear = (month: string) => {
	if (month) {
		if (+month > 12)
			return `${Math.floor(+month / 12)}년  ${+month % 12 > 0 ? (+month % 12) + "개월" : ""}`;
		return `${month}개월`;
	}
	return "";
};

export default changeMonthToYear;
