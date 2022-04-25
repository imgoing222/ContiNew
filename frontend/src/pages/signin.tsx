import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import { useState } from "react";
import authApi from "src/api/auth";

function Signin() {
	const [values, setValues] = useState({ login_id: "", password: "" });

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(values);
		const res = await authApi.signin(values);
		console.log(res);
		console.log("로그인!");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value.trim() });
	};

	return (
		<Container>
			<Header>로그인</Header>
			<FormContainer onSubmit={handleFormSubmit}>
				<Label>아이디</Label>
				<Input placeholder="" name="login_id" onChange={handleInputChange} />
				<Label>비밀번호</Label>
				<Input placeholder="" name="password" type="password" onChange={handleInputChange} />
				<Button>로그인</Button>
			</FormContainer>
			<Button>구글로 시작하기</Button>
			<LinkButton href="/signin">로그인하러가기</LinkButton>
		</Container>
	);
}

export default Signin;
