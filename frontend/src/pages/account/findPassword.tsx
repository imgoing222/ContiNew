import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Button, Header, FormContainer } from "@components/account/Index";
import Timer from "@components/account/Timer";
import authApi from "src/api/auth";
import getErrorMessage from "@utils/getErrorMessage";

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
						<Input name="login_id" onChange={handleUserInfoChange} width={80} />
						<Label>휴대폰 번호</Label>
						<Input name="phone_number" onChange={handleUserInfoChange} width={80} />
						<Button color="white" backgroundColor="#DC143C" margin={"3rem auto"} width={80}>
							코드 전송
						</Button>
					</InputSection>
				</FormContainer>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: 5rem auto 0;
`;

const Description = styled.p`
	font-size: 1.5rem;
	text-align: center;
	margin-bottom: 1.2rem;
`;

const Label = styled.label`
	width: 80%;
	margin: 0 auto;
	font-size: 1.5rem;
`;

const Input = styled.input`
	border: 0.2px solid #dedede;
	outline: none;
	background-color: inherit;
	margin: 1rem auto 2rem;
	padding: 1rem;
	display: block;
	width: 80%;
`;

const InputSection = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	margin: 3rem auto;
`;
export default findPassword;
