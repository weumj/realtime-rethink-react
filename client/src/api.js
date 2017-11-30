import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:8000");

export const subscribeToTimer = () => new Promise(r => {
    socket.on("timer", timestamp => r(timestamp));
    socket.emit("subscribeToTimer", 1000);
});
