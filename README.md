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
   git clone url_de_este_repo
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

## TO-DO (Rúbrica)

- [ ] **Manejo de Objetos JSON:** Se implementa correctamente un objeto JSON con los datos de los doctores, incluyendo objetos anidados y uso de destructuring. La información se muestra correctamente en la consola y en la interfaz web.
- [ ] **Operaciones con JSON:** Las operaciones de clonación, merge, y recorrido se implementan correctamente. La conversión a JSON string con stringify se muestra en la consola.
- [ ] **Implementación de Estructuras de Datos:** Se implementan correctamente las estructuras de datos solicitadas (arreglos, pilas y colas) y se realizan operaciones básicas como agregar, eliminar o buscar datos en los arreglos. Las pilas y colas gestionan correctament e los datos de citas o pacientes.
- [ ] **Programación de Algoritmos:** Se implementa correctamente un algoritmo de búsqueda y uno de ordenamiento, explicando en el README la complejidad de los algoritmos aplicados (Big-O y complejidad ciclomática).
