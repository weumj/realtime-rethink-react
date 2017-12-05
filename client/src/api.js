import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:8000");

export const subscribeToDrawings = () => new Promise(r => {
    socket.on("drawing", drawing => r(drawing));
    socket.emit("subscribeToDrawing");
});

export const createDrawing = name => socket.emit("createDrawing", {name});
