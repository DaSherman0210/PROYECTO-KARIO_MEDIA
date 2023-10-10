import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import { validateJWT } from "../middlewares/validate.jwt.js";
import { isAdminRole } from "../middlewares/validate.role.js";
import { emailExiste, isValidRole, userExistsById } from "../helpers/db.validators.js";
import {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  deleteUsuario,
  updateUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", [
  check('id', 'No es un ID válido. USUARIOS.ROUTES').isMongoId(),
  validateDocuments
], getUsuarioById);
router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("nombre", "El nombre del usuario es obligatorio. USUARIOS.ROUTES")
      .not()
      .isEmpty(),
    check("email", "Email inválido. USUARIOS.ROUTES").isEmail(),
    check(
      "password",
      "El password debe ser mínimo de 6 dígitos. USUARIOS.ROUTES"
    ).isLength({ min: 6 }),
    check('rol').custom(isValidRole),
    validateDocuments
  ],
  postUsuario
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un ID válido. USUARIOS.ROUTES").isMongoId(),
    check('id').custom(userExistsById),
    validateDocuments,
  ],
  deleteUsuario
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un ID válido. USUARIOS.ROUTES").isMongoId(),
    check('id').custom(userExistsById),
    check('rol').custom(isValidRole),
    validateDocuments,
  ],
  updateUsuario
);

//TODO -- SCHEMAS
/**
 * @swagger
 *  components:
 *    schemas:
 *      Usuarios:
 *        type: object
 *        properties:
 *          nombre:
 *            type: string
 *            description: El nombre del usuario
 *          email:
 *            type: string
 *            description: El email del usuario
 *          password:
 *            type: string
 *            description: La password del usuario
 *          imagen:
 *            type: string
 *            description: La imagen del usuario
 *          rol:
 *            type: objectId
 *            description: El object id del rol
 *          estado:
 *            type: boolean
 *            description: El estado del usuario
 *        required:
 *          -nombre
 *          -email
 *          -password
 *          -imagen
 *          -rol
 *        example:
 *          nombre: usuarioExample
 *          email: usuarioExample@usuario.com
 *          password: contraseña
 *          imagen: imagenUsuario.png
 *          rol: USER
 */

//TODO -- GET
/**
 * @swagger
 *  /usuarios:
 *    get:
 *      summary: Obtener usuarios
 *      tags: [Usuarios]
 *      responses:
 *        200:
 *          description: Se obtuvieron los usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/compononets/schemas/Usuarios'
 *        400:
 *          description: No se pudieron obtener los usuarios  
 */

//TODO -- GET ONE
/**
 * @swagger
 * /usuarios/{id}:
 *  get:
 *    summary: Obtener un usuario
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Usuario id
 *    responses:
 *      200:
 *        description: Se obtuvo con exito un usuario
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuarios'
 *      404:
 *        description: No se pudo obtener el usuario
 */

//TODO -- POST
/**
 * @swagger
 * /usuarios:
 *  post:
 *    summary: Agregar usuario
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/componets/schemas/Usuarios'
 *    responses:
 *      200:
 *        description: Se agrego con exito el usuario
 *      404:
 *        description: No se pudo agregar el usuario
 */

//TODO -- DELETE
/**
 * @swagger
 * /usuarios/{id}:
 *  delete:
 *    summary: Eliminar un usuario
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El usuario id
 *    responses:
 *      200:
 *        description: Se elimino al usuario exitosamente
 *      404:
 *        description: No se pudo eliminar el usuario
 */

//TODO -- UPDATE
/**
 * @swagger
 *  /usuarios/{id}:
 *    put:
 *      summary: Actualizar un usuario
 *      tags: [Usuarios]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El usuario id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Usuarios'
 *      responses:
 *        200:
 *          description: Actualizado con exito
 *        404:
 *          description: No se pudo actualizar el usuario
 */

export default router;
