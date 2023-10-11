import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import { validateJWT } from "../middlewares/validate.jwt.js";
import { isAdminRole } from "../middlewares/validate.role.js";
import { getIndicadores, getIndicadorById, postIndicador, deleteIndicador, updateIndicador } from "../controllers/indicadores.controllers.js";

const router = Router();

router.get('/', getIndicadores);
router.get('/:id', [
    check('id', 'No es un ID válido. INDICADORES.ROUTES').isMongoId(),
    validateDocuments
], getIndicadorById);
router.post('/', [
    validateJWT,
    isAdminRole,
    check('nombre', 'El nombre del indicador es obligatorio. INDICADORES.ROUTES.').not().isEmpty(),
    check('categoria', 'La categoria del indicador es obligatoria. INDICADORES.ROUTES.').not().isEmpty(),
    check('fecha_inicio', 'La fecha_inicio del indicador es obligatoria. INDICADORES.ROUTES.').not().isEmpty(),
    check('fecha_terminacion', 'La fecha_terminacion del indicador es obligatorio. INDICADORES.ROUTES.').not().isEmpty(),
    check('formula', 'La formula del indicador es obligatoria. INDICADORES.ROUTES.').not().isEmpty(),
    check('frecuencia', 'La frecuencia del indicador es obligatoria. INDICADORES.ROUTES.').not().isEmpty(),
    check('cumplimiento', 'El cumplimiento del indicador es obligatorio. INDICADORES.ROUTES.').not().isEmpty(),
    check('area', 'El area del indicador es obligatorio. INDICADORES.ROUTES.').not().isEmpty(),
    check('descripcion', 'La descripcion del indicador es obligatoria. INDICADORES.ROUTES.').not().isEmpty(),
    validateDocuments
], postIndicador);

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. INDICADORES.ROUTES.').isMongoId(),
    validateDocuments
], updateIndicador);


//TODO -- SCHEMAS
/**
 * @swagger
 *  components:
 *      schemas:
 *          Indicadores:
 *              type: object
 *              properties:
 *                  nombre:
 *                      type: string
 *                      description: Nombre del indicador
 *                  categoria:
 *                      type: string
 *                      description: Categoria del indicador
 *                  fecha_inicio:
 *                      type: string
 *                      description: Fecha de inicio del indicador
 *                  fecha_terminacion:
 *                      type: string
 *                      description: Fecha de terminacion del indicador
 *                  formula:
 *                      type: string
 *                      description: Formula del indicador
 *                  frecuencia:
 *                      type: srting
 *                      descripcion: Frecuencia del indicador
 *                  cumplimineto:
 *                      type: number
 *                      descripcion: Porcentaje del cumplimiento del indicador
 *                  area:
 *                      type: string
 *                      descripcion: Area del Indicador
 *                  descripcion:
 *                      type: string
 *                      desceription: Descripcion del indicador
 *              required:
 *                  -nombre
 *                  -categoria
 *                  -fecha_inicio
 *                  -fecha_terminacion
 *                  -formula
 *                  -frecuencia
 *                  -cumplimiento
 *                  -area
 *                  -descripcion
 *              example:
 *                  nombre: Indicador example
 *                  categoria: Baja
 *                  fecha_inicio: 10/03/2020
 *                  fecha_terminacion: 11/10/2022
 *                  formula: MetAgil
 *                  frecuencia: 2/4
 *                  cumplimiento: 65
 *                  area: Marketing
 *                  descripcion: Esta es la descripcion del ejemplo
 */

//TODO -- GET
/**
 * @swagger
 *  /indicadores:
 *      get:
 *          summary: Obtener todos los indicadores
 *          tags: [Indicadores]
 *          responses:
 *              200:
 *                  description: Obtenidos los indicadores con exito
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: '#/components/schemas/Indicadores'
 *              400:
 *                  description: No se pudieron obtener los indicadores
 */

//TODO -- GET ONE
/**
 * @swagger
 *  /indicadores/{id}:
 *      get:
 *          summary: Obtener un indicador
 *          tags: [Indicadores]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: Indicador id
 *          responses:
 *              200:
 *                  description: Se obtuvo con exito el indicador
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              $ref: '#/components/schemas/Indicadores'
 */

//TODO -- POST
/**
 * @swagger
 *  /indicadores:
 *      post:
 *          summary: Agregar un nuevo indicador
 *          tags: [Indicadores]
 *          parameters:
 *              -   in: header
 *                  name: user-token
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: Token de validacion
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Indicadores'
 *          responses:
 *              200:
 *                  description: Se agrego con exito un indicador
 *              404:
 *                  description: No se pudo agregar el indicador
 */

//TODO -- DELETE
/**
 * @swagger
 *  /indicadores/{id}:
 *      delete:
 *          summary: Eliminar un indicador
 *          tags: [Indicadores]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: El id del indicador
 *              -   in: header
 *                  name: user-token
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: Token de validacion
 *          responses:
 *              200:
 *                  decription: Se elimino con exito un indicador
 *              404:
 *                  description: No se pudo eliminar el indicador
 */

//TODO -- UPDATE
/**
 * @swagger
 *  /indicadores/{id}:
 *      put:
 *          summary: Actualizar un indicador
 *          tags: [Indicadores]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: Id del indicador
 *              -   in: header
 *                  name: user-token
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: Token de validacion
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Indicadores'
 *          responses:
 *              200:
 *                  responses: Se actualizo con exito un indicador
 *              404:
 *                  responses: No se pudo actualizar el indicador
 */

export default router;