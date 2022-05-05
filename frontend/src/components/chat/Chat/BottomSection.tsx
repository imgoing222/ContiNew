import { useState } from "react";
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

	return (
		<Container>
			<Textarea
				name="content"
				value={inputChat}
				onChange={handleChange}
				placeholder="내용을 입력해주세요."
			/>
			<Form onSubmit={handleSendMessage}>
				<Button>보내기</Button>
			</Form>
		</Container>
	);
}

const Container = styled.div``;

const Textarea = styled.textarea``;

const Form = styled.form``;

const Button = styled.button``;

export default BottomSection;
