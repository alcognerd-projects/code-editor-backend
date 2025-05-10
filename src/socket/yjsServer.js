import { setupWSConnection } from "@y/websocket-server/utils";
import http from "http";
import { WebSocketServer } from "ws";

const connectYWebSocket = () => {
	const server = http.createServer();
	// const Y_WS_PORT = 1234;
	const wss = new WebSocketServer({ server });

	// wss.on("connection", (conn, req) => {
	// 	setupWSConnection(conn, req, { gc: true });
	// 	console.log("Y.js client connected");
	// });

	wss.on("connection", (ws, req) => {
		const docName = req.url.slice(1).split("?")[0];
		setupWSConnection(ws, req, { docName });
	});
	const port = 1234;
	server.listen(port, () => {
		console.log(`✅ Yjs WebSocket server running at ws://localhost:${port}`);
	});
	// console.log(`Y.js WebSocket server running on port ${Y_WS_PORT}`);
};

export default connectYWebSocket;
