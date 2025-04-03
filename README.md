# rest-api

[code challenge repo](https://github.com/AleSotoNubi/challenge-node-sr)

| status | task |
| :---:  | :--  |
|&#10004;| un repositorio con codigo del challenge (publico) |
|        | un readme detallado con las instrucciones para ejecutarlo |
|&#10004;| Un endpoint para ver todos los usuarios |
| ->     | Un endpoint para crear un nuevo usuario |
|        | Un endpoint para eliminar un usuario |
|        | Un endpoint para modificar un usuario |
|        | Utilizar en cada endpoint una forma diferente de manejo de asincronismo (callbacks, promises, async/await) |
|&#10004;| Usar typescript |
|        | Que soporte QueryParams como: |
|        | &ensp;&ensp;&ensp; - pagination: ?page=2&limit=5 |
|        | &ensp;&ensp;&ensp; - sorting: ?sortBy=email&sortDirection=ascending |
|        | &ensp;&ensp;&ensp; - matching: ?match[email]=jdoe@example.com |
|        | Seguridad (proteger los endpoints contra uso no autorizado, implementando algun mecanismo de validacion de acceso a los mismos) |
|&#10004;| Test Unitarios |
|        | Dockerfile y docker-compose que permita levantar la API ejecutando "docker-compose up" con todo lo necesario. |
|        | Collection de postman o equivalente para probar todos los endpoints |
