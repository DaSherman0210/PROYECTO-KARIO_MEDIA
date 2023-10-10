import { Router } from "express";
import { check } from "express-validator";
import { login, logout } from "../controllers/auth.controllers.js";
import { validateDocuments } from "../middlewares/validate.documents.js";

const router = Router();

router.post("/login", [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validateDocuments
], login);

router.get("/logout", logout);

//TODO -- SCHEMAS
/**
 * @swagger
 *      components:
 *          schemas:
 *              Authentication:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: Email del usuario
 *                      password:
 *                          type: string,
 *                          descripcion: Contraseña del usuario
 *                  required:
 *                      -email
 *                      -password
 *                  example:
 *                      email: ejemplo@ejemplo.com
 *                      password: contraseña
 */

//TODO -- Login
/**
 *  @swagger
 *  /auth/login:
 *  post:
 *      summary: Validar el usuario
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Authentication'
 *      responses:
 *          200:
 *              description: Usuario validado
 *          404:
 *              description: Usuario no encontrado
 */

// TODO -- Logout
/**
 *  @swagger
 *  /auth/logout:
 *  get:
 *      summary: Salir de la sesion
 *      tags: [Authentication]
 *      responses:
 *          200:
 *              description: Salió con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Authentication'
 *          400:
 *              description: No se pudo salir
 */

export default router;