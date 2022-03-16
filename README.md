# Mensajeria con formato ISO-8583

_Aplicación Servidor para manejo y procesamiento de transferencias electrónicas de POS a PROSA con uso de ISO-8583_

_La presente aplicación actua como intermediaria entre las terminales POS y la Banca (PROSA) para mensajeria_

_El servidor recive JSON de terminales o puntos de venta, procesa dicha data y la envia en formato ISO-8583 hacia PROSA_

### Requisitos para correr el proyecto 📋

_El presente proyecto corre con la version v14.17.1 de node_

### Instalación 🔧

```shell

npm install
```

_Primero correr servidor PROSA_

```shell

node .\src\prosa-test.js
```

_Luego correr servidor (comando para desarrollo)_

```shell

npm run dev
```

_Simular mensajes hacia Servidor desde un cliente (Terminal)_

```shell

node .\src\client-test.js
```

## Construido con 🛠️

_Herramientas usadas en el proyecto:_

* NodeJs
* JavaScript
* TypeScript
* Nodemon
* Sockets

## Wiki 📖

Puedes encontrar mucho más de cómo se usa el protocolo ISO-8583 este proyecto en [Wiki](https://es.wikipedia.org/wiki/ISO_8583)

