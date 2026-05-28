# 📋 PersonaMS — Sistema de Gestión de Personas

> Microservicio REST construido con **Spring Boot 3** y una interfaz web en **Vanilla JS** para gestionar un registro de personas con operaciones CRUD completas.

---

## 📑 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Modelo de Datos](#modelo-de-datos)
6. [API REST — Endpoints](#api-rest--endpoints)
7. [Capa de Servicio (Backend)](#capa-de-servicio-backend)
8. [Frontend — Arquitectura JS](#frontend--arquitectura-js)
9. [Requisitos Previos](#requisitos-previos)
10. [Cómo Correr el Proyecto](#cómo-correr-el-proyecto)
11. [Uso con Postman](#uso-con-postman)
12. [Validaciones del Formulario](#validaciones-del-formulario)
13. [Diseño y Estilos](#diseño-y-estilos)
14. [Páginas Disponibles](#páginas-disponibles)
15. [Posibles Errores y Soluciones](#posibles-errores-y-soluciones)
16. [Mejoras Futuras](#mejoras-futuras)

---

## Descripción General

**PersonaMS** es una aplicación de tipo CRUD (Create, Read, Update, Delete) que permite gestionar un listado de personas. Está dividida en dos partes independientes que se comunican mediante una API REST:

- **Backend**: Microservicio desarrollado en Java con Spring Boot. Expone una API REST en el puerto `8080` y almacena los datos **en memoria** (sin base de datos), lo que lo hace ideal para prototipado y aprendizaje.
- **Frontend**: Interfaz web desarrollada con HTML5, CSS3 y JavaScript modular (ES Modules). Se comunica con el backend a través de `fetch` y permite realizar todas las operaciones CRUD desde el navegador.

La combinación de ambas capas permite registrar, consultar, editar y eliminar personas con nombre, dirección, teléfono y correo electrónico.

---

## Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Java | 21 | Lenguaje principal |
| Spring Boot | 3.4.5 | Framework web y REST |
| Spring Web | — | Controladores REST, manejo HTTP |
| Lombok | — | Reducción de boilerplate (getters, setters, constructores) |
| Maven | 3.9.16 | Gestión de dependencias y build |

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| HTML5 | — | Estructura de páginas |
| CSS3 | — | Estilos, animaciones, diseño responsive |
| JavaScript ES2020+ | — | Lógica de la aplicación (ES Modules) |
| Google Fonts | — | Tipografías DM Sans, DM Mono, Playfair Display |

### Herramientas
| Herramienta | Uso |
|---|---|
| Postman | Pruebas de la API REST |
| VS Code | Editor recomendado (incluye `launch.json`) |
| Live Server (extensión) | Servir el frontend en desarrollo |

---

## Arquitectura del Proyecto

El proyecto sigue un patrón **cliente-servidor desacoplado**:

```
┌─────────────────────────────────────────────────────┐
│                   NAVEGADOR WEB                     │
│                                                     │
│  index.html  ──►  app.js  ──►  personaService.js   │
│                               ──►  api.js           │
│                               ──►  fetch()          │
└──────────────────────┬──────────────────────────────┘
                       │  HTTP (JSON)
                       │  localhost:8080/api/personas
                       ▼
┌─────────────────────────────────────────────────────┐
│              SPRING BOOT (Puerto 8080)              │
│                                                     │
│  PersonaController  ──►  PersonaService             │
│       (REST)              (Lógica + List<>)         │
└─────────────────────────────────────────────────────┘
```

El backend **no usa base de datos**. Los datos se guardan en un `ArrayList` en memoria dentro del `PersonaService`. Esto significa que al reiniciar el servidor, los datos se pierden.

---

## Estructura de Carpetas

```
Microservicios/
│
├── backend/                          ← Proyecto Spring Boot
│   ├── .mvn/wrapper/
│   │   └── maven-wrapper.properties  ← Configuración Maven Wrapper
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/P/Microservicios/
│   │   │   │   ├── MicroserviciosApplication.java   ← Punto de entrada
│   │   │   │   ├── Controller/
│   │   │   │   │   └── PersonaController.java       ← Endpoints REST
│   │   │   │   ├── Model/
│   │   │   │   │   └── Persona.java                 ← Entidad / POJO
│   │   │   │   └── Service/
│   │   │   │       └── PersonaService.java          ← Lógica de negocio
│   │   │   └── resources/
│   │   │       └── application.properties           ← Configuración app
│   │   └── test/
│   │       └── MicroserviciosApplicationTests.java  ← Test básico
│   ├── pom.xml                       ← Dependencias Maven
│   ├── mvnw                          ← Maven Wrapper (Linux/Mac)
│   └── mvnw.cmd                      ← Maven Wrapper (Windows)
│
├── frontend/                         ← Interfaz web
│   ├── index.html                    ← Página principal (listado)
│   ├── config/
│   │   └── environment.js            ← URL base de la API
│   ├── services/
│   │   └── personaService.js         ← Llamadas a la API por entidad
│   ├── models/
│   │   └── persona.js                ← Clase Persona (JS)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── variables.css         ← Tokens de diseño (colores, fuentes)
│   │   │   ├── style.css             ← Estilos principales
│   │   │   └── responsive.css        ← Media queries
│   │   └── js/
│   │       ├── app.js                ← Controlador principal
│   │       ├── api.js                ← Capa HTTP genérica (fetch wrapper)
│   │       ├── ui.js                 ← Manipulación del DOM
│   │       └── validations.js        ← Validaciones de formulario
│   ├── components/
│   │   ├── navbar.html               ← Barra de navegación (componente)
│   │   ├── footer.html               ← Pie de página (componente)
│   │   ├── modal.html                ← Modal de crear/editar
│   │   └── table.html                ← Tabla de personas
│   └── pages/
│       ├── home.html                 ← Vista home alternativa
│       ├── create.html               ← Página de creación
│       ├── edit.html                 ← Página de edición
│       └── details.html              ← Página de detalle
│
├── .vscode/
│   └── launch.json                   ← Configuración de debug para VS Code
└── Microservicios.postman_collection.json  ← Colección Postman
```

---

## Modelo de Datos

### Entidad `Persona`

```java
// Microservicios/backend/src/main/java/com/P/Microservicios/Model/Persona.java

@Data               // Lombok: genera getters, setters, equals, hashCode, toString
@NoArgsConstructor  // Lombok: constructor vacío
@AllArgsConstructor // Lombok: constructor con todos los campos
public class Persona {
    private Long   id;        // Identificador único (asignado automáticamente)
    private String nombre;    // Nombre completo
    private String direccion; // Dirección física
    private String telefono;  // Número de teléfono
    private String correo;    // Correo electrónico
}
```

### Ejemplo de objeto JSON

```json
{
  "id": 1,
  "nombre": "Camila Torres",
  "direccion": "Carrera 15 # 80-21, Bogotá",
  "telefono": "3001234567",
  "correo": "camila@gmail.com"
}
```

> **Nota:** Al crear una persona con `POST`, **no es necesario enviar el campo `id`** — el backend lo asigna automáticamente con un contador incremental (`nextId`).

---

## API REST — Endpoints

Base URL: `http://localhost:8080/api`

| Método | Endpoint | Descripción | Body requerido |
|--------|----------|-------------|----------------|
| `GET` | `/personas` | Retorna la lista completa de personas | No |
| `GET` | `/personas/{id}` | Retorna una persona por su ID | No |
| `POST` | `/personas` | Crea una nueva persona | Sí (JSON) |
| `PUT` | `/personas/{id}` | Actualiza una persona existente | Sí (JSON) |
| `DELETE` | `/personas/{id}` | Elimina una persona por su ID | No |

### Detalle de cada endpoint

#### `GET /api/personas`
Retorna un array con todas las personas registradas.

**Respuesta exitosa `200 OK`:**
```json
[
  {
    "id": 1,
    "nombre": "Camila Torres",
    "direccion": "Cartagena",
    "telefono": "3001234567",
    "correo": "camila@gmail.com"
  },
  {
    "id": 2,
    "nombre": "Andrés Pérez",
    "direccion": "Medellín",
    "telefono": "3109876543",
    "correo": "andres@correo.com"
  }
]
```

#### `GET /api/personas/{id}`
Retorna una sola persona. Si no existe, devuelve `null` con `200`.

**Ejemplo:** `GET /api/personas/1`

```json
{
  "id": 1,
  "nombre": "Camila Torres",
  "direccion": "Cartagena",
  "telefono": "3001234567",
  "correo": "camila@gmail.com"
}
```

#### `POST /api/personas`
Crea una nueva persona. El ID es asignado automáticamente.

**Body:**
```json
{
  "nombre": "Laura Gómez",
  "direccion": "Calle 10 # 5-20, Cali",
  "telefono": "3151112233",
  "correo": "laura@gmail.com"
}
```

**Respuesta `200 OK`:**
```json
{
  "id": 3,
  "nombre": "Laura Gómez",
  "direccion": "Calle 10 # 5-20, Cali",
  "telefono": "3151112233",
  "correo": "laura@gmail.com"
}
```

#### `PUT /api/personas/{id}`
Actualiza los datos de una persona existente.

**Ejemplo:** `PUT /api/personas/1`

**Body:**
```json
{
  "nombre": "Camila Torres Ruiz",
  "direccion": "Barranquilla",
  "telefono": "3004445566",
  "correo": "camila.torres@gmail.com"
}
```

#### `DELETE /api/personas/{id}`
Elimina la persona con el ID indicado.

**Respuesta exitosa:**
```
Persona eliminada
```

**Si no existe:**
```
No encontrada
```

---

## Capa de Servicio (Backend)

El `PersonaService` actúa como repositorio en memoria. Usa una `List<Persona>` y un contador `nextId` para simular una base de datos:

```java
@Service
public class PersonaService {

    private final List<Persona> lista = new ArrayList<>();
    private Long nextId = 1L;

    // Al crear, asigna ID automáticamente — NO depende del ID enviado en el JSON
    public Persona guardar(Persona persona) {
        persona.setId(nextId++);
        lista.add(persona);
        return persona;
    }

    // Usa stream + filter para buscar sin lanzar excepción si no existe
    public Persona buscarPorId(Long id) {
        return lista.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // removeIf evita ConcurrentModificationException al iterar y eliminar
    public String eliminar(Long id) {
        boolean eliminado = lista.removeIf(p -> p.getId().equals(id));
        return eliminado ? "Persona eliminada" : "No encontrada";
    }
}
```

> ⚠️ **Importante:** Como el almacenamiento es en memoria, **todos los datos se pierden al reiniciar el servidor**. Para persistencia real se debería integrar Spring Data JPA con una base de datos como PostgreSQL o H2.

---

## Frontend — Arquitectura JS

El frontend usa **ES Modules** (`type="module"`) lo que lo hace modular y organizado. El flujo de datos es el siguiente:

```
app.js  (controlador)
  ├── personaService.js  (servicio por entidad)
  │     └── api.js       (fetch genérico con manejo de errores)
  │           └── environment.js  (BASE_URL configurable)
  ├── ui.js              (renderizado del DOM)
  └── validations.js     (reglas de validación)
```

### `environment.js` — Configuración de la URL
```javascript
const ENV = {
    BASE_URL: "http://localhost:8080/api",
    PERSONAS_ENDPOINT: "/personas",
};
```
Si el backend corre en otro puerto o servidor, **solo se cambia aquí**.

### `api.js` — Capa HTTP genérica
Centraliza todas las llamadas `fetch`. Maneja errores de red y respuestas no-OK. Detecta automáticamente si la respuesta es JSON o texto plano.

### `personaService.js` — Servicio de Personas
Abstrae los endpoints concretos para que `app.js` no tenga que conocer las URLs:
```javascript
const personaService = {
    listar:       ()         => api.get(EP),
    buscarPorId:  (id)       => api.get(`${EP}/${id}`),
    crear:        (persona)  => api.post(EP, persona),
    actualizar:   (id, data) => api.put(`${EP}/${id}`, data),
    eliminar:     (id)       => api.delete(`${EP}/${id}`),
};
```

### `ui.js` — Manipulación del DOM
Contiene métodos puros para actualizar la interfaz: renderizar la tabla, abrir/cerrar el modal, mostrar notificaciones toast y manejar estados de carga.

---

## Requisitos Previos

Antes de correr el proyecto asegúrate de tener instalado:

| Requisito | Versión mínima | Cómo verificar |
|-----------|---------------|----------------|
| **Java JDK** | 21 | `java -version` |
| **Maven** | 3.6+ (o usar el wrapper incluido) | `mvn -version` |
| **Navegador moderno** | Chrome 90+ / Firefox 88+ / Edge 90+ | — |
| **VS Code** *(opcional)* | Cualquiera | — |
| **Extensión Live Server** *(opcional)* | Cualquiera | — |
| **Postman** *(opcional)* | Cualquiera | — |

> El proyecto incluye **Maven Wrapper** (`mvnw` / `mvnw.cmd`), por lo que **no es obligatorio tener Maven instalado globalmente**. El wrapper lo descarga automáticamente.

---

## Cómo Correr el Proyecto

### Paso 1 — Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd Microservicios
```

O simplemente descomprime el ZIP descargado.

---

### Paso 2 — Levantar el Backend (Spring Boot)

#### Opción A: Con Maven Wrapper (recomendado, no requiere Maven instalado)

**En Linux / Mac:**
```bash
cd backend
chmod +x mvnw        # solo la primera vez
./mvnw spring-boot:run
```

**En Windows (CMD):**
```cmd
cd backend
mvnw.cmd spring-boot:run
```

**En Windows (PowerShell):**
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

#### Opción B: Con Maven instalado globalmente

```bash
cd backend
mvn spring-boot:run
```

#### Opción C: Desde VS Code

1. Abre la carpeta `Microservicios` en VS Code.
2. Instala la extensión **Extension Pack for Java** (de Microsoft).
3. Ve a **Run & Debug** (`Ctrl+Shift+D`).
4. Selecciona la configuración `Spring Boot-MicroserviciosApplication<Microservicios>`.
5. Presiona **F5** o el botón verde de Play.

#### Verificar que el backend está corriendo

Abre el navegador y visita:
```
http://localhost:8080/api/personas
```
Deberías ver una respuesta JSON vacía: `[]`

La consola de Spring Boot mostrará algo como:
```
Started MicroserviciosApplication in 2.3 seconds (process running for 2.6)
```

---

### Paso 3 — Abrir el Frontend

El frontend es HTML/JS puro y **no requiere instalación ni build**. Solo necesita ser servido por un servidor HTTP local (por CORS y ES Modules).

#### Opción A: Con Live Server en VS Code (más fácil)

1. Instala la extensión **Live Server** en VS Code.
2. Abre el archivo `frontend/index.html`.
3. Haz clic derecho → **Open with Live Server**.
4. Se abrirá automáticamente en `http://127.0.0.1:5500/frontend/index.html`.

#### Opción B: Con Python (sin instalar nada extra en Linux/Mac)

```bash
cd frontend
python3 -m http.server 5500
```
Luego abre: `http://localhost:5500`

#### Opción C: Con Node.js

```bash
cd frontend
npx serve .
```

#### Opción D: Directamente en el navegador (puede fallar por CORS)

Algunos navegadores bloquean ES Modules abiertos con `file://`. Se recomienda siempre usar un servidor local.

---

### Paso 4 — Usar la aplicación

Con backend y frontend corriendo:

1. Abre `http://localhost:5500` (o el puerto de tu servidor local).
2. Haz clic en **Nueva persona** para agregar un registro.
3. La tabla se actualizará automáticamente.
4. Usa los botones ✏️ (editar) y 🗑️ (eliminar) en cada fila.
5. Usa la barra de búsqueda para filtrar en tiempo real.

---

## Uso con Postman

El proyecto incluye la colección `Microservicios.postman_collection.json` lista para importar.

### Importar la colección

1. Abre Postman.
2. Clic en **Import** (esquina superior izquierda).
3. Arrastra el archivo `Microservicios.postman_collection.json` o búscalo manualmente.
4. La colección aparecerá con las peticiones preconfiguradas.

### Peticiones incluidas

| Petición | Método | URL |
|----------|--------|-----|
| Listar por ID | `GET` | `http://localhost:8080/api/personas/1` |
| Crear persona | `POST` | `http://localhost:8080/api/personas` |
| Actualizar persona | `PUT` | `http://localhost:8080/api/personas/1` |

### Crear una persona desde Postman

1. Selecciona la petición **POST**.
2. Ve a la pestaña **Body** → **raw** → **JSON**.
3. Pega el siguiente JSON:
```json
{
  "nombre": "Camila",
  "direccion": "Cartagena",
  "telefono": "3001234567",
  "correo": "camila@gmail.com"
}
```
4. Clic en **Send**.
5. La respuesta incluirá el objeto con el `id` asignado.

---

## Validaciones del Formulario

El frontend valida los datos antes de enviarlos al backend. Las reglas se definen en `validations.js`:

| Campo | Regla | Mensaje de error |
|-------|-------|-----------------|
| **Nombre** | Obligatorio, mín. 2 caracteres, máx. 100, solo letras y espacios | "El nombre solo puede contener letras y espacios (mín. 2 caracteres)." |
| **Dirección** | Obligatoria, mín. 5 caracteres, máx. 200 | "La dirección debe tener al menos 5 caracteres." |
| **Teléfono** | Obligatorio, entre 7 y 20 caracteres, solo números y `+`, `-`, espacios, paréntesis | "Ingresa un teléfono válido." |
| **Correo** | Obligatorio, formato `nombre@dominio.ext` | "Ingresa un correo electrónico válido." |

Los errores se muestran inline debajo de cada campo, con estilo visual rojo. Al corregir el campo, el error desaparece automáticamente.

---

## Diseño y Estilos

El sistema de diseño está definido completamente en `variables.css` usando **CSS Custom Properties (variables)**:

```css
:root {
    --primary:    #1d4ed8;   /* Azul principal */
    --bg:         #f4f5f7;   /* Fondo general */
    --bg-card:    #ffffff;   /* Fondo de tarjetas */
    --ink:        #111827;   /* Texto principal */
    --success:    #059669;   /* Verde */
    --error:      #dc2626;   /* Rojo */
    --font-body:  'DM Sans'; /* Fuente base */
    --font-mono:  'DM Mono'; /* Monoespaciada (IDs, teléfonos) */
}
```

### Responsive
La app es completamente responsive gracias a `responsive.css`:
- **< 900px**: oculta la columna Dirección.
- **< 640px**: adapta el header, oculta textos secundarios, reorganiza el footer.
- **< 400px**: oculta la columna Correo para priorizar información esencial.

---

## Páginas Disponibles

| Archivo | Ruta | Descripción |
|---------|------|-------------|
| `index.html` | `/` | Página principal con tabla completa y modal integrado |
| `pages/create.html` | `/pages/create.html` | Formulario de creación en página separada |
| `pages/edit.html` | `/pages/edit.html?id={id}` | Formulario de edición (recibe `id` por query string) |
| `pages/details.html` | `/pages/details.html?id={id}` | Vista de detalle de una persona |
| `pages/home.html` | `/pages/home.html` | Vista home alternativa con modal |

> La página principal (`index.html`) es la más completa e integra el modal directamente, por lo que es el punto de entrada recomendado.

---

## Posibles Errores y Soluciones

### El frontend no puede conectarse al backend

**Error en consola:** `Failed to fetch` o `CORS error`

**Causas y soluciones:**
1. El backend no está corriendo → ejecuta `./mvnw spring-boot:run` en la carpeta `backend/`.
2. El frontend se abrió con `file://` en lugar de un servidor → usa Live Server o Python HTTP.
3. El backend corre en un puerto diferente → cambia `BASE_URL` en `frontend/config/environment.js`.

El controlador ya tiene `@CrossOrigin("*")` configurado, así que CORS no debería ser un problema si el backend está corriendo.

---

### Error al compilar: `java.lang.UnsupportedClassVersionError`

El proyecto requiere **Java 21**. Verifica tu versión con:
```bash
java -version
```
Si tienes una versión anterior, instala JDK 21 desde [adoptium.net](https://adoptium.net).

---

### `mvnw: Permission denied` en Linux/Mac

```bash
chmod +x mvnw
./mvnw spring-boot:run
```

---

### Los datos desaparecen al reiniciar el servidor

Es el comportamiento esperado. El backend usa almacenamiento **en memoria** (`ArrayList`). Para persistencia real, se necesitaría integrar una base de datos.

---

### El puerto 8080 está ocupado

Agrega en `backend/src/main/resources/application.properties`:
```properties
server.port=8081
```
Y actualiza `BASE_URL` en `frontend/config/environment.js` al nuevo puerto.

---

## Mejoras Futuras

Algunas ideas para extender el proyecto:

- **Persistencia real**: Integrar Spring Data JPA con H2 (en memoria persistente) o PostgreSQL.
- **Paginación**: Agregar paginación en el endpoint `GET /personas` para listas grandes.
- **Búsqueda en backend**: Agregar endpoint `GET /personas/buscar?nombre=camila` para filtrar desde el servidor.
- **Validaciones en backend**: Agregar `@Valid` y `@NotBlank` con Bean Validation para no depender solo del frontend.
- **Manejo de errores HTTP**: Retornar `404 Not Found` cuando una persona no existe, en lugar de `null`.
- **Docker**: Crear un `Dockerfile` para el backend y un `docker-compose.yml` para levantar todo con un solo comando.
- **Tests unitarios**: Ampliar los tests del servicio con JUnit 5 y Mockito.
- **Autenticación**: Agregar Spring Security con JWT para proteger los endpoints.

---

## Autores

Desarrollado por **Grupo 3 & 4**.

---

*Proyecto académico de introducción a microservicios con Spring Boot y JavaScript modular.*