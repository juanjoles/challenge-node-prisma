CHALLENGE NODE.JS - EXPRESS - PRISMA - MYSQL

##Para instalar paquetes necesarios.

npm install

##Correr migracion.

npm run migrate

##Para iniciar

npm run start

------ MENUS ------
    1- menus/add/ (POST)
    2- menus/delete/<id> (DELETE)
    3- menus/update/<id> (PUT)
    4- menus/<id> (GET)
    6- menus/all/ (GET): Obtiene todo el listado de menus cargados

------ USERS ------
    1- users/add/ (POST)
    2- users/delete/<id> (DELETE)
    3- users/update/<id> (PUT)
    4- users/<id> (GET)
    5- users/<id>/menus (GET): : Obtiene todos los menus asignados a usuario (de manera recursiva).
    6- users/all/ (GET): Obtiene todo el listado de usuarios cargados.