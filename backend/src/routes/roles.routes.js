import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import { validateJWT } from "../middlewares/validate.jwt.js";
import { isAdminRole } from "../middlewares/validate.role.js";
import {
  getRoles,
  getRolById,
  postRol,
  deleteRol,
  updateRol,
} from "../controllers/roles.controllers.js";

const router = Router();

router.get("/", getRoles);
router.get("/:id", [
    check('id', 'No es un ID válido. ROLES.ROUTES').isMongoId(),
    validateDocuments
], getRolById);
router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("rol", "El nombre del rol es obligatorio. ROL.CONTROLLER.")
      .not()
      .isEmpty(),
    validateDocuments,
  ],
  postRol
);
router.delete("/:id", [
  validateJWT,
  isAdminRole,
  check("id", "No es un ID válido. USUARIOS.ROUTES").isMongoId(),
  validateDocuments
], deleteRol);
router.put("/:id", [
  validateJWT,
  isAdminRole,
  check("id", "No es un ID válido. USUARIOS.ROUTES").isMongoId(),
  validateDocuments
], updateRol);

//TODO -- SCHEMAS
/**
 * @swagger
 *  components:
 *    schemas:
 *      Roles:
 *        type: object
 *        properties:
 *          rol:
 *            type: string
 *            description: rol para la base de datos
 *          estado:
 *            type: boolean
 *            description: estado del rol
 *        required:
 *          -rol
 *        example:
 *          rol: "ROL"
 *          estado: true
 */

//TODO -- GET
/**
 * @swagger
 *  /roles:
 *    get:
 *      summary: Obtener los roles
 *      tags: [Roles]
 *      responses:
 *        200:
 *          description: Se obtuvieron los roles excitosamente
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Roles'
 *        400:
 *          description: No se pudo obtener los roles
 */

//TODO -- GET ONE
/**
 * @swagger
 *  /roles/{id}:
 *    get:
 *      summary: Obtener a un rol
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id del rol
 *      responses:
 *        200:
 *          description: Obtenido correctamente
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Roles'
 *        404:
 *          description: No se pudo obtener el rol
 */

//TODO -- POST
/**
 * @swagger
 *  /roles:
 *    post:
 *      summary: Post roles
 *      tags: [Roles]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schemas:
 *              type: object
 *              $ref: '#/components/schemas/Roles'
 *      responses:
 *        200:
 *          description: Se agregaró un rol
 *        404:
 *          description: No se pudo agregar un rol
 */

//TODO -- DELETE
/**
 * @swagger
 *  /roles/{id}:
 *    delete:
 *      summary: Eliminar un rol
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El rol id
 *      responses:
 *        200:
 *          description: Se eliminó el rol con exito
 *        404:
 *          description: No se pudo eliminar el rol
 */

//TODO -- UPDATE
/**
 * @swagger
 *  /roles/{id}:
 *    put:
 *      summary: Actualizar el rol
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El id del rol
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Roles'
 *      responses:
 *        200:
 *          description: Se logro actualizar el rol
 *        404:
 *          description: No se pudo actualizar el rol
 */

export default router;
