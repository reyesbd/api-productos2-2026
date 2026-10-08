# Comandos de instalación y ejecución

## 1. Crear `.env`

Windows CMD:

```cmd
copy .env.example .env
```

PowerShell / Linux / macOS:

```bash
cp .env.example .env
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Levantar MySQL

```bash
docker compose up -d
```

## 4. Generar Prisma Client

```bash
npm run prisma:generate
```

## 5. Crear/aplicar migración

Para una base de datos nueva:

```bash
npm run prisma:migrate -- --name init
```

Si se desea utilizar la migración incluida:

```bash
npx prisma migrate deploy
```

## 6. Cargar datos

```bash
npm run prisma:seed
```

## 7. Iniciar API

```bash
npm run dev
```

## 8. Probar

```text
http://localhost:3000/
http://localhost:3000/health
http://localhost:3000/api/categorias
http://localhost:3000/api/productos
```

## 9. Prisma Studio

```bash
npm run prisma:studio
```
