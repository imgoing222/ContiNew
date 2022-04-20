export const validateId = (id: string): boolean => {
	const regExp = /^[0-9a-zA-Z-_]{4,20}$/;
	if (id) return regExp.test(id);
	return false;
};

export const validatePassword = (password: string): boolean => {
	const regExp = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
	if (password) return regExp.test(password);
	return false;
};

export const validateUsername = (nickname: string): boolean => {
	return nickname.length >= 2 && nickname.length <= 10 ? true : false;
};
