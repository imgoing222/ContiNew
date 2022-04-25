export const validateId = (id: string): boolean => {
	const regExp = /^[0-9a-zA-Z-_]{3,19}$/;
	if (id) return regExp.test(id);
	return false;
};

export const validatePassword = (password: string): boolean => {
	const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	if (password) return regExp.test(password);
	return false;
};

export const validateUsername = (nickname: string): boolean => {
	return nickname.length >= 2 && nickname.length <= 10 ? true : false;
};
