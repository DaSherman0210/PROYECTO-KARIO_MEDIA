import { Router } from "express";
import { check } from "express-validator";
import { validateDocuments } from "../middlewares/validate.documents.js";
import {
  getRoles,
  getRolById,
  postRol,
  deleteRol,
  updateRol,
} from "../controllers/roles.controllers.js";

const router = Router();

router.get("/", getRoles);
router.get("/:id", getRolById);
router.post(
  "/",
  [
    check("rol", "El nombre del rol es obligatorio. ROL.CONTROLLER.")
      .not()
      .isEmpty(),
    validateDocuments,
  ],
  postRol
);
router.delete("/:id", deleteRol);
router.put("/:id", updateRol);

export default router;
