import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

export { app, httpServer, io };
