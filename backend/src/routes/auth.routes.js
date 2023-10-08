import { Router } from "express";
import { check } from "express-validator";
import { login, logout } from "../controllers/auth.controllers.js";
import { validateDocuments } from "../middlewares/validate.documents.js";

const router = Router();

router.post("/login", [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validateDocuments
], login);

router.get("/logout", logout);

export default router;