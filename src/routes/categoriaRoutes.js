import { Router } from "express";
import * as controller from "../controllers/categoriaController.js";
import { validarCategoriaBody, validarId } from "../middlewares/validate.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", validarCategoriaBody, controller.crear);
router.get("/:id/productos", validarId, controller.listarProductos);
router.get("/:id", validarId, controller.obtener);
router.put("/:id", validarId, validarCategoriaBody, controller.actualizar);
router.delete("/:id", validarId, controller.eliminar);

export default router;
