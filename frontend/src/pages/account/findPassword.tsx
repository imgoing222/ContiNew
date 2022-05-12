import { Button } from "@components/account/Button";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { FormContainer } from "@components/account/Container";
import { useState } from "react";
import authApi from "src/api/auth";
import { toast } from "react-toastify";
import Timer from "@components/account/Timer";
import getErrorMessage from "@utils/getErrorMessage";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container } from "@components/profile/Container";

function findPassword() {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState({ login_id: "", phone_number: "" });
	const [code, setCode] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [showCodeInput, setShowCodeInput] = useState(false);

	const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		const tempUserInfo = { ...userInfo, [name]: value.trim() };
		setUserInfo(tempUserInfo);
	};

	const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await authApi.findPassword(userInfo).then(async (res) => {
			if (res.status) {
				setShowCodeInput(true);
				return;
			}
			toast.error(getErrorMessage(res));
		});
	};

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
		setDisabled(false);
	};

	const handleConfirmClick = async () => {
		const res = await authApi.confirmChangeCode(code);
		const changeToken = res.data.change_token;
		router.push(
			{
				pathname: "/account/changePassword",
				query: { changeToken },
			},
			"/account/changePassword",
		);
	};

	return (
		<Container>
			<Header>비밀번호 찾기</Header>
			<Description>비밀번호를 잊으셨나요?</Description>
			<Description>아이디와 휴대폰 번호를 입력해주시면 임시코드를 전송해드립니다.</Description>

			{showCodeInput ? (
				<InputSection>
					<Input placeholder="코드를 입력해주세요" onChange={handleCodeChange} />
					<Button
						disabled={disabled}
						color="white"
						backgroundColor="#DC143C"
						onClick={handleConfirmClick}
					>
						코드 확인
					</Button>
					<Timer />
				</InputSection>
			) : (
				<FormContainer onSubmit={handleUserInfoSubmit}>
					<InputSection>
						<Label>아이디</Label>
						<Input name="login_id" onChange={handleUserInfoChange} />
						<Label>휴대폰 번호</Label>
						<Input name="phone_number" onChange={handleUserInfoChange} />
						<Button color="white" backgroundColor="#DC143C">
							코드 전송
						</Button>
					</InputSection>
				</FormContainer>
			)}
		</Container>
	);
}

const Description = styled.p`
	font-size: 1.5rem;
	text-align: center;
	margin-bottom: 1.2rem;
`;

const InputSection = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	margin: 2rem auto;
`;
export default findPassword;
