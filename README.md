# 🛒 Carrito Deportivo

Este proyecto es una aplicación fullstack para la gestión de un carrito de compras, donde los usuarios pueden explorar productos, agregarlos al carrito y completar pedidos.

- **Frontend:** React + Vite + PrimeReact + TailwindCSS
- **Backend:** Spring Boot 3 + Spring Security + JWT + MariaDB

---

## 📦 Estructura del Proyecto

prueba-tigo
|----- carrito-deportivo #backend (spring boot java 17)
|----- carrito-frontend #frontend (React con Vite)


---

## 🚀 Tecnologías Utilizadas

### Frontend (React)

- React 19
- Vite
- PrimeReact (UI)
- TailwindCSS (estilos)
- Axios (HTTP client)
- React Router DOM
- date-fns (fechas)

### Backend (Spring Boot)

- Spring Web
- Spring Security (con JWT)
- Spring Data JPA
- Jakarta Validation / Persistence
- MariaDB Driver
- Java 17
- Lombok
- Gson & Commons BeanUtils

---

## 🔧 Requisitos Previos

- Node.js >= 18
- Java 17
- Maven o Gradle
- MariaDB o MySQL (para base de datos)

---

## ▶️ Instrucciones de Ejecución

### 1. Backend

```bash
cd carrito-deportivo
./gradlew clean build -x test
./gradlew bootRun
```
### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
---

## Notas:
- Se adjuntó en la raíz del repositorio un Postman v2 con las llamadas de las APIs utilizadas
- Se adjunta docker-compose.yaml con contenedor de MariaDB, el docker creará la base de datos, si se usa otro gestor que no sea el docker, asegurarse de crear la base de datos llamada deportes_db y modificar las credenciales en application.properties
