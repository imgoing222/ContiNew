import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import useForm from "@hooks/useForm";
import { useRouter } from "next/router";
import authApi from "src/api/auth";
import styled from "styled-components";

function Signup() {
	const router = useRouter();

	const { disabled, handleFormSubmit, handleInputChange, errors } = useForm({
		initialValues: {
			login_id: "",
			password: "",
			username: "",
		},
		onSubmit: async (values) => {
			try {
				await authApi.signup(values);
				// 본인인증 페이지로 수정할 것
				router.push("/");
			} catch (err) {
				console.log(err);
			}
		},
	});

	return (
		<Container>
			<Header>회원가입</Header>
			<FormContainer onSubmit={handleFormSubmit}>
				<Label>아이디</Label>
				<Input name="login_id" onKeyUp={handleInputChange} />
				<ErrorText>{errors.id}</ErrorText>
				<Label>닉네임</Label>
				<Input name="username" onKeyUp={handleInputChange} />
				<ErrorText>{errors.username}</ErrorText>
				<Label>비밀번호</Label>
				<Input name="password" onKeyUp={handleInputChange} />
				<ErrorText>{errors.password}</ErrorText>
				<Label>비밀번호 확인</Label>
				<Input name="passwordConfirm" />
				<Button disabled={disabled}>회원가입</Button>
			</FormContainer>
			<Button>구글로 시작하기</Button>
			<LinkButton href="/signin">로그인하러가기</LinkButton>
		</Container>
	);
}

const ErrorText = styled.p`
	color: red;
`;
export default Signup;
