import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import profileApi from "src/api/profile";
import styled from "styled-components";

interface Props {
	username: string;
}

function UserInfoEdit({ username }: Props) {
	const router = useRouter();
	const [newUsername, setNewUsername] = useState(username);
	const [passwords, setPasswords] = useState({ before_password: "", new_password: "" });
	const [hidePassword, setHidePassword] = useState(true);

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUsername(e.target.value);
	};

	const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		const tempPasswords = { ...passwords, [name]: value.trim() };
		setPasswords(tempPasswords);
	};

	const handleEditClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.currentTarget.id === "username") {
			if (window.confirm("닉네임을 수정하시겠습니까?")) {
				await profileApi.changeUsername(newUsername);
				window.alert("닉네임이 변경되었습니다");
				router.reload();
			}
		} else {
			if (window.confirm("비밀번호를 수정하시겠습니까?")) {
				await profileApi.changePassword(passwords);
				window.alert("비밀번호가 변경되었습니다");
				router.reload();
			}
		}
	};

	const toggleHidePassword = () => {
		setHidePassword((prev) => !prev);
	};

	return (
		<>
			<Label>닉네임</Label>
			<Box>
				<Input value={newUsername} onChange={handleUsernameChange} width={60} marginRight={3} />
				<Button
					onClick={handleEditClick}
					id="username"
					backgroundColor="#dc143c"
					color="white"
					width={10}
					margin={"1rem 0 0"}
				>
					수정
				</Button>
			</Box>
			<Label>비밀번호</Label>
			<PasswordBox>
				<Input
					placeholder="기존 비밀번호"
					type="password"
					name="before_password"
					onChange={handlePasswordsChange}
				/>
				<Input
					placeholder="새로운 비밀번호"
					type={hidePassword ? "password" : "text"}
					name="new_password"
					onChange={handlePasswordsChange}
				/>
				<EyeButton onClick={toggleHidePassword}>
					{hidePassword ? (
						<FontAwesomeIcon icon={faEye} size="lg" color="#888888" />
					) : (
						<FontAwesomeIcon icon={faEyeSlash} size="lg" color="#888888" />
					)}
				</EyeButton>
			</PasswordBox>
			<Button
				onClick={handleEditClick}
				id="password"
				backgroundColor="#dc143c"
				color="white"
				margin="2rem 0 0.5rem"
			>
				수정
			</Button>
		</>
	);
}

const EyeButton = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	background-color: inherit;
	position: absolute;
	top: 70%;
	left: 92%;
`;

const Box = styled.div`
	display: flex;
	align-items: center;
`;

const PasswordBox = styled.div`
	position: relative;
`;
export default UserInfoEdit;
