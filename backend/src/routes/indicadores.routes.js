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
    //validateJWT,
    //isAdminRole,
    check('id', 'No es un ID válido. INDICADORES.ROUTES.').isMongoId(),
    validateDocuments
], deleteIndicador);

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido. INDICADORES.ROUTES.').isMongoId(),
    validateDocuments
], updateIndicador);

export default router;