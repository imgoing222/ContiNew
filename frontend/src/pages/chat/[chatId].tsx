function ChatDetail() {
  const WebSocket = require("ws");
  const socket = new WebSocket("ws://localhost:8080/ws/chat");
  socket.onopen = () => {
    console.log("connected");
  }
  return <></>
};

export default ChatDetail;