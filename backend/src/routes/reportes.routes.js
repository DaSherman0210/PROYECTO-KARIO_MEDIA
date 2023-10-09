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

export default router;