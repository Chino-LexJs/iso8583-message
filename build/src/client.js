"use strict";
const { Socket } = require("net");
const socket = new Socket();
socket.connect({ host: "localhost", port: 3000 });
