import cors from "cors";
import express from "express";
import rolRoutes from "../routes/roles.routes.js";
import authRoutes from "../routes/auth.routes.js";
import ayudasRoutes from "../routes/ayudas.routes.js";
import usuarioRoutes from "../routes/usuarios.routes.js";
import reportesRoutes from "../routes/reportes.routes.js";
import indicadorRoutes from "../routes/indicadores.routes.js";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../../swaggerConfig.js"; 

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      rolesPath:      "/roles",
      usuarioPath:    "/usuarios",
      authPath:       "/auth",
      indicadorPath:  "/indicadores",
      reportesPath:   "/reportes",
      ayudasPath:     "/ayudas",
      documentationPath: "/documentation"
    };

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
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.rolesPath, rolRoutes);
    this.app.use(this.paths.usuarioPath, usuarioRoutes);
    this.app.use(this.paths.authPath, authRoutes);
    this.app.use(this.paths.indicadorPath, indicadorRoutes);
    this.app.use(this.paths.reportesPath, reportesRoutes);
    this.app.use(this.paths.ayudasPath, ayudasRoutes);
    this.app.use(this.paths.documentationPath, swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

export default Server;
