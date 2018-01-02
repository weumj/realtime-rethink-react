import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:8000");

export const subscribeToDrawings = () => new Promise(r => {
    socket.on("drawing", drawing => r(drawing));
    socket.emit("subscribeToDrawing");
});

export const createDrawing = name => socket.emit("createDrawing", {name});

export const publishLine = ({drawingId, line}) => socket.emit("publishLine", {drawingId, ...line});

export const subscribeToDrawingLines = ({drawingId}) => new Promise(r => {
    socket.on(`drawingLine:${drawingId}`, drawingLine => r(drawingLine));
    socket.emit("subscribeToDrawingLines");
});
