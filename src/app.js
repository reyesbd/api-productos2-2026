import "dotenv/config";
import express from "express";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API de tienda de cómputo funcionando",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ estado: "ok" });
});

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
