import openSocket from "socket.io-client";
import Rx from "rxjs/Rx";

const socket = openSocket("http://localhost:8000");

export const subscribeToDrawings = () => new Promise(r => {
    socket.on("drawing", drawing => r(drawing));
    socket.emit("subscribeToDrawing");
});

export const createDrawing = name => socket.emit("createDrawing", {name});

export const publishLine = ({drawingId, line}) => socket.emit("publishLine", {drawingId, ...line});

export const subscribeToDrawingLines = ({drawingId}) => new Promise(r => {
    const line$ = Rx.Observable.fromEventPattern(
        h => socket.on(`drawingLine:${drawingId}`, h),
        h => socket.off(`drawingLine:${drawingId}`, h),
    );

    line$.bufferTime(100)
        .map(lines => ({lines}))
        .subscribe(
            linesEvent => r(linesEvent)
        );

    socket.emit("subscribeToDrawingLines");
});
