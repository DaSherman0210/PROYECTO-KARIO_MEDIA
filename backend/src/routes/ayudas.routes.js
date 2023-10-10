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
    isAdminRole,
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
 *                          description: nombre del usuario que necesita la ayuda
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
 *                                  $ref: '#components/schemas/Ayudas'
 *              400:
 *                  description: No se pudo obtener las ayudas
 *                  
 */ 

export default router;