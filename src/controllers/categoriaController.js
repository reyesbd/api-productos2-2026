import * as service from "../services/categoriaService.js";

export async function listar(req, res) {
  const categorias = await service.listarCategorias();
  res.status(200).json(categorias);
}

export async function obtener(req, res) {
  const categoria = await service.obtenerCategoria(req.params.id);

  if (!categoria) {
    return res.status(404).json({ error: true, mensaje: "La categoría no existe." });
  }

  res.status(200).json(categoria);
}

export async function crear(req, res) {
  const categoria = await service.crearCategoria(req.body.nombre);
  res.status(201).json(categoria);
}

export async function actualizar(req, res) {
  const categoria = await service.actualizarCategoria(req.params.id, req.body.nombre);
  res.status(200).json(categoria);
}

export async function eliminar(req, res) {
  await service.eliminarCategoria(req.params.id);
  res.status(204).send();
}

export async function listarProductos(req, res) {
  const categoria = await service.productosDeCategoria(req.params.id);

  if (!categoria) {
    return res.status(404).json({ error: true, mensaje: "La categoría no existe." });
  }

  res.status(200).json(categoria);
}
