import { Button } from "@components/account/Button";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { Container } from "@components/account/Container";

function findPassword() {
	return (
		<Container>
			<Header>비밀번호 찾기</Header>
			<p>비밀번호를 잊으셨나요?</p>
			<p>회원가입 시 입력했던 아이디와 휴대폰 번호를 입력해주시면 임시코드를 전송해드립니다.</p>
			<Label>아이디</Label>
			<Input />
			<Label>휴대폰 번호</Label>
			<Input />
			<Button color="white" backgroundColor="#DC143C">
				코드 전송
			</Button>
			<Input placeholder="코드를 입력해주세요" />
			<Button disabled backgroundColor="dedede">
				코드 확인
			</Button>
		</Container>
	);
}

export default findPassword;
