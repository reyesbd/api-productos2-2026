<<<<<<< HEAD
# api-productos2-2026
Segunda versión de API Rest productos
=======
# API REST de Productos y Categorías

API REST educativa para una tienda de equipos y accesorios de cómputo.

## Stack

- Node.js 24 LTS
- Express 5
- Prisma ORM 7
- MySQL 8.4
- JavaScript ES Modules

## 1. Instalar dependencias

```bash
npm install
```

## 2. Configurar variables de entorno

Copiar `.env.example` a `.env`.

```bash
copy .env.example .env
```

En Linux/macOS:

```bash
cp .env.example .env
```

## 3. Levantar MySQL con Docker

```bash
docker compose up -d
```

También puede utilizarse una instalación local de MySQL. En ese caso deben coincidir las variables del `.env`.

## 4. Generar Prisma Client

```bash
npm run prisma:generate
```

## 5. Aplicar migraciones

```bash
npm run prisma:migrate -- --name init
```

Si se utiliza la migración incluida en este proyecto, también puede ejecutarse:

```bash
npx prisma migrate deploy
```

## 6. Cargar datos de prueba

```bash
npm run prisma:seed
```

## 7. Ejecutar la API

Desarrollo:

```bash
npm run dev
```

Producción/local:

```bash
npm start
```

API: `http://localhost:3000`

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Estado básico de la API |
| GET | `/health` | Health check |
| GET | `/api/categorias` | Listar categorías |
| POST | `/api/categorias` | Crear categoría |
| GET | `/api/categorias/:id` | Obtener categoría con productos |
| PUT | `/api/categorias/:id` | Actualizar categoría |
| DELETE | `/api/categorias/:id` | Eliminar categoría |
| GET | `/api/categorias/:id/productos` | Productos de una categoría |
| GET | `/api/productos` | Listar productos |
| POST | `/api/productos` | Crear producto |
| GET | `/api/productos/:id` | Obtener producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

## Filtros y búsqueda

```http
GET /api/productos?categoria=Monitores
GET /api/productos?precioMin=1000&precioMax=5000
GET /api/productos?buscar=logitech
GET /api/productos?page=1&limit=10
```

Los filtros pueden combinarse:

```http
GET /api/productos?buscar=logitech&precioMin=500&precioMax=3000&page=1&limit=10
```

## Ejemplo: crear categoría

```http
POST /api/categorias
Content-Type: application/json
```

```json
{
  "nombre": "Monitores"
}
```

## Ejemplo: crear producto

```http
POST /api/productos
Content-Type: application/json
```

```json
{
  "nombre": "Monitor LG 24 pulgadas",
  "caracteristicas": "Panel IPS Full HD, 75 Hz, HDMI",
  "precio": 3499.90,
  "stock": 10,
  "url": "https://example.com/monitor-lg.jpg",
  "categoriaId": 3
}
```

## Respuesta de producto

```json
{
  "id": 1,
  "nombre": "Monitor LG 24 pulgadas",
  "caracteristicas": "Panel IPS Full HD, 75 Hz, HDMI",
  "categoriaId": 3,
  "precio": "3499.90",
  "stock": 10,
  "url": "https://example.com/monitor-lg.jpg",
  "categoria": {
    "id": 3,
    "nombre": "Monitores"
  }
}
```

## Notas sobre Prisma 7

Prisma 7 requiere un driver adapter para conexiones directas. Este proyecto utiliza `@prisma/adapter-mariadb` para MySQL y configura `PrismaClient` con `PrismaMariaDb`.

El proyecto conserva `prisma-client-js` porque la aplicación solicitada está implementada en JavaScript. Ese generador está deprecado en Prisma 7, aunque sigue disponible; para proyectos nuevos Prisma recomienda `prisma-client`, que genera TypeScript. La elección permite mantener el requisito pedagógico de JavaScript/ES Modules sin introducir TypeScript en la aplicación.
>>>>>>> a47c159 (Primer commit)
