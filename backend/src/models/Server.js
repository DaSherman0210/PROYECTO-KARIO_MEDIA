import express from 'express';
import cors from 'cors';
import { rolRoutes, usuariosRoutes } from '../routes/roles.routes.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            rolesPath: '/roles',
            usuarioPath: '/usuarios'
        }

        // Middlewares
        this.middlewares();

        //Routing
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Leer y parsear JSON en BODY
        this.app.use(express.json());

        // PUBLIC DIRECTORY
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.rolesPath, rolRoutes);
        this.app.use(this.paths.usuarioPath, usuariosRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        })
    }
}

export default Server;