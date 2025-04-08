# rest-api

[code challenge repo](https://github.com/AleSotoNubi/challenge-node-sr)

### Tareas

| Status | Tarea |
| :---:  | :--   |
|&#10004;| un repositorio con codigo del challenge (publico) |
|        | un readme detallado con las instrucciones para ejecutarlo |
|&#10004;| Un endpoint para ver todos los usuarios |
|&#10004;| Un endpoint para crear un nuevo usuario |
|&#10004;| Un endpoint para eliminar un usuario |
|&#10004;| Un endpoint para modificar un usuario |
|&#10004;| Utilizar en cada endpoint una forma diferente de manejo de asincronismo (callbacks, promises, async/await) |
|&#10004;| Usar typescript |
|&rarr;  | Que soporte QueryParams como: |
|&#10004;| &ensp;&ensp;&ensp; - pagination: ?page=2&limit=5 |
|&rarr;  | &ensp;&ensp;&ensp; - sorting: ?sortBy=email&sortDirection=ascending |
|        | &ensp;&ensp;&ensp; - matching: ?match[email]=jdoe@example.com |
|        | Seguridad (proteger los endpoints contra uso no autorizado, implementando algun mecanismo de validacion de acceso a los mismos) |
|&#10004;| Test Unitarios |
|        | Dockerfile y docker-compose que permita levantar la API ejecutando "docker-compose up" con todo lo necesario. |
|        | Collection de postman o equivalente para probar todos los endpoints |


### Puntos a tener en cuenta

- Enfoque general para el desarrollo de API, como esten divividas las responsabilidades en el diseño.
- Estilo de código, claridad y consistencia. Corrección lógica.
- Simplicidad de la implementación.
- Buenas prácticas en el uso de docker.
- Correcto uso de dependencias npm.
- Flexibilidad de la solucion propuesta.
