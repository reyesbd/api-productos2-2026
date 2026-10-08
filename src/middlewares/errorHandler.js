export function notFoundHandler(req, res) {
  res.status(404).json({
    error: true,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  if (error?.code === "P2002") {
    return res.status(409).json({
      error: true,
      mensaje: "Ya existe un registro con un valor único duplicado."
    });
  }

  if (error?.code === "P2025") {
    return res.status(404).json({
      error: true,
      mensaje: "El recurso solicitado no existe."
    });
  }

  if (error?.code === "P2003") {
    return res.status(409).json({
      error: true,
      mensaje: "No se puede realizar la operación porque existe una relación con otro recurso."
    });
  }

  return res.status(error.statusCode ?? 500).json({
    error: true,
    mensaje: error.statusCode ? error.message : "Error interno del servidor."
  });
}
