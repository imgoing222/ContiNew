import { useEffect, useState, useRef } from "react";

function ChatDetail() {
	const webSocketUrl = "ws://localhost:8080/ws/chat";
	let ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		if (!ws.current) {
			ws.current = new WebSocket(webSocketUrl);
			ws.current.onopen = () => {
				console.log("connected to " + webSocketUrl);
			};
			ws.current.onclose = () => {
				console.log("disconnect from " + webSocketUrl);
			};
			ws.current.onerror = (error) => {
				console.log("connenction error " + webSocketUrl);
				console.log(error);
			};
			ws.current.onmessage = (evnet) => {
				const data = JSON.parse(evnet.data);
				console.log(data);
			};
		}
	});
	return <></>;
}

export default ChatDetail;
