# rest-api

## <div id="run-service" /> Levantar el servicio

#### Prerequisitos

Tener instalado **docker** y **docker compose** (plugin).

#### Buildear la app

```shell
# install deps
npm ci
# build the app
npm run build
```

#### Crear la imagen docker

```shell
npm run docker:build
```

Eso debería generar la imagen docker `rest-api:latest`.

```shell
docker images rest-api:latest
```

#### Puerto

Por defecto la Api escucha en el puero 80. Esto se puede cambiar editando la variable de entorno `LOCAL_API_PORT` dentro del archivo `.env` (no provisto). Por ejemplo si queremos usar el puerto 8088.

```shell
# .env file
LOCAL_API_PORT=8088
```

#### <div id="run-service-docker-compose-up" /> Levantar la api con docker compose

```shell
docker compose up -d
```

Se puede observar el container corriendo con

```shell
docker compose ps
```

#### Comprobar la Api funcionando

Se puede probar la Api llamando a alguno de sus endpoints. Por ejemplo el GET /users.

```shell
curl -H 'Authorization: validToken' -X GET "http://localhost/users"
```

*Si se eligió un puerto diferente al 80, debemos agregar ese puerto en la url. Por ejemplo para el puerto 8088 la url sería `http://localhost:8088/users`.*

#### Bajar la api

```shell
docker compose down
```

#### Borrar la imagen (opcional)

```shell
docker images rm rest-api:latest
```

## Uso de la Api

*Nota: Para usar la api, seguir los pasos descriptos en **[Levantar el servicio](#run-service)** hasta la parte de **[Levantar la api con docker compose](#run-service-docker-compose-up)** inclusive.*

*Nota: Los ejemplos se muestran suponiendo que la Api corre en el puerto por defecto 80.*

*Nota: La Api cuenta con un (muy simple) método de autorización. En cada consulta se debe agregar el header `Authorization` con el valor `validToken`.*

Para probar y usar la Api, dentro de la carpeta `docs/` se encuentra la colección de postman `RestApi.postman_collection.json` con las siguientes requests:

- `GET /users`
- `GET /users (paginated)`
- `GET /users (sorted)`
- `GET /users (filtered)`
- `GET /users (paginated/sorted/filtered)`
- `GET /users (Unauthorized)`
- `GET (NotFound)`
- `POST /users`
- `PUT /users/{id}`
- `DELETE /users/{id}`

Importar la colección dentro de Postman (o similar) y ejecutar las requests.


## Tests

#### Instalar las dependencias

```shell
npm ci
```

#### Correr los tests

```shell
npm test
```


# Challenge

[code challenge repo](https://github.com/AleSotoNubi/challenge-node-sr)

## Tareas

| Status | Tarea |
| :---:  | :--   |
|&#10004;| Un repositorio con codigo del challenge (publico) |
|&#10004;| Un readme detallado con las instrucciones para ejecutarlo |
|&#10004;| Un endpoint para ver todos los usuarios |
|&#10004;| Un endpoint para crear un nuevo usuario |
|&#10004;| Un endpoint para eliminar un usuario |
|&#10004;| Un endpoint para modificar un usuario |
|&#10004;| Utilizar en cada endpoint una forma diferente de manejo de asincronismo (callbacks, promises, async/await) |
|&#10004;| Usar typescript |
|&#10004;| Que soporte QueryParams como: |
|&#10004;| &ensp;&ensp;&ensp; - pagination: ?page=2&limit=5 |
|&#10004;| &ensp;&ensp;&ensp; - sorting: ?sortBy=email&sortDirection=ascending |
|&#10004;| &ensp;&ensp;&ensp; - matching: ?match[email]=jdoe@example.com |
|&#10004;| Seguridad (proteger los endpoints contra uso no autorizado, implementando algun mecanismo de validacion de acceso a los mismos) |
|&#10004;| Test Unitarios |
|&#10004;| Dockerfile y docker-compose que permita levantar la API ejecutando "docker-compose up" con todo lo necesario. |
|&#10004;| Collection de postman o equivalente para probar todos los endpoints |


## Puntos a tener en cuenta

- Enfoque general para el desarrollo de API, como esten divividas las responsabilidades en el diseño.
- Estilo de código, claridad y consistencia. Corrección lógica.
- Simplicidad de la implementación.
- Buenas prácticas en el uso de docker.
- Correcto uso de dependencias npm.
- Flexibilidad de la solucion propuesta.


## TODO

- ~~Agregar el manejo para los 404 de las rutas no encontradas~~
- ~~Manejar el PUT /users/id-que-no-existe: esta dando 500 internal error en lugar de not found~~
- ~~En el DELETE /users/id-que-no-existe deberíamos dar error diciendo que el user no existe, en lugar de dar un OK~~
- Probar los pasos de este README en otra compu y ver que todo funcione ok (ver si la versión de node jode y ponerla como requisito)
- (?) Probar un método de autenticación más *tradicional*, pero simple como Basic Auth
- (?) Hacer la prueba de montar un volumen como storage
