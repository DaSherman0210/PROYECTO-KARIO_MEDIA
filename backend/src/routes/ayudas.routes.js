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

export default router;