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

export default router;
