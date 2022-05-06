import { formValidator } from "@utils/index";
import { useCallback, useState } from "react";

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
	const [passwordMatched, setPasswordMatched] = useState(false);

	const { login_id, password, username } = values;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		const tempValues = { ...values, [name]: value.trim() };
		setValues(tempValues);
		// 에러 세팅 함수화
		const tempErrors = validate(tempValues);
		setErrors(tempErrors);
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

	const onChangePasswordConfirm = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const passwordConfirmCurrent = e.target.value;
			if (values.password === passwordConfirmCurrent) {
				setPasswordMatched(true);
				// 버튼 상태 변경
				if (login_id && username && password) {
					Object.keys(errors).length > 0 ? setDisabled(true) : setDisabled(false);
				}
			} else {
				setDisabled(true);
			}
		},
		[password],
	);

	const handleGoogleLoginClick = () => {
		window.location.href = "http://localhost:8080/api/members/login/google";
	};

	return {
		errors,
		handleFormSubmit,
		handleInputChange,
		handleGoogleLoginClick,
		disabled,
		passwordMatched,
		onChangePasswordConfirm,
	};
};

export default useForm;
