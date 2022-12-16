// manejador de rutas
const routerController = require("./routes");

// paquetes para server
const express = require("express");
const { createServer } = require("http");
const app = express();

// Setings
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(routerController);

// create server
const serverHTTP = createServer(app);

export { serverHTTP };
