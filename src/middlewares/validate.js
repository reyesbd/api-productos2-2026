export function validarId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: true,
      mensaje: "El id debe ser un entero positivo."
    });
  }

  req.params.id = id;
  next();
}

export function validarCategoriaBody(req, res, next) {
  const { nombre } = req.body ?? {};

  if (typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({
      error: true,
      mensaje: "El nombre de la categoría es obligatorio y no puede estar vacío."
    });
  }

  req.body.nombre = nombre.trim();
  next();
}

export function validarProductoBody(req, res, next) {
  const { nombre, caracteristicas, categoriaId, precio, stock, url } = req.body ?? {};

  if (typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({ error: true, mensaje: "El nombre del producto es obligatorio." });
  }

  if (typeof caracteristicas !== "string" || !caracteristicas.trim()) {
    return res.status(400).json({ error: true, mensaje: "Las características del producto son obligatorias." });
  }

  const categoria = Number(categoriaId);
  if (!Number.isInteger(categoria) || categoria <= 0) {
    return res.status(400).json({ error: true, mensaje: "categoriaId debe ser un entero positivo." });
  }

  const precioNumero = Number(precio);
  if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
    return res.status(400).json({ error: true, mensaje: "precio debe ser un número mayor que cero." });
  }

  const stockNumero = stock === undefined ? 0 : Number(stock);
  if (!Number.isInteger(stockNumero) || stockNumero < 0) {
    return res.status(400).json({ error: true, mensaje: "stock debe ser un entero mayor o igual a cero." });
  }

  if (url !== undefined && url !== null && url !== "") {
    try {
      const parsedUrl = new URL(url);
      if (!/^https?:$/.test(parsedUrl.protocol)) throw new Error();
    } catch {
      return res.status(400).json({ error: true, mensaje: "url debe ser una URL HTTP o HTTPS válida." });
    }
  }

  req.body = {
    nombre: nombre.trim(),
    caracteristicas: caracteristicas.trim(),
    categoriaId: categoria,
    precio: precioNumero,
    stock: stockNumero,
    url: url || null
  };

  next();
}
