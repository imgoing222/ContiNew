import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import useForm from "@hooks/useForm";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import authApi from "src/api/auth";
import profileApi from "src/api/profile";
import { SET_USER } from "src/store/user";
import styled from "styled-components";

function Signup() {
	const router = useRouter();
	const dispatch = useDispatch();

	const {
		disabled,
		handleFormSubmit,
		handleInputChange,
		handleGoogleLoginClick,
		errors,
		onChangePasswordConfirm,
	} = useForm({
		initialValues: {
			login_id: "",
			password: "",
			username: "",
		},
		onSubmit: async ({ login_id, password, username }) => {
			try {
				await authApi.signup({ login_id, password, username });
				await authApi.signin({ login_id, password });
				const userInfo = await profileApi.getUserInfo();
				dispatch(SET_USER(userInfo.data));
				router.push("/smsVerification");
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
				<Input name="login_id" onChange={handleInputChange} />
				<ErrorText>{errors.id}</ErrorText>
				<Label>닉네임</Label>
				<Input name="username" onChange={handleInputChange} />
				<ErrorText>{errors.username}</ErrorText>
				<Label>비밀번호</Label>
				<Input name="password" type="password" onChange={handleInputChange} />
				<ErrorText>{errors.password}</ErrorText>
				<Label>비밀번호 확인</Label>
				<Input name="passwordConfirm" type="password" onChange={onChangePasswordConfirm} />
				<Button disabled={disabled} backgroundColor="#DC143C" color="white">
					회원가입
				</Button>
			</FormContainer>
			<Button onClick={handleGoogleLoginClick}>구글로 시작하기</Button>
			<LinkButton href="/signin">로그인하러가기</LinkButton>
		</Container>
	);
}

const ErrorText = styled.p`
	color: red;
`;
export default Signup;
