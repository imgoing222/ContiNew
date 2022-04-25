import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";

function Signup() {
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Container>
			<Header>회원가입</Header>
			<FormContainer onSubmit={handleFormSubmit}>
				<Label>아이디</Label>
				<Input placeholder="" />
				<Label>닉네임</Label>
				<Input placeholder="" />
				<Label>비밀번호</Label>
				<Input placeholder="" />
				<Label>비밀번호 확인</Label>
				<Input placeholder="영문, 숫자, 특수문자를 포함해주세요" />
				<Button>회원가입</Button>
			</FormContainer>
			<Button>구글로 시작하기</Button>
			<LinkButton href="/signin">로그인하러가기</LinkButton>
		</Container>
	);
}

export default Signup;
