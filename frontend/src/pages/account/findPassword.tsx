import { Button } from "@components/account/Button";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { Container, FormContainer } from "@components/account/Container";
import { useState } from "react";
import authApi from "src/api/auth";

function findPassword() {
	const [userInfo, setUserInfo] = useState({ login_id: "", phone_number: "" });
	const [showCodeInput, setShowCodeInput] = useState(false);

	const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		const tempUserInfo = { ...userInfo, [name]: value.trim() };
		setUserInfo(tempUserInfo);
	};

	const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await authApi.findPassword(userInfo);
			// 에러 토스트로 띄우기
			setShowCodeInput(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<FormContainer onSubmit={handleUserInfoSubmit}>
				<Header>비밀번호 찾기</Header>
				<p>비밀번호를 잊으셨나요?</p>
				<p>회원가입 시 입력했던 아이디와 휴대폰 번호를 입력해주시면 임시코드를 전송해드립니다.</p>
				<Label>아이디</Label>
				<Input name="login_id" onChange={handleUserInfoChange} />
				<Label>휴대폰 번호</Label>
				<Input name="phone_number" onChange={handleUserInfoChange} />
				<Button color="white" backgroundColor="#DC143C">
					코드 전송
				</Button>
			</FormContainer>
			{showCodeInput && (
				<div>
					<Input placeholder="코드를 입력해주세요" />
					<Button disabled backgroundColor="dedede">
						코드 확인
					</Button>
				</div>
			)}
		</Container>
	);
}

export default findPassword;
