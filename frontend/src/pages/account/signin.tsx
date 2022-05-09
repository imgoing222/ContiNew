import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import useForm from "@hooks/useForm";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authApi from "src/api/auth";
import profileApi from "src/api/profile";
import { SET_USER } from "src/store/user";

function Signin() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { handleFormSubmit, handleInputChange, handleGoogleLoginClick } = useForm({
		initialValues: {
			login_id: "",
			password: "",
		},
		onSubmit: async (values) => {
			await authApi.signin(values).then(async (res) => {
				const status = Number(res);
				if (status === 401) {
					toast.error("비밀번호가 일치하지 않습니다.");
					return;
				}
				if (status === 404) {
					toast.error("존재하지 않는 아이디 입니다.");
					return;
				}
				const userInfo = await profileApi.getUserInfo();
				dispatch(SET_USER(userInfo.data));
				router.push("/");
			});
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
				<Button backgroundColor="#DC143C" color="white">
					로그인
				</Button>
			</FormContainer>
			<Button onClick={handleGoogleLoginClick}>구글로 시작하기</Button>
			<LinkButton href="/signup">회원가입 하러가기</LinkButton>
		</Container>
	);
}

export default Signin;
