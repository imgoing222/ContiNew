import { formValidator } from "@utils/index";
import { useState } from "react";

interface Props {
	initialValues: Values;
	onSubmit: (values: Values) => Promise<void>;
	onBlur?: (name: string, value: string) => Promise<boolean | undefined>;
}

interface Values {
	login_id: string;
	password: string;
	username?: string;
}

const useForm = ({ initialValues, onSubmit }: Props) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value.trim() });
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.keys(validate(values)).length === 0) {
			return await onSubmit(values);
		}
		setErrors;
	};

	const validate = ({ login_id, username, password }: Values) => {
		const errors: { [key: string]: string } = {};
		if (!formValidator.validateId(login_id)) errors.email = "4~20자 사이의 아이디를 입력해주세요.";
		if (username && !formValidator.validateUsername(username))
			errors.username = "2자 이상의 유저네임을 입력해주세요.";
		if (!formValidator.validatePassword(password))
			errors.password = "특수문자를 1자 이상 포함해주세요.";
		return errors;
	};

	return { handleFormSubmit, handleInputChange };
};

export default useForm;
