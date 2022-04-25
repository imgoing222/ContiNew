import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import { formValidator } from "@utils/index";
import { useState } from "react";
import authApi from "src/api/auth";

function Signup() {
	const [values, setValues] = useState({ login_id: "", password: "", username: "" });

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.keys(validate(values)).length === 0) {
			const res = await authApi.signup(values);
			console.log(res);
		} else {
			console.log(validate(values));
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value.trim() });
	};

	const validate = (values: { login_id: string; password: string; username: string }) => {
		const errors: { [key: string]: string } = {};
		if (!formValidator.validateId(values.login_id))
			errors.email = "4~20자 사이의 아이디를 입력해주세요.";
		if (!formValidator.validateUsername(values.username))
			errors.username = "2자 이상의 유저네임을 입력해주세요.";
		if (!formValidator.validatePassword(values.password))
			errors.password = "특수문자를 1자 이상 포함해주세요.";
		return errors;
	};

	return (
		<Container>
			<Header>회원가입</Header>
			<FormContainer onSubmit={handleFormSubmit}>
				<Label>아이디</Label>
				<Input placeholder="" name="login_id" onChange={handleInputChange} />
				<Label>닉네임</Label>
				<Input placeholder="" name="username" onChange={handleInputChange} />
				<Label>비밀번호</Label>
				<Input placeholder="" name="password" type="password" onChange={handleInputChange} />
				<Label>비밀번호 확인</Label>
				<Input placeholder="영문, 숫자, 특수문자를 포함해주세요" type="password" />
				<Button>회원가입</Button>
			</FormContainer>
			<Button>구글로 시작하기</Button>
			<LinkButton href="/signin">로그인하러가기</LinkButton>
		</Container>
	);
}

export default Signup;
