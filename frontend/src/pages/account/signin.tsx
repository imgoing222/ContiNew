import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import { LinkSection } from "@components/account/LinkSection";
import useForm from "@hooks/useForm";
import getErrorMessage from "@utils/getErrorMessage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authApi from "src/api/auth";
import profileApi from "src/api/profile";
import { SET_USER } from "src/store/user";

function Signin() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { handleFormSubmit, handleInputChange, handleKakaoLoginClick } = useForm({
		initialValues: {
			login_id: "",
			password: "",
		},
		onSubmit: async (values) => {
			await authApi.signin(values).then(async (res) => {
				if (res.status) {
					const userInfo = await profileApi.getUserInfo();
					dispatch(SET_USER(userInfo.data));
					router.push("/");
					return;
				}
				toast.error(getErrorMessage(res));
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
				<Button backgroundColor="#DC143C" color="white" margin="4rem 0">
					로그인
				</Button>
			</FormContainer>
			<Button backgroundColor="#FEE500" onClick={handleKakaoLoginClick}>
				카카오로 시작하기
			</Button>
			<LinkSection>
				<Link href="/account/findPassword">
					<LinkButton>비밀번호를 잊으셨나요?</LinkButton>
				</Link>
				<Link href="/account/signup">
					<LinkButton>아직 회원이 아니신가요?</LinkButton>
				</Link>
			</LinkSection>
		</Container>
	);
}

export default Signin;
