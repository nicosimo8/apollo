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

Ahora solo resta usar los comando ya prearmados vas a poder ver por consola cada paso que se esté ejecutando encerrado por asteriscos (*):

```bash
# Actualización del OS de la RaspBerry, Descarga, instalación y Permisos de/para Docker y permisos de Booteo para Apolo y Test de LEDS
sh app-install.sh

# Actualizaciones del repositorio, reinicio de los contenedores y permisos
sh app-update.sh

# Eliminar Archivos innecesarios del repositorio
sh app-mess.sh

```

Y por último colocar el archivo de licencia previamente generado al mismo nivel de la carpeta **/apollo** utilizando un programa como el **WinSCP** o similar.

## 2. Funcionamiento

Esta aplicación tiene dos formas de uso, vía **entorno gráfico** o **API**.

Entorno gráfico
-
Para su uso en **entorno gráfico** debemos acceder desde cualquier navegador conectado a la red local donde se instaló el equipo, se recomienda el uso de Chrome, y escribir la dirección local usada al momento del formateo del OS seguida del puerto 3000 que es el puerto que ocupa la aplicación dentro de la raspberry.

Ej: http://apolo.local:3000/

Esta app tiene cuatro rutas creadas para acceder y usar:
* Ingreso -> http://apolo.local:3000/pages/login
* Principal -> http://apolo.local:3000/pages/main
* Configuración -> http://apolo.local:3000/pages/config
* [Licencia](http://apolo.local:3000/pages/licence) -> http://apolo.local:3000/pages/licence

### Ingreso
Empezando por la [Ingreso](http://apolo.local:3000/pages/login), en esta sección podemos observar un titular dentro de la franja amarillenta con el logo de **APOLO** seguido de un recuadro blanco con dos casillas para ingresar "usuario" y "contraseña", un checkmark para recordar los datos y un botón de login y finalmente la firma de la empresa ***Argos Casilda S.A.S.™***.

## 3. Licencia

Este producto cuenta con una licencia por tiempo limitado, en caso de necesitar una nueva licencia comunicarse con el proveedor ***Argos Casilda S.A.S.™*** o referentes.

Al momento de expirar la licencia, el equipo ya no será accesible para su uso en lectura o vía API.

[Ir hacia arriba](#apolo)