# Página - Hospital Top Top Top

## Descripción:

Propuesta de página web para el **"Hospital Top Top Top"**. En esta nueva versión se integró `JavaScript` para mejorar la interacción con el usuario y gestionar mejor la información del equipo médico. El sitio consta de 3 vistas:

- **Inicio**: Muestra mensaje de bienvenida, información general y testimonio de pacientes.
- **Equipo Medico**: Muestra información sobre el compromiso de atencion a los pacientes y sobre el equipo médico. Tiene un chekbox para filtrar a los médicos que atiende por fonasa.
- **Contacto**: Contiene un formulario de contacto para comunicarse con el hospital.

En todas las pantallas Hay un boton para agendar Hora, el cual solicita datos mediante prompts.

## Instrucciones:

1. Descargar el contenido de este repositorio en el computador. Puede ser clonando el repositorio o descargando el .zip:

   - **Clonar el repositorio**: Puede hacerlo con cualquier gestor de repositorios. Si tiene git instalado, puede abrir una terminal en algun diretorio y ejecutar:

   ```bash
   git clone https://github.com/mr-pineda/Evaluacion_M2-Ejercicio_Practico_2
   ```

   - Si no tiene git instalado puede presionar el botón verde `<> Code` que está en esta página y seleccionar la opción `Download ZIP`.
     1. Descargue el archivo .zip en algun directorio conocido _(ej: Escritorio, Documentos, etc.)_.
     2. Descomprima el archivo .zip

2. Dentro de la carpeta, abrir el archivo `index.html` con su navegador de preferencia.

## Estructura de carpetas y archivos

- Los archivos .html estan en la raíz del directorio.
- En el directiorio `assets` se encuentran archivos multimedia y de estilos utilizados en el sitio.
  - `./assets/img` contiene las imágenes utilizadas en el sitio.
  - `./assets/css` contiene los archivos de estilo (Usando archivos sass).
  - `./lib/*` Contiene librerías utilizadas (En este caso solo Bootstrap).
  - `./scripts/` Contiene scripts de JS y archivos .json.

## El Event-Loop de JavaScript

JavaScript se caracterisa por ser un lenguaje asíncrono. Lo que significa que tiene la capacidad de organizar la ejecución de tareas o eventos potencialmente bloqueantes (Por ejemplo, solicitar un recurso web) en algo similar a **otra hebra de ejecución** (Se comporta similar a otra hebra, pero no es lo mismo), permitiendo que el código principal se siga ejecutando sin interrupciones. Esta capacidad asíncrona de JavaScript se debe la estructura Event-Loop.

El Event Loop consta de la interacción de 3 elementos: El `CallStack`, el `TaskQueue` y el `Heap`.

- **CallStack**: En Javascript las llamadas a funcion se organizan en pilas (Por lo tanto tienen un modelo de acceso tipo LIFO). En el caso de haber una serie de funciones anidadas o callbacks estas ingresan al stack desde la función más externa a la más interna y se resuelven primero desde las funciones internas a la funcion externa.
- **Heap**: Corresponde a una gran seccion de memoria en la cual se almacenan los objetos. Este almacenamiento normalmente no tiene una estructura definida.
- **TaskQueue**: Un motor de ejecución JavaScript maneja mensajes o tareas (procesos asíncronos) en una cola (Por lo tanto tienen un modelo de acceso tipo FIFO). Esto no es algo propio del lenguaje JavaScript, sino lo provee el motor de ejecución. En el caso del motor V8 (usado en Chrome), estos mensajes son gestionados a través las WebApis. Cuando una tarea se agrega a la cola, esta inmediatamente trata de ser resuelta por el motor de JavaScript, cuando la tarea está resuelta se añade al `CallStack` solo si este no tiene funciones en la pila y es ejecutada como cualquier otra funcion. Esto evita procesos bloqueantes, por lo que si una tarea asíncrona pudiese demorar, esta tarea no entra al Stack principal hasta estar resuelta.

## Scope de JavaScript

Gracias a los estándares más recientes de ECMASCRIPT se definieron las variables `let` y `const`. En los script utilizados en esta página se utiliza let para definir variables (valores que pueden ser modificados) en los prompts para ingresar datos, de manera que si un usuario ingresa mal un dato, se pueda asignar otro valor a la misma variable. `let` tiene un scope (alcance) de bloque, por lo que si se define dentro de un un bloque(zona delimitada entre par de llaves `{ }`) esta variable solo será valida detro de esas llaves.

Por otra parte, se utiliza const para definir elementos una única vez, en este caso se utilizaron para definir objetos DOM. Estos se consideran constantes porque a pesar de modificar sus propiedades el objeto sigue siendo el mismo, es decir, no puedo asignar otro valor o incluso otro objeto a una constante en la cual ya se asigno un objeto. Igual que el let, `const` tiene un alcance de bloque, por lo que es válido solo dentro del bloque que es llamado.

Ejemplo de alcance:

```javascript
let a = 1; //Esta es una variable global

function alpha(value) {
  // value solo existe en esta funcion
  a = value + 10; // se puede modificar la variable global

  const b = { x: 1, y: 2 }; // b es un objeto que solo existe en esta funcion
  // b = {z: 3};  // Esta operación no está permitida (reasignar el valor de una constante)

  b.x = 4; // Sí se puede modificar las propiedades de b
  b.y = 'two'; // Las propiedades son de tipado dinámico, asi que se puede reasignar un tipo de dato diferente al original.

  return a + b.x;
}

// b no existe aqui. Esta fuera del scope de la funcion.
```

## Manejo de Errores

Se espera que el archivo doctors.json contenga un arreglo de datos de doctores con la siguiente estructura: _(Para visualizar con coloración se utilizará sintaxis de typescript)_

```typescript
type doctorList {
    name: string; // Nombre del Doctor
    job: string; // Trabajo o especialidad
    profile: string; // Perfil o biografia del doctor
    fonasa: boolean; // Indica si atiende o no por fonasa
    img: string; // Ruta local hacia el archivo de imagen del doctor
    alt: string; // Texto alternativo en caso de no cargar la imagen
  }[]
```

Se podría dar el caso de que se cargara un archivo que no cumpla con la estructura esperada, por consecuencia se intente leer una propiedad inexistente, generando errores.

Por ello, se utilizó un bloque `try/catch` para controlar posibles errores en la carga de datos del archivo de doctores (En el archivo [doctorLoad.js](./scripts/doctorLoad.js)), de forma que si existe algun error, independiente de la causa, se muestre un mensaje al usuario indicando que no se pudo cargar el contenido de la página.

Para testear la función que carga la lista de doctores de utilizaron las herramientas de desarrollo del navegador. Se crearon breakpoints en distintos puntos de interés, siendo el más interesante de observar el punto donde se añaden médicos a la lista.

```javascript
// Codigo previo

// Se agrega un nuevo doctor a la lista
listContainer.appendChild(createDoctorCard(doctor));

// Código posterior
```

Al haber un breakpoint en esta sección, se observa como se añaden doctores en la lista uno por uno, permitiendo detectar si el dato de algún doctor en concreto generá problemas.

## TO-DO (Rúbrica)

- [x] **Manejo del Entorno de Ejecución y Consola:** El entorno de ejecución está correctamente configurado, y se usa console.log() de manera efectiva para mostrar mensajes y depurar el código. La estructura del programa está bien organizada y el event loop se explica claramente en el README.
- [x] **Manejo de Variables, Operadores y Prompt:** El prompt solicita correctamente la información del usuario y los datos se muestran tanto en la consola como en una alerta. Las variables se manejan con let y const, y los operadores se utilizan adecuadamente para validar los datos ingresados. El scope de las variables se explica claramente en el README.
- [x] **Ciclos e Iteraciones: Uso en la Interfaz:** Se implementa correctamente un ciclo que manipula el DOM dinámicamente. Los condicionales dentro del ciclo funcionan adecuadamente para mostrar elementos según los criterios establecidos(por ejemplo, filtrar doctores o servicios).
- [x] **Manejo de Errores con try/catch y Debugging:** Se implementa correctamente un bloque try/catch para manejar errores y el uso del debugger es adecuado. La explicación del uso de estas herramientas en el README es clara y detallada.
