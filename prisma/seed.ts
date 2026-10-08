import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER ?? "tienda",
  password: process.env.DATABASE_PASSWORD ?? "tienda123",
  database: process.env.DATABASE_NAME ?? "tienda_db",
  connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });

const categorias = [
  "Computadoras",
  "Laptops",
  "Monitores",
  "Teclados",
  "Mouse",
  "Almacenamiento",
  "Redes",
  "Impresoras",
  "Audio",
  "Accesorios"
];

const productos = [
  { nombre: "Laptop Lenovo ThinkPad E14", caracteristicas: "Intel Core i5, 16 GB RAM, SSD 512 GB, pantalla 14 pulgadas", categoria: "Laptops", precio: 18999.00, stock: 8, url: "https://example.com/img/thinkpad-e14.jpg" },
  { nombre: "Laptop ASUS Vivobook 15", caracteristicas: "Intel Core i7, 16 GB RAM, SSD 1 TB, pantalla 15.6 pulgadas", categoria: "Laptops", precio: 21999.00, stock: 5, url: "https://example.com/img/vivobook-15.jpg" },
  { nombre: "Monitor LG 24 pulgadas", caracteristicas: "Panel IPS Full HD, 75 Hz, HDMI", categoria: "Monitores", precio: 3499.90, stock: 12, url: "https://example.com/img/lg-24.jpg" },
  { nombre: "Monitor Samsung 27 pulgadas", caracteristicas: "Panel IPS QHD, 75 Hz, HDMI y DisplayPort", categoria: "Monitores", precio: 4599.00, stock: 7, url: "https://example.com/img/samsung-27.jpg" },
  { nombre: "Teclado mecanico Logitech", caracteristicas: "Switches mecanicos, retroiluminacion, USB", categoria: "Teclados", precio: 1499.00, stock: 15, url: "https://example.com/img/teclado-logitech.jpg" },
  { nombre: "Teclado Microsoft ergonomico", caracteristicas: "Diseño ergonomico, conexion USB, teclado numerico", categoria: "Teclados", precio: 899.00, stock: 10, url: "https://example.com/img/teclado-microsoft.jpg" },
  { nombre: "Mouse inalambrico Logitech", caracteristicas: "Conexion 2.4 GHz, sensor optico, receptor USB", categoria: "Mouse", precio: 499.00, stock: 20, url: "https://example.com/img/mouse-logitech.jpg" },
  { nombre: "Mouse gamer Razer", caracteristicas: "Sensor optico de alta precision, 6 botones programables", categoria: "Mouse", precio: 1299.00, stock: 9, url: "https://example.com/img/mouse-razer.jpg" },
  { nombre: "SSD Kingston 1 TB", caracteristicas: "SSD NVMe M.2, lectura hasta 3500 MB/s", categoria: "Almacenamiento", precio: 1699.00, stock: 14, url: "https://example.com/img/ssd-kingston.jpg" },
  { nombre: "Disco externo Western Digital 2 TB", caracteristicas: "USB 3.0, almacenamiento portatil de 2 TB", categoria: "Almacenamiento", precio: 1899.00, stock: 6, url: "https://example.com/img/wd-2tb.jpg" },
  { nombre: "Router TP-Link WiFi 6", caracteristicas: "WiFi 6 AX1800, doble banda, cuatro antenas", categoria: "Redes", precio: 1599.00, stock: 11, url: "https://example.com/img/tplink-wifi6.jpg" },
  { nombre: "Switch TP-Link 8 puertos", caracteristicas: "Gigabit Ethernet, 8 puertos RJ45, plug and play", categoria: "Redes", precio: 649.00, stock: 18, url: "https://example.com/img/switch-tplink.jpg" },
  { nombre: "Webcam Logitech C920", caracteristicas: "Video Full HD 1080p, microfonos estereo, USB", categoria: "Accesorios", precio: 1799.00, stock: 8, url: "https://example.com/img/c920.jpg" },
  { nombre: "Audifonos HyperX Cloud II", caracteristicas: "Audio envolvente, microfono desmontable, USB", categoria: "Audio", precio: 1899.00, stock: 10, url: "https://example.com/img/hyperx-cloud2.jpg" },
  { nombre: "Impresora multifuncional Epson", caracteristicas: "Impresion, escaneo y copiado, WiFi", categoria: "Impresoras", precio: 3299.00, stock: 4, url: "https://example.com/img/epson-multifuncional.jpg" }
];

async function main() {
  for (const nombre of categorias) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre }
    });
  }

  for (const producto of productos) {
    const categoria = await prisma.categoria.findUniqueOrThrow({
      where: { nombre: producto.categoria }
    });

    const existente = await prisma.producto.findFirst({
      where: { nombre: producto.nombre }
    });

    if (!existente) {
      await prisma.producto.create({
        data: {
          nombre: producto.nombre,
          caracteristicas: producto.caracteristicas,
          categoriaId: categoria.id,
          precio: producto.precio,
          stock: producto.stock,
          url: producto.url
        }
      });
    }
  }

  console.log("Datos iniciales cargados correctamente.");
}

main()
  .catch((error) => {
    console.error("Error al cargar datos iniciales:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
