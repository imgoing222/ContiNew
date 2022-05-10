import { Button } from "@components/account/Button";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { Container, FormContainer } from "@components/account/Container";
import { useState } from "react";
import authApi from "src/api/auth";
import { toast } from "react-toastify";
import Timer from "@components/account/Timer";

function findPassword() {
	const [userInfo, setUserInfo] = useState({ login_id: "", phone_number: "" });
	const [code, setCode] = useState("");

	const [showCodeInput, setShowCodeInput] = useState(false);

	const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		const tempUserInfo = { ...userInfo, [name]: value.trim() };
		setUserInfo(tempUserInfo);
	};

	const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await authApi.findPassword(userInfo).then(async (res) => {
				const status = Number(res);
				if (status === 409) {
					toast.error("전화번호가 일치하지 않습니다.");
					return;
				}
				if (status === 404) {
					toast.error("존재하지 않는 아이디 입니다.");
					return;
				}
				setShowCodeInput(true);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};

	const handleConfirmClick = async () => {
		console.log("click");
		const res = await authApi.confirmChangeCode(code);
		console.log(res);
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
					<Input placeholder="코드를 입력해주세요" onChange={handleCodeChange} />
					<Button disabled backgroundColor="dedede" onClick={handleConfirmClick}>
						코드 확인
					</Button>
					<Timer />
				</div>
			)}
		</Container>
	);
}

export default findPassword;
