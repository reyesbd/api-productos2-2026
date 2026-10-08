import { Router } from "express";
import * as controller from "../controllers/productoController.js";
import { validarId, validarProductoBody } from "../middlewares/validate.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", validarProductoBody, controller.crear);
router.get("/:id", validarId, controller.obtener);
router.put("/:id", validarId, validarProductoBody, controller.actualizar);
router.delete("/:id", validarId, controller.eliminar);

export default router;
