import { prisma } from "../lib/prisma.js";

export async function listarCategorias() {
  return prisma.categoria.findMany({
    orderBy: { id: "asc" }
  });
}

export async function obtenerCategoria(id) {
  return prisma.categoria.findUnique({
    where: { id },
    include: { productos: true }
  });
}

export async function crearCategoria(nombre) {
  return prisma.categoria.create({
    data: { nombre }
  });
}

export async function actualizarCategoria(id, nombre) {
  return prisma.categoria.update({
    where: { id },
    data: { nombre }
  });
}

export async function eliminarCategoria(id) {
  return prisma.categoria.delete({ where: { id } });
}

export async function productosDeCategoria(id) {
  return prisma.categoria.findUnique({
    where: { id },
    include: {
      productos: {
        orderBy: { id: "asc" }
      }
    }
  });
}
