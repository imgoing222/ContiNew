import { Button } from "@components/account/Button";
import { Container, FormContainer } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";

function smsVerification() {
	return (
		<Container>
			<Header>휴대폰 인증</Header>
			<FormContainer>
				<Label>휴대폰 번호</Label>
				<div>
					<Input placeholder="-없이 숫자만 입력" />
					<Button>인증번호 전송</Button>
				</div>
				<Label>인증 번호</Label>
				<div>
					<Input placeholder="인증 번호 입력" />
					<Button>인증번호 확인</Button>
				</div>
			</FormContainer>
			<LinkButton href="/">본인 인증 다음에 하기</LinkButton>
		</Container>
	);
}

export default smsVerification;
