import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import { validateJWT } from "../middlewares/validate.jwt.js";
import { isAdminRole } from "../middlewares/validate.role.js";
import { getAyudas, getAyudaById, postAyuda, deleteAyuda, updateAyuda } from "../controllers/ayudas.controllers.js";

const router = Router();

router.get('/', getAyudas);
router.get('/:id', [
   check('id', 'No es un ID válido.').isMongoId(),
   validateDocuments 
], getAyudaById);
router.post('/', [
    validateJWT,
    check('usuario', 'El usuario es obligatorio. AYUDAS.ROUTES').not().isEmpty(),
    check('usuario', 'ID de usuario no válido. AYUDAS.ROUTES').isMongoId(),
    check('asunto', 'El asunto es obligatorio. REPORTES.ROUTES').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
    validateDocuments
], postAyuda);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. AYUDAS.ROUTES.').isMongoId(),
    validateDocuments
], updateAyuda);

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateDocuments
], updateAyuda);

//TODO -- SCHEMAS
/**
 * @swagger
 *      components:
 *          schemas:
 *              Ayudas:
 *                  type: object
 *                  properties:
 *                      usuario:
 *                          type: objectId
 *                          description: object id del usuario que necesita la ayuda
 *                      asunto:
 *                          type: string
 *                          description: mini descripcion del problema
 *                      descripcion:
 *                          type: string
 *                          description: descripcion del problema
 *                      estado:
 *                          type: boolean
 *                          descripcion: estado de la ayuda
 *                  required:
 *                      -usuario
 *                      -asunto
 *                      -descripcion
 *                  example:
 *                      usuario: 6520334d9aad2e00d5ebd67e
 *                      asunto: Pagina no carga
 *                      descripcion: Ingrese a la pagina pero no me carga
 *                      estado: true
 *                          
 */

//TODO -- GET
/**
 * @swagger
 * /ayudas:
 *      get:
 *          summary: Obtener las ayudas
 *          tags: [Ayudas]
 *          responses:
 *              200:
 *                  description: Se obtuvo con exito las ayudas
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Ayudas'
 *              400:
 *                  description: No se pudo obtener las ayudas      
 */ 

//TODO -- GET ONE
/**
 * @swagger
 * /ayudas/{id}:
 *  get:
 *      summary: Obtener una ayuda
 *      tags: [Ayudas]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: el id de la ayuda
 *      responses:
 *          200:
 *              description: Obtenido correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Ayudas'
 *          400:
 *              description: No se pudo obtener la ayuda
 */

//TODO -- POST
/**
 * @swagger
 * /ayudas:
 *      post:
 *          summary: Añadir una ayuda
 *          tags: [Ayudas]
 *          parameters:
 *              -   in: header
 *                  name: user-token
 *                  description: Token de validacion
 *                  required: true
 *                  schema:
 *                      type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Ayudas'
 *          responses:
 *              200:
 *                  description: Se agrego una ayuda
 *              400:
 *                  description: No se pudo agregar
 */

//TODO -- DELETE
/**
 * @swagger
 * /ayudas/{id}:
 *  delete:
 *      summary: Eliminar una ayuda
 *      tags: [Ayudas]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                 type: string
 *             required: true
 *             description:  El ayuda id
 *          -   in: header
 *              name: user-token
 *              description: Token de validacion
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Se elimino la ayuda
 *          404:
 *              description: No se pudo eliminar la ayuda
 */

//TODO -- UPDATE
/**
 * @swagger
 * /ayudas/{id}:
 *  put:
 *      summary: Actualizar la ayuda
 *      tags: [Ayudas]
 *      parameters:
 *          -  in: path
 *             name: id
 *             schema:
 *                 type: string
 *             required: true
 *             description:  El ayuda id
 *          -   in: header
 *              name: user-token
 *              description: Token de validacion
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Ayudas'
 *      responses:
 *          200:
 *              description: Se actualizo una ayuda
 *          404:
 *              description: No se pudo actualizar la ayuda
 */

export default router;