import { prisma } from "../lib/prisma.js";

const includeCategoria = { categoria: true };

export async function listarProductos({ categoria, precioMin, precioMax, buscar, page, limit }) {
  const where = {};

  if (categoria) {
    where.categoria = { nombre: { contains: categoria } };
  }

  if (buscar) {
    where.nombre = { contains: buscar };
  }

  if (precioMin !== undefined || precioMax !== undefined) {
    where.precio = {};
    if (precioMin !== undefined) where.precio.gte = precioMin;
    if (precioMax !== undefined) where.precio.lte = precioMax;
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.producto.findMany({
      where,
      include: includeCategoria,
      orderBy: { id: "asc" },
      skip,
      take: limit
    }),
    prisma.producto.count({ where })
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

export async function obtenerProducto(id) {
  return prisma.producto.findUnique({
    where: { id },
    include: includeCategoria
  });
}

export async function crearProducto(data) {
  return prisma.producto.create({
    data,
    include: includeCategoria
  });
}

export async function actualizarProducto(id, data) {
  return prisma.producto.update({
    where: { id },
    data,
    include: includeCategoria
  });
}

export async function eliminarProducto(id) {
  return prisma.producto.delete({ where: { id } });
}

export async function existeCategoria(id) {
  return prisma.categoria.findUnique({ where: { id }, select: { id: true } });
}
