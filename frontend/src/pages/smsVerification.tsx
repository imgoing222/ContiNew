import { Button } from "@components/account/Button";
import { Container } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { LinkButton } from "@components/account/LinkButton";
import { useState } from "react";
import authApi from "src/api/auth";

function smsVerification() {
	const [phoneNumber, setPhoneNumber] = useState({ phone_number: "" });

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber({ phone_number: e.target.value });
	};

	const handleSendClick = async () => {
		try {
			const res = await authApi.sendCode(phoneNumber);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<Header>휴대폰 인증</Header>
			<Label>휴대폰 번호</Label>
			<div>
				<Input placeholder="-없이 숫자만 입력" onChange={handleInputChange} />
				<Button onClick={handleSendClick}>인증번호 전송</Button>
			</div>
			<Label>인증 번호</Label>
			<div>
				<Input placeholder="인증 번호 입력" />
				<Button>인증번호 확인</Button>
			</div>
			<LinkButton href="/">본인 인증 다음에 하기</LinkButton>
		</Container>
	);
}

export default smsVerification;
