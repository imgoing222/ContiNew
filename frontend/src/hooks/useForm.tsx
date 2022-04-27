import { formValidator } from "@utils/index";
import { debounce } from "lodash";
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
	const [disabled, setDisabled] = useState(true);

	const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		const tempValues = { ...values, [name]: value.trim() };
		setValues(tempValues);
		// 에러 세팅 함수화
		// debounce 적용 (유효성 검사 및 에러 세팅)
		const tempErrors = validate(tempValues);
		setErrors(tempErrors);
		Object.keys(tempErrors).length > 0 ? setDisabled(true) : setDisabled(false);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.keys(validate(values)).length === 0) {
			return await onSubmit(values);
		}
	};

	const validate = ({ login_id, username, password }: Values) => {
		const errors: { [key: string]: string } = {};
		if (login_id && !formValidator.validateId(login_id))
			errors.id = "4자 이상 20자 이내의 아이디를 입력해주세요.";
		if (username && !formValidator.validateUsername(username))
			errors.username = "2자 이상의 닉네임을 입력해주세요.";
		if (password && !formValidator.validatePassword(password))
			errors.password = "영문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.";
		return errors;
	};

	return { errors, handleFormSubmit, handleInputChange, disabled };
};

export default useForm;
