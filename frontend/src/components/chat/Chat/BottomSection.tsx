import React, { useState } from "react";
import styled from "styled-components";

interface SendMessageProps {
	sendMessage?: (inputChat: string) => void;
}

function BottomSection({ sendMessage }: SendMessageProps) {
	const [inputChat, setInputChat] = useState("");

	const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (sendMessage) {
			sendMessage(inputChat);
			setInputChat("");
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputChat(event.target.value);
	};

	const onKeyDownEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key == "Enter" && !event.shiftKey) {
			event.preventDefault();

			if (sendMessage) {
				sendMessage(inputChat);
				setInputChat("");
			}
		}
	};

	return (
		<Container>
			<Textarea
				name="content"
				value={inputChat}
				onChange={handleChange}
				onKeyDown={onKeyDownEnter}
				rows={1}
				placeholder="메시지 입력..."
				autoFocus
			/>
			<Form onSubmit={handleSendMessage}>
				<Button>보내기</Button>
			</Form>
		</Container>
	);
}

const Container = styled.div`
	margin: 1rem;
	display: flex;
	align-items: center;
	border: solid 1px #d3d3d3;
	border-radius: 10px;
`;

const Textarea = styled.textarea`
	flex: 1;
	margin: 1rem;
	padding: 1rem;
	font-size: 2rem;
	border: none;
	resize: none;
	border-radius: 10px;

	&:focus {
		outline: 1px solid #d3d3d3;
	}
`;

const Form = styled.form``;

const Button = styled.button`
	margin: 1rem;
	border: 0.2px solid #dedede;
	color: white;
	background-color: #dc143c;
	font-size: 1.5rem;
	padding: 0.5rem;

	&:hover {
		cursor: pointer;
	}
`;

export default BottomSection;
