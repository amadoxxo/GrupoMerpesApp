# 🛒 Aplicación Móvil Híbrida de E-Commerce (Ionic & .NET 9)

Aplicación móvil híbrida de comercio electrónico desarrollada con **Ionic (Standalone Components)**, **Angular**, **TypeScript** y **Cordova**. Cuenta con un backend robusto en **ASP.NET Core Web API (.NET 9)** conectado a una base de datos relacional en **PostgreSQL** ejecutándose sobre **Docker**.

---

## 🚀 Arquitectura y Stack Tecnológico

- **Frontend (Móvil):**
  - Ionic Framework (Componentes Independientes / Standalone)
  - Angular 17+ (con sintaxis `@if` y `@for`)
  - TypeScript
  - Apache Cordova
  - Angular Signals y Programación Reactiva
- **Backend (API):**
  - ASP.NET Core Web API (.NET 9)
  - Entity Framework Core (ORM)
  - Patrón DTO (Data Transfer Objects) para la gestión segura de peticiones y serialización de JSON de productos
- **Base de Datos:**
  - PostgreSQL (ejecutándose en un contenedor Docker)

---

## 📱 Estructura de la Aplicación (Tabs)

1. **Catálogo (Tab 1):** Muestra los productos obtenidos en tiempo real desde la API de .NET, adaptados con diseño responsivo (`object-fit: contain`) y botón interactivo para agregar al carrito de compras.
2. **Carrito de Compras y Checkout (Tab 2):** Listado reactivo de ítems seleccionados, control dinámico de cantidades (incrementar/disminuir), cálculo automático del subtotal y total, validación estricta de sesión activa y envío de la orden real al servidor.
3. **Cuenta y Autenticación (Tab 3):** Pantalla dedicada exclusivamente al registro de nuevos usuarios, inicio de sesión seguro, gestión de perfiles y control de sesiones activas.

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalado en tu entorno de desarrollo local:
- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [.NET 9 SDK](https://dotnet.microsoft.com/)
- [Docker Desktop](https://www.docker.com/) (para levantar PostgreSQL)

---

## 🛠️ Guía de Configuración y Arranque

Sigue estos pasos en orden para poner en marcha todo el ecosistema de la aplicación.

### Paso 1: Levantar la Base de Datos (PostgreSQL en Docker)
Abre tu terminal y ejecuta el siguiente contenedor Docker para iniciar la base de datos PostgreSQL:

```bash
docker run --name postgres-tienda -e POSTGRES_DB=tiendadb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=tu_password -p 5432:5432 -d postgres
```

### Paso 2: Configurar y Ejecutar el Backend (.NET 9)
1. Navega hasta la carpeta de tu proyecto de .NET:
   ```bash
   cd ruta-de-tu-proyecto/TiendaApi
   ```
2. Configura tu cadena de conexión (`ConnectionStrings`) en el archivo `appsettings.json` apuntando a tu contenedor de PostgreSQL.
3. Aplica las migraciones y actualiza la base de datos:
   ```bash
   dotnet ef database update
   ```
4. Ejecuta el servidor API:
   ```bash
   dotnet run
   ```
   *(La API correrá por defecto en los puertos configurados de desarrollo, ej. `https://localhost:7001` o `http://localhost:5000`).*

### Paso 3: Configurar y Ejecutar el Frontend (Ionic)
1. Abre otra ventana de tu terminal y navega hasta la raíz de tu proyecto Ionic:
   ```bash
   cd ruta-de-tu-proyecto/IonicApp
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Verifica que la URL base de tu API en tus servicios de Angular (`api.service.ts`) apunte correctamente al puerto de tu backend de .NET.
4. Inicia la aplicación en modo desarrollo web:
   ```bash
   ionic serve
   ```

---

## 📦 Endpoints Principales del Backend (`/api`)

- **Usuarios (`/api/usuarios`):**
  - `POST /api/usuarios/registro`: Registra un nuevo usuario cifrando credenciales.
  - `POST /api/usuarios/login`: Valida las credenciales y autentica al usuario.
- **Órdenes (`/api/ordenes`):**
  - `POST /api/ordenes`: Recibe el `usuarioId` y la lista de `productos` con sus cantidades, consulta los precios reales en PostgreSQL, calcula el total de forma segura, serializa el detalle en formato JSON en la columna `DetalleProductos` y persiste la orden de manera íntegra.

---