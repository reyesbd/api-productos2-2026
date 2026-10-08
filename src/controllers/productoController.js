import * as service from "../services/productoService.js";

function numeroOpcional(value, nombre) {
  if (value === undefined || value === "") return undefined;
  const number = Number(value);
  if (!Number.isFinite(number)) {
    const error = new Error(`${nombre} debe ser numérico.`);
    error.statusCode = 400;
    throw error;
  }
  return number;
}

function enteroPositivo(value, nombre, defecto) {
  if (value === undefined || value === "") return defecto;
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    const error = new Error(`${nombre} debe ser un entero positivo.`);
    error.statusCode = 400;
    throw error;
  }
  return number;
}

export async function listar(req, res) {
  const precioMin = numeroOpcional(req.query.precioMin, "precioMin");
  const precioMax = numeroOpcional(req.query.precioMax, "precioMax");

  if (precioMin !== undefined && precioMax !== undefined && precioMin > precioMax) {
    return res.status(400).json({ error: true, mensaje: "precioMin no puede ser mayor que precioMax." });
  }

  const page = enteroPositivo(req.query.page, "page", 1);
  const limit = enteroPositivo(req.query.limit, "limit", 10);

  if (limit > 100) {
    return res.status(400).json({ error: true, mensaje: "limit no puede ser mayor que 100." });
  }

  const resultado = await service.listarProductos({
    categoria: req.query.categoria?.trim(),
    precioMin,
    precioMax,
    buscar: req.query.buscar?.trim(),
    page,
    limit
  });

  res.status(200).json(resultado);
}

export async function obtener(req, res) {
  const producto = await service.obtenerProducto(req.params.id);

  if (!producto) {
    return res.status(404).json({ error: true, mensaje: "El producto no existe." });
  }

  res.status(200).json(producto);
}

export async function crear(req, res) {
  const categoria = await service.existeCategoria(req.body.categoriaId);

  if (!categoria) {
    return res.status(400).json({ error: true, mensaje: "La categoría indicada no existe." });
  }

  const producto = await service.crearProducto(req.body);
  res.status(201).json(producto);
}

export async function actualizar(req, res) {
  const categoria = await service.existeCategoria(req.body.categoriaId);

  if (!categoria) {
    return res.status(400).json({ error: true, mensaje: "La categoría indicada no existe." });
  }

  const producto = await service.actualizarProducto(req.params.id, req.body);
  res.status(200).json(producto);
}

export async function eliminar(req, res) {
  await service.eliminarProducto(req.params.id);
  res.status(204).send();
}
