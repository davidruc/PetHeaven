***PROYECTO Node.JS:***

# Petopia: A Slice of Pet Heaven

Petopia es un proyecto que busca darle solución a una funeraria que tiene el servicio de velar a una mascota mediante diferentes modalidades. El proyecto estará enfocado en crear únicamente el backend y generar los endpoints de que se consideren necesarios para el momento de conectarlo con el frond end. 

## Tabla de contenido 

- [Objetivos](#objetivos)
    - [objetivo general](#objetivo-general)
    - [objetivos especificos](#objetivos-específicos)
- [Diagrama MER](#diagrama-mer-de-la-base-de-datos)
- [Instrucciones de instalacion](#instrucciones-para-la-instalación-del-proyecto)
- [base de datos](#construcción-de-la-base-de-datos)
- [Consultas específicas planteadas](#consultas-específicas-planteadas)
- [Funcionamiento y endPoints](#funcionamiento-y-endpoints)
- [Tecnologías implementadas](#tecnologías)
- [Dependencias utilizadas](#dependencias-utilizadas)



# OBJETIVOS:
## Objetivo General

Petopia tiene como objetivo general sistematizar el manejo de datos de una funeraria enfocado en todo lo referente a afiliación y velación mascotas. 

## Objetivos específicos

* Crear una base de datos SQL que permita el correcto manejo de los datos del proyecto.
* Contruir un crud para todas las tablas de la base de datos pensando en una interfaz de administrador.
* Generar endPoints que permitan realizar consultas necesarias en el proyecto. Estas consultas estarán en la sección de *Consultas*


## Diagrama MER de la base de datos:

![DiagramaER](./uml/diagramaER.png)


## Instrucciones para la instalación del proyecto:

Para la correcta instalación del proyecto siga las siguientes instrucciones: 

1. Clone el repositorio del proyecto y abra el archivo del proyecto en su editor de código. (Recomdación: utilizar Visual studio code)
2. Una vez lo tenga en forma local, abra una terminal y acceda a la ruta ./backend, de la siguiente forma: 
```bash
    cd backend
``` 
3. Una vez la terminal se encuentre en la ruta backend, implemente las dependencias que están en el package.json usando el siguiente comando:
```bash
    npm install
``` 
De esta forma verá que la carpeta "*node_modules*" y el archivo "*package-lock.json*" se crean después de contados segundos. 

4. Una vez configuradas las dependencias del proyecto y definidas las variables de entorno sigue ejecutar la base de datos.
*   En este caso está pública para facilidad de la persona que evalúa.  
    * Dirijase a la ruta ./backend/src/db, ahí encontrará el archivo llamado db.sql
    * Para ejecutar este archivo instale la extensión de visual studio code "**MySQL**". Una vez instalada la extensión va a observar en la barra lateral izquiersa un cilindro. Al darle click se abrirá la barra lateral, seleccione el botón **+** ubicado en la parte superior (*add conecction*) y se desplegará una ventana donde se va a poder configurar la extensión para crear la conexión. Por defecto toda la configuración se dirige a una conección local, daremos en el botón de guardar y por último connect.
    * Si no desea utilizar esta extensión también puede ir ejecutando el script de la base de datos desde la consola usando MySQL. 
    * El script de la base de datos está en orden, por lo que para su ejecución y para evitar problemas es recomendado que se realice en orden.

5. Para poder correr el proyecto de manera local es necesario configurar las variables de entorno. Por lo que puede dirigirse al archivo .env.example y observar la configuración del proyecto.

    * Dentro de la ruta backend cree un archivo que se llame ".env".
    * Luego de tener el archivo .env, copie y pegue la estructura que se observa en el .env.example.
    * Ingrese los datos requeridos. En el caso de manejar el proyecto local, el host sería:
            
            localhost 
    * El nombre de la base de datos es 
    
            petheaven
    
    * En el campo de MY_CONFIG ingrese un hostname y un puerto a su elección. Recuerde que por defecto el local host requiere que el host name es 

            127.0.0.1 
    * Verifique que el puerto que va a utilizar no esté en uso. Para evitar confisión mate todos los puertos que tiene abiertos en su máquina.
    * Por último la llave privada del JWT puede ser cualquier cadena de texto a su elección.

6. Cuando ya tenga la base de datos localmente se dirigirá nuevamente a la terminal que había abierto anteriormente y levantará el servidor de manera local usando el siguiente comando: 
```bash
    npm run dev
```

* En caso de que tenga problemas con la compilación del typescript despliegue una nueva terminal y ejecute el comanto *npm run tsc*.


## Construcción de la base de datos: 
Se generaró una base de datos que contiene usuarios, información de la mascota, tipo de afiliación e información del proceso en el que se encuentra el tratamiento de la mascota en el momento que fallece y se aplica el plan. A continuación se encuentra el Diagrama de la base de datos final:

 ![DiagramaBaseDeDatos](./uml/diagramaBaseDeDatos.png)

Se realizaron un par de modificaciones frente al diagrama MER en el transcurso de producción del proyecto con el objetivo de adecuar mejor la lógica de la base de datos.

## CONSULTAS específicas planteadas

En esta sección se mostrarán las consultas específicas que se proponen crear en el actual proyecto.

1. EndPoint que permita traer un usuario por su id y que muestre el nombre de todas las mascotas que tenga afiliadas con su edad y su raza.
2. EndPoint que permita traer un usuario por su id y que muestre todos sus planes, el estado del plan y cuál plan es. Además dice cuantas mascotas tiene afiliadas esta persona. 
3. EndPoint que traiga información de contacto de los usuarios que tienen su plan en mora, el endpoint va a traer el nombre de una de las mascotas y el número de contacto.
4. EndPoint que permita todo el proceso de seguimiento de una mascota de un usuario en específico. Se ingresa el id de la mascota, pero la consulta debe mostrar el nombre del dueño, el estado del plan y el plan adquirido. 
5. EndPoint que si al insertar un registro en la tabla seguimiento este es la entrega de las cenizas al usuario (en la data suministrada es el id = 6), el estado del plan del usuario se actualice automáticamente a finalizado.   

## Funcionamiento y endPoints.

**GENERACION DE TOKEN DE ACCESO**

Antes de empezar a utilizar las diferentes rutas y endPoints se debe generar un token de acceso. 

- Generación: Una vez levantado el proyecto localmente, dirijase a la herramienta que va a utilizar (recomendación: Thunder client de visual studio code). 
    * Seleccione el método get e ingrese el siguiente endPoint
    ```http
    GET /token 
    ```
- Utilización: El endPoint anterior es el que va a generar el token. Tome ese token (solo el valor, sin comillas ni corchetes) y dirijase al apartado de HEADERS, agrege el header/Autorization y en el valor ingrese el token suministrado anteriormente.

Este token tiene un limite de 1h, en ese rango de tiempo podremos acceder a las rutas y endPoints de nuestra Api. Una vez pasada esta hora será necesario generar uno nuevo.

Una vez levantado el servidor y configurados los headers podrá utilizar una herramienta como Thunder-cliente o postman para realizar y verificar los endPoints generados y explicados anteriormente.

Es recomendado también agragarle el la sección de header la configuración de content-type: application-json

**CRUD DE LAS TABLAS:**

Los siguiente endPoints corresponden a los CRUDs de cada tabla. Para estos endPoints se pueden realizar las consultas básicas, get, get by id, post, put y delete. La entrada de los datos está encriptada usando JWT y cookies. Además se cuenta con un middleware que permite la validación de los datos antes de que ingresen para evitar consumir recursos innecesarios y evitar problemas con el ingreso de la data en la base de datos.  

* ALL significa que todos los métodos HTTP pueden ser utilizados en este endPoint. 
* Todo lo que va detrás del /api/ es la configuración del hostname y port que se imprime en la consola. Ejemplo: http://"config.hostname":"config.port"/api/raza/:id? una vez configuradas mis variables de entorno podría verse así: *http://127.21.25.23:5060/api/raza/:id?*. 
* Todos los nombres para los endpoints con método post o update son tal y como se mostrarán debajo de la ruta. OJO: *hay comentarios para especificar los tipos de datos que deben mandarse, estos comentarios deben eliminarse en caso de generar conflicto con la query*.
* El parámetro id en el método get es opcional en todos los endPoints de CRUDS

* EndPoint CRUD de la Tabla especie:
    ```http
    ALL /api/especie/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "nombre_especie": "" /*varchar(25)*/
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*

* EndPoint CRUD de la Tabla raza: 
    ```http
    ALL /api/raza/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "nombre_raza": "", /*varchar(25)*/
        "fk_especie":  /*int */
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*
* EndPoint CRUD de la Tabla mascota:
    ```http
    ALL /api/mascota/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "nombre_mascota": "", /*varchar(50)*/
        "edad_mascota": , /* tinyint(2) */
        "fk_dueño": , /* int */
        "fk_raza":  /*int */
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*

* EndPoint CRUD de la Tabla usuario:
    ```http
    ALL /api/usuario/:id?
    ``` 
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "nombre_usuario": "", /*varchar(255)*/
        "telefono_contacto": , /*int*/
        "documento":  /* int */
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*
* EndPoint CRUD de la Tabla estado_plan:
    ```http
    ALL /api/estadoPlan/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "estado": "" /*varchar(15)*/
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*
* EndPoint CRUD de la Tabla tipo_afiliacion: 
    ```http
    ALL /api/afiliacion/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "plan_usuario": "" /*varchar(15)*/
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*

* EndPoint CRUD de la Tabla plan: 
    ```http
    ALL /api/plan/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "fk_estado_plan": , /*int*/
        "fk_tipo_afiliacion": , /*int*/
        "fk_usuario": /*int*/
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*
* EndPoint CRUD de la Tabla procedimiento: 
    ```http
    ALL /api/procedimiento/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "name_procedimiento": , /*varchar(50)*/
        "detalles":  /*varchar(255)*/ 
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*
* EndPoint CRUD de la Tabla seguimiento: 
    ```http
    ALL /api/seguimiento/:id?
    ```
    * Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "fk_procedimiento": , /*int*/
        "fk_mascota": , /*int*/
        "fecha_final_apreciada":  /*date*/ 
    }
    ```
    * *Antes de ingresar los datos elimine los comentarios donde se especifica el tipo de dato*.

Para realizar las diferentes consultas ir la herramienta de su elección (ya sea postMan, ThunderClient o el navegador) y seleccione el método que va a utilizar, ya sea GET, POST, PUT o UPDATE. En le put o el delete es necesario agregar el id al final del endPoint.


**EndPoints Planteados en CONSULTAS**

1. Para solucionar esta primera consulta (*traer usuarios por id y mostrar todos los perros que tiene afiliados*) se generó el siguiente endpoint: 
```http
GET /api/UsuarioMascotas/:id?
```

Si no se ingresa el id trae una lista de todas las mascotas con información de su dueño e información más detallada.

2. En este segundo endPoint se trajeron los detalles del plan, el plan y el estado de dicho plan, además trae el número de mascotas que tiene el dueño. 
```http
GET /api/infoPlan/:id?
```

Si no se ingresa el id trae una lista de todos los dueños con su respectivos planes.

3. Este tercer endPoint trae toda la información de contacto de los usuarios en los que su estado de plan está en mora o pendiente (en el caso de los datos de entrada en la base de datos son los que tienen un id_estado = 3).
```http
GET /api/usuariosMora
```

En este endPoint no se vió necesario usar middleware para la validación de datos ya que no se ingresaba ningún dato, únicamente se mostraban. 

4. Este endPoint trae un seguimiento detallado de una mascota en específico. En la data suministrada en el script de la base de datos se envía el registro completo de una sola mascota (la mascota con id = 1). Esto con dos objetivos. El primero, es dar a entender que no todas las mascotas ingresadas en la base de datos tienen un seguimiento, ya que pueden estar vivas y por lo tanto no tiene sentido tener este seguimiento. El segundo, para poder observar con mayor claridad la importancia de la información suministrada.
```http
GET /api/seguimientoMascotas/:id?
```

No es 100% necesario ingresar el id en el endPoint porque existen circunstancias donde se desea ver todo el historial de todas las mascotas y por lo tanto se deja opcional en el endPoint.

5. Para este endPoint no se generó un router nuevo, simplemente se modificó el CRUD de seguimiento, y se agregó un condicional que permite modificar automáticamente la tabla de plan al poner el último procedimiento que es la entrega de cenizas. 
```http
POST /api/seguimiento
```
* Los datos para la entrada para este endpoint son los siguiente: 
    ```json
    {
        "fk_procedimiento": , /*int*/
        "fk_mascota": , /*int*/
        "fecha_final_apreciada":  /*date*/ 
    }
    ```


*(Queda pendiente hacerle un condicional adicional que es que si la persona tiene más de una mascota este estado no se modifique).*



## Tecnologías

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="50" height="50"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50"/> 

## Dependencias utilizadas

Para el presente proyecto se van a utilizar las siguientes dependencias en sus respectivas versiones:

  ```json
    "class-transformer": "0.5.1",
    "class-validator": "0.14.0",
    "cookie-parser": "1.4.6",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "express-session": "1.17.3",
    "jose": "4.14.4",
    "mysql2": "3.5.2",
    "nodemon": "3.0.1",
    "reflect-metadata": "0.1.13",
    "typescript": "5.1.6"
  ```

  **Autor**: David Rueda // campuslands