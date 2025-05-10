import { app, io, server } from "./socketServer.js";

const rooms = new Map();

io.on("connection", (socket) => {
	console.log("user connected: " + socket.id);
	let currentRoom = null;
	let currentUserName = null;

	socket.on("joinRoom", ({ userName, roomId }) => {
		if (currentRoom) {
			socket.leave(currentRoom);
			const users = rooms.get(currentRoom) || [];
			const updatedUsers = users.filter((user) => user !== currentUserName);
			rooms.set(currentRoom, updatedUsers);
			io.to(currentRoom).emit("userLeft", updatedUsers);
		}
		currentRoom = roomId;
		currentUserName = userName;
		socket.join(roomId);

		const users = rooms.get(roomId) || [];
		if (!users.includes(userName)) {
			users.push(userName);
			rooms.set(roomId, users);
		}

		io.to(roomId).emit("userJoined", users);
		console.log(`${userName} joined room ${roomId}`);
	});

	socket.on("cursorPosition", ({ userName, position, anchor, roomId }) => {
		socket.to(roomId).emit("cursorUpdate", { userName, position, anchor });
	});

	socket.on("disconnect", () => {
		console.log("user disconnected: ", socket.id);
		if (currentRoom && currentUserName) {
			const users = rooms.get(currentRoom) || [];
			const updatedUsers = users.filter((user) => user !== currentUserName);
			rooms.set(currentRoom, updatedUsers);
			io.to(currentRoom).emit("userLeft", updatedUsers);
		}
	});
});
