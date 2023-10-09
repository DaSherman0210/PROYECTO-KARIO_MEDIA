import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import { validateJWT } from "../middlewares/validate.jwt.js";
import { isAdminRole } from "../middlewares/validate.role.js";
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
    validateDocuments,
  ],
  updateUsuario
);

export default router;
