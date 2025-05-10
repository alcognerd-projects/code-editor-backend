import { app, httpServer, io } from "./socket/socketServer.js";
import dotenv from "dotenv";
import connectYWebSocket from "./socket/yjsServer.js";

dotenv.config();

connectYWebSocket();
httpServer.listen(process.env.PORT || 5000, () => {
	console.log("Server running on port: " + process.env.PORT);
});
