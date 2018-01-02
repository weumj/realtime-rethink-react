import openSocket from "socket.io-client";
import Rx from "rxjs/Rx";

const port = parseInt(window.location.search.replace("?", ""), 10) || 8000;
const socket = openSocket(`http://localhost:${port}`);

export const subscribeToDrawings = (cb) => {
    socket.on("drawing", drawing => cb(drawing));
    socket.emit("subscribeToDrawing");
};

export const createDrawing = name => socket.emit("createDrawing", {name});

export const publishLine = ({drawingId, line}) => socket.emit("publishLine", {drawingId, ...line});

export const subscribeToDrawingLines = (drawingId, cb) => {
    const line$ = Rx.Observable.fromEventPattern(
        h => socket.on(`drawingLine:${drawingId}`, h),
        h => socket.off(`drawingLine:${drawingId}`, h),
    );

    line$.bufferTime(100)
        .map(lines => ({lines}))
        .subscribe(
            linesEvent => cb(linesEvent)
        );

    socket.emit("subscribeToDrawingLines");
};

export const subscribeToConnectionEvent = cb => {
    socket.on("connect", () => cb({
        state: "connected",
        port,
    }));

    socket.on("disconnect", () => cb({
        state: "disconnected",
        port,
    }));

    socket.on("connect_error", () => cb({
        state: "disconnected",
        port,
    }));
}
