Gestión de Pacientes - Prueba Técnica RIACS Chile

Aplicación desarrollada como parte del proceso de selección para la Práctica Profesional de Desarrollo Backend de RIACS Chile.

La solución permite gestionar pacientes mediante las operaciones básicas de un CRUD: registrar, consultar, modificar y eliminar registros.

Cada paciente contiene información como nombre, apellido, RUT, fecha de nacimiento, correo electrónico y teléfono. Además, se implementaron validaciones para asegurar la integridad de los datos.

La solución está compuesta por:

Backend desarrollado con Spring Boot.

Base de datos PostgreSQL.

Frontend desarrollado con React y Vite.

Docker y Docker Compose para ejecutar el backend y la base de datos.

1. Tecnologías utilizadas

Backend

Java 21

Spring Boot 4.1.1

Spring Web MVC

Spring Data JPA

Jakarta Bean Validation

PostgreSQL

Maven

Springdoc OpenAPI / Swagger

Docker

Docker Compose

Frontend

React

Vite

JavaScript

CSS

Fetch API

2. Requisitos previos

Para ejecutar el proyecto se requiere:

Docker Desktop, o Docker Engine con Docker Compose.

Node.js.

npm.

Git, en caso de clonar el repositorio.

No es necesario tener Java, Maven ni PostgreSQL instalados localmente para ejecutar el backend, ya que tanto la API como la base de datos se ejecutan mediante Docker.

3. Ejecución del backend y la base de datos

El backend incluye un Dockerfile y un archivo docker-compose.yml que permiten levantar la API y PostgreSQL mediante contenedores.

Desde la carpeta del backend:

cd gestion-pacientes-api

Ejecutar:

docker compose up --build

Docker Compose levantará:

El backend Spring Boot en el puerto 8080.

PostgreSQL dentro de un contenedor.

PostgreSQL accesible desde el host mediante el puerto 5433.

Una vez iniciado correctamente, el backend se ejecutará en el puerto 8080.

La API de pacientes estará disponible en:

http://localhost:8080/api/pacientes

Para detener los contenedores:

docker compose down

Para detenerlos y eliminar también los volúmenes asociados:

docker compose down -v

Si se realizan cambios en el código del backend y se desea reconstruir la imagen:

docker compose up --build

4. Ejecución del frontend

Abrir una nueva terminal y acceder a la carpeta del frontend:

cd gestion-pacientes-frontend

Instalar las dependencias:

npm install

Iniciar el servidor de desarrollo:

npm run dev

Por defecto, la interfaz estará disponible en:

http://localhost:5173

Para utilizar correctamente la aplicación, el backend debe estar ejecutándose en:

http://localhost:8080/api/pacientes

El backend tiene configurado CORS para permitir solicitudes provenientes del frontend ejecutado en http://localhost:5173.

5. Endpoints principales

La API permite realizar las operaciones principales de gestión de pacientes.

Listar pacientes

GET /api/pacientes

Obtener un paciente por ID

GET /api/pacientes/{id}

Registrar un nuevo paciente

POST /api/pacientes

Modificar un paciente existente

PUT /api/pacientes/{id}

Eliminar un paciente

DELETE /api/pacientes/{id}

Ejemplo de paciente

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "rut": "12345678-5",
  "fechaNacimiento": "1995-05-20",
  "correoElectronico": "juan@email.com",
  "telefono": "912345678"
}

6. Swagger / OpenAPI

La API incluye documentación interactiva mediante Swagger/OpenAPI.

Una vez ejecutada la aplicación, Swagger UI puede consultarse desde:

http://localhost:8080/swagger-ui/index.html

La especificación OpenAPI en formato JSON está disponible en:

http://localhost:8080/v3/api-docs

Desde Swagger UI es posible visualizar y probar directamente los endpoints de la API.

7. Validaciones implementadas

Se implementaron validaciones para asegurar la integridad de los datos recibidos por la API.

Nombre

El nombre es obligatorio y no puede estar vacío.

Apellido

El apellido es obligatorio y no puede estar vacío.

RUT

El RUT es obligatorio.

Además, se implementó un validador personalizado para comprobar que corresponda a un RUT chileno válido mediante el cálculo de su dígito verificador.

El sistema permite recibir el RUT con o sin puntos y guion, y normaliza su formato antes de almacenarlo.

También se evita registrar más de un paciente con el mismo RUT.

Fecha de nacimiento

La fecha de nacimiento:

Es obligatoria.

Debe corresponder a una fecha anterior a la fecha actual.

Correo electrónico

El correo electrónico:

Es obligatorio.

Debe tener un formato válido.

Teléfono

El teléfono es obligatorio y no puede estar vacío.

Manejo de errores de validación

La aplicación cuenta con un manejador global de errores de validación.

Cuando los datos enviados no cumplen las condiciones establecidas, la API responde con código HTTP 400 Bad Request e informa los campos que presentan errores.

Ejemplo:

{
  "correoElectronico": "El correo electrónico no es válido",
  "rut": "El RUT ingresado no es válido"
}

8. Comandos Linux

A continuación se muestran algunos comandos útiles para administrar o diagnosticar la aplicación en un entorno Linux.

Revisar los logs de la aplicación

Para consultar los logs mediante Docker Compose:

docker compose logs

Para visualizar los logs en tiempo real:

docker compose logs -f

También se pueden consultar directamente los logs de un contenedor:

docker logs -f <nombre_o_id_del_contenedor>

Si la aplicación estuviera configurada como un servicio de systemd:

sudo journalctl -u gestion-pacientes-api -f

Verificar qué proceso está utilizando un puerto

Por ejemplo, para comprobar qué proceso está utilizando el puerto 8080:

sudo lsof -i :8080

También puede utilizarse:

sudo ss -ltnp | grep :8080

Cambiar permisos de un archivo o carpeta

Para modificar los permisos de un archivo:

chmod 755 archivo

Para otorgar permiso de ejecución:

chmod +x archivo

Por ejemplo, para el Maven Wrapper:

chmod +x mvnw

Para modificar permisos de forma recursiva sobre una carpeta:

chmod -R 755 carpeta

Reiniciar un servicio

Si la aplicación estuviera registrada como un servicio de systemd:

sudo systemctl restart gestion-pacientes-api

Para comprobar posteriormente su estado:

sudo systemctl status gestion-pacientes-api

Si la aplicación se encuentra ejecutándose mediante Docker, se puede reiniciar un contenedor con:

docker restart <nombre_o_id_del_contenedor>

También se pueden reiniciar los servicios definidos en Docker Compose:

docker compose restart

9. Organización del backend

El backend utiliza una estructura por capas para separar responsabilidades:

Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL

Además, el proyecto cuenta con componentes separados para:

Configuración.

Validaciones.

Manejo global de excepciones.

Acceso a datos.

Lógica de negocio.

10. Organización del frontend

El frontend separa las responsabilidades principales en:

Páginas.

Componentes.

Servicios para la comunicación con la API.

Archivos de estilos.

Las solicitudes HTTP hacia el backend se encuentran centralizadas en un servicio dedicado.

-Autor
Carlos López

Prueba Técnica - Práctica Profesional Desarrollo Backend
RIACS Chile
