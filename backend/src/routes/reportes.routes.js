import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import { validateJWT } from "../middlewares/validate.jwt.js";
import { isAdminRole } from "../middlewares/validate.role.js";
import { getReportes, getReporteById, postReporte, deleteReporte, updateReporte } from "../controllers/reportes.controllers.js"

const router = Router();

router.get('/', getReportes);
router.get('/:id', [
    check('id', 'No es un ID válido. REPORTES.ROUTES').isMongoId(),
    validateDocuments
], getReporteById);
router.post('/', [
    validateJWT,
    isAdminRole,
    check('usuario', 'El usuario es obligatorio. REPORTES.ROUTES').not().isEmpty(),
    check('usuario', 'ID de usuario no válido. REPORTES.ROUTES').isMongoId(),
    check('indicador', 'El indicador es obligatorio. REPORTES.ROUTES').not().isEmpty(),
    check('indicador', 'ID de indicador no válido. REPORTES.ROUTES').isMongoId(),
    check('asunto', 'El asunto es obligatorio. REPORTES.ROUTES').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria. REPORTES.ROUTES').not().isEmpty(),
    validateDocuments
], postReporte);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. REPORTES.ROUTES').isMongoId(),
    validateDocuments
], deleteReporte);
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. REPORTES.ROUTES').isMongoId(),
    validateDocuments
], updateReporte);

//TODO -- SCHEMAS
/**
 * @swagger
 *  components:
 *      schemas:
 *          Reportes:
 *              type: object
 *              properties:
 *                  usuario:
 *                      type: objectId
 *                      description: object id del usuario que hace el reporte
 *                  indicador:
 *                      type: objectId
 *                      description: object id del indicador que hace el reporte
 *                  asunto:
 *                      type: string
 *                      description: asunto del reporte
 *                  descripcion:
 *                      type: string
 *                      description: descripcion del reporte
 *                  estado:
 *                      type: boolean
 *                      description: estado del reporte
 *              required:
 *                  -usuario
 *                  -indicador
 *                  -asunto
 *                  -descripcion
 *              example:
 *                  usuario: 652032d09aad2e00d5eb1baa
 *                  indicador: 65203f499aad2e00d5fdfd1b
 *                  asunto: Reporte 1
 *                  descripcion: Descripción del reporte 1
 */

//TODO - GET
/**
 * @swagger
 * /reportes:
 *  get:
 *      summary: Obtener los reportes
 *      tags: [Reportes]
 *      responses:
 *          200:
 *              description: Se obtuvieron los reportes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Reportes'
 *          400:
 *              description: No se obtuvieron los reportes
 */

//TODO -- GET ONE
/**
 * @swagger
 * /reportes/{id}:
 *  get:
 *      summary: Obtner reporte por id
 *      tags: [Reportes]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: el id del reporte
 *      responses:
 *          200:
 *              description: Obtenido correctamente los reportes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: arrya
 *                          items:
 *                              $ref: '#/components/schemas/Reportes'
 *          400:
 *              description: No se obtuvieron los reportes
 */

//TODO -- POST
/**
 * @swagger
 *  /reportes:
 *      post:
 *          summary: Añadir un reporte
 *          tags: [Reportes]
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
 *                          $ref: '#/components/schemas/Reportes'
 *          responses:
 *              200:
 *                  description: Se añadió un reporte
 *              404:
 *                  description: No se pudo añadir el reporte
 */

//TODO -- DELETE
/**
 * @swagger
 * /reportes/{id}:
 *  delete:
 *      summary: Eliminar el reporte
 *      tags: [Reportes]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: El id del reporte
 *          -   in: header
 *              name: user-token
 *              description: Token de validacion
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Se elimino el reporte
 *          404:
 *              description: No se pudo eliminar el reporte
 */

//TODO -- UPDATE
/**
 * @swagger
 *  /reportes/{id}:
 *      put:
 *          summary: Actualizar reportes
 *          tags: [Reportes]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: El reporte id
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
 *                          $ref: '#/components/schemas/Reportes'
 *          responses:
 *              200:
 *                  description: Se actualizó el reporte
 *              404:
 *                  description: No se pudo actualizar el reporte
 */

export default router;