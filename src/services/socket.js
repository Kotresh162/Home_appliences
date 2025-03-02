import { io } from "socket.io-client";

const SOCKET_URL = "ws://localhost:8081"; // WebSocket server URL

const socket = io(SOCKET_URL, { transports: ["websocket"] });

export default socket;
