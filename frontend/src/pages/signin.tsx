import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import useForm from "@hooks/useForm";
import { useRouter } from "next/router";
import authApi from "src/api/auth";

function Signin() {
	const router = useRouter();

	const { handleFormSubmit, handleInputChange } = useForm({
		initialValues: {
			login_id: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				await authApi.signin(values);
			} catch (err) {
				console.log(err);
			}
		},
	});

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
