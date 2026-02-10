# APOLO

Esto es una guía para el uso básico y puesta en funcionamiento del sistema APOLO.

## Index

1. [Instalación del sistema](#1-intalación-del-sistema)
2. [Funcionamiento](#2-funcionamiento)
3. [Licencia](#3-licencia)

## 1. Intalación del sistema

_Aclaración: "este programa fue creado para su uso en una versión **Pi3+** con un OS **legacy lite 64bits sin entorno gráfico**, no fue testeado en otro entorno._"

Teniendo una **Raspberry Pi 3+** y una tarjeta **microSD** ya formateada con el OS correspondiente (En este caso se usa **Legacy lite 64bits sin entorno gráfico**), proceder a conectarla a la red local en la que se va a dar uso, ya sea por cable ethernet o wifi.

Una vez conectada iniciar una nueva instancia de **_Consola de Mando_** o **_CMD_** en otro equipo conectado en la misma red que la **Raspberry Pi**.

Vamos a conectarnos al equipo usando el comando **ssh usuario@ip**
```bash
# ssh es la keyword para conectar remotamente la sesión actual con el equipo
# usuario es el nombre de usuario que se le dió al OS al momento de formatearlo
# ip es el nombre asignado como parte de la ip que se le dió al OS al momento de formatearlo

# ejemplo:
ssh argos@pi

# ahora va a pedir la confirmación el usuario Argos pidiendo una contraseña, la misma se asignó al momento de formatear el OS

# ejemplo:
123
```
<!-- # Mauro, si estás leyendo este instructivo cabeza de borbolecaco en este caso es Argos@apolo -->

Si es la primera vez que el equipo utilizado se va conectar a la raspberry va a consultar por la firma, en este caso se responde "yes"

Si no es la primera vez y se cambió la firma por algún formateo hay que borrar la firma ssh dentro del usuario en el equipo.

Para usuarios de Windows suele estar en "C:/Users/[Usuario]/.shh" oculto

Una vez ingresado dentro del equipo por la consola vamos a actualizarla para poder usar todas las funciones disponibles:

```bash
sudo apt update
```

Cuando se haya actualizado vamos a instalar **Git** y mejorar el sistema para poder clonar el repositorio donde se encuentra guardada la aplicación:

```bash
yes | sudo apt install git
yes | sudo apt upgrade
```

Al tener disponible **Git** clonamos el repositorio correspondiente:
```bash
git clone https://github.com/nicosimo8/apollo.git

# Y nos dirigimos hacia la carpeta clonada

cd apollo/
```

Colocar el archivo de licencia previamente generado al mismo nivel de la carpeta **/apollo** utilizando un programa como el **WinSCP** o similar.

Con el mismo programa abrir el archivo app-create.sh, o reemplazar con uno ya editado, y editar las siguientes variables de entorno:

```bash
# Cambiar EDITAR por los datos correspondientes
-e USERNAME_ONE=EDITAR \
-e USERNAME_TWO=EDITAR \
-e USERNAME_THREE=EDITAR \
-e PASSWORD_ONE=EDITAR \
-e PASSWORD_TWO=EDITAR \
-e PASSWORD_THREE=EDITAR \
-e CUSTOMER_NAME=EDITAR \
-e NEXT_API_SECRET_KEY=EDITAR \
-e NEXT_SECRET_KEY=EDITAR \
-e NEXT_SERIAL=EDITAR \
-e NEXT_PUBLIC_API_KEY=EDITAR \
```

Ahora solo resta usar los comando ya prearmados vas a poder ver por consola cada paso que se esté ejecutando encerrado por asteriscos (*):

```bash
# Actualización del OS de la RaspBerry, Descarga, instalación y Permisos de/para Docker y permisos de Booteo para Apolo y Test de LEDS
sh app-install.sh

# Actualizaciones del repositorio, reinicio de los contenedores y permisos
sh app-update.sh

# Eliminar Archivos innecesarios del repositorio
sh app-mess.sh

# Esperar uno o dos minutos e ingresar a la base de datos
sudo docker exec -it apolodb mysql -uargos -pargos
```

Dentro del script de MySQL> copiar y pegar, o escribir manualmente lo siguiente y luego darle Enter:

```SQL
CREATE DATABASE IF NOT EXISTS argosapolodb;

USE argosapolodb;

CREATE TABLE configs (
  id INT NOT NULL UNIQUE,
  lightsQuantity INT NOT NULL DEFAULT 4,
  lightsMode INT NOT NULL DEFAULT 8,
  PRIMARY KEY (id)
);

CREATE TABLE lights (
	id INT NOT NULL UNIQUE,
	lightName VARCHAR(25) NOT NULL DEFAULT 'Semáforo',
	lightsNumber INT NOT NULL DEFAULT 2,
	light1 BOOLEAN DEFAULT false,
	light2 BOOLEAN DEFAULT false,
    avaible BOOLEAN DEFAULT true,
	PRIMARY KEY (id)
);

INSERT INTO configs (
	id
)
VALUES (
	0
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	0,
    'Semáforo 1'
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	1,
    'Semáforo 2'
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	2,
    'Semáforo 3'
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	3,
    'Semáforo 4'
);
```


## 2. Funcionamiento

Esta aplicación tiene dos formas de uso, vía **entorno gráfico** o **API**.

Entorno gráfico
-
Para su uso en **entorno gráfico** debemos acceder desde cualquier navegador conectado a la red local donde se instaló el equipo, se recomienda el uso de Chrome, y escribir la dirección local usada al momento del formateo del OS seguida del puerto 3000 que es el puerto que ocupa la aplicación dentro de la raspberry.

Ej: http://apolo.local:3000/

Esta app tiene tres rutas creadas para acceder y usar:
* Ingreso -> http://apolo.local:3000/pages/login
* Principal -> http://apolo.local:3000/pages/main
* Configuración -> http://apolo.local:3000/pages/config

### Ingreso
Empezando por la [Ingreso](http://apolo.local:3000/pages/login), en esta sección podemos observar un titular dentro de la franja amarillenta con el logo de **APOLO** seguido de un recuadro blanco con dos casillas para ingresar "usuario" y "contraseña", un checkmark para recordar los datos y un botón de login. Finalmente la firma de la empresa ***Argos Casilda S.A.S.™***.

Antes de poder operar con la aplicación el usuario tiene que acceder mediante el uso de credenciales, una vez ingresado se redirecionará a la página [principal](http://apolo.local:3000/pages/main).

### Principal
La siguiente ventana, [principal](http://apolo.local:3000/pages/main), es donde se muestran los botones que simulan las luces de los semáforos.

Presionar uno de los botones intentará enviar una señal al semaforo correspondiente conectado al sistema, este indicará si el mismo está encendido o apagado mediante su color opaco o radiante.

**Apolo** cuenta con la capacidad de manejar un total de ocho señales ***diferentes***.

### Configuración
Por último la ventana de [Configuración](http://apolo.local:3000/pages/config) muentra la cantidad de semaforos y sus respectivos modos.

La cantidad de semaforos mostrará esa misma cantidad de recuadros para configurar, la otra está en desarrollo por ahora.

Cada recuadro tiene la opción de cambiar
- El nombre de cada semáforo
- La cantidad de luces (por ahora hasta ***dos***)
- El modo (*En desarrollo*)
- Si está Habilitado

API
-
Las rutas disponibles para la ruta de esta aplicación son las siguientes:

Para cada una se indica desde  http://apolo.local:3000/api/[versión]/ y tiene un ***header*** con ***authorization***.

```html
<!--HTML peticiones por REST Client-->
Authorization: Bearer <key>
```
```js
// JS Como objeto dentro de un fetch
headers: {
  'Content-Type': 'application/json',
  'authorization': `Bearer ${key}`
}
```

- configs/config [disponibles: GET, PUT]
  * PUT body
  ```json
    {
      "lightsQuantity": "",
      "lightsMode": "",
      "lights": [ x4
        {
          "lightName": "",
          "lightsNumber": "",
          "light1": "",
          "light2": "",
          "avaible": "",
          "lightsMode": ""
        }
      ]
    }
  ```
- configs/lights [disponibles: GET]
- configs/lights/[light] [disponibles: GET, PUT]
  * GET param (Un número, indica el semáforo, suele ser 1 a 4)
  * PUT body
  ```json
  {
    "lightName": "",
    "lightsNumber": "",
    "light1": "",
    "light2": "",
    "avaible": "",
    "lightsMode": ""
  }
  ```
- licence [disponibles: GET, POST]
  * GET header (Autorización)
  * POST body
  ```json
  {
    "newLic": "key"
  }
  ```
- lights [disponibles: GET, POST]
  * GET header (Autorización)
  * POST body
  ```json
  {
    "led": "",
    "onoff": ""
  }
  ```
- login [disponibles: POST]
  * POST body
  ```json
  {
    "username": "",
    "password": ""
  }
- time [obsoleto]


## 3. Licencia

Este producto cuenta con una licencia por tiempo limitado, en caso de necesitar una nueva licencia comunicarse con el proveedor ***Argos Casilda S.A.S.™*** o referentes.

Al momento de expirar la licencia, el equipo ya no será accesible para su uso en lectura o vía API.

[Ir hacia arriba](#apolo)