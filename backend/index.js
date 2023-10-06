import dotenv from "dotenv";
dotenv.config();

import Server from "./src/models/Server.js";

const server = new Server();

server.listen();