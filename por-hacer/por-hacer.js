const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error("Error al guardar", err); //reject(err);
        //else
        //resolve(`BD actualizada`)
        //console.log('El archivo ha sido creado!');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB(); //este metodo carga en la variable listadoPorHacer el json

    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB(); //este metodo carga en la variable listadoPorHacer el json

    /*let ban = true;
    for (let index = 0; index < listadoPorHacer.length; index++) {
        if (listadoPorHacer[index].descripcion === descripcion) {
            listadoPorHacer.splice(index, 1);
            ban = true;
            break;
        }
    }

    if (ban) {
        guardarDB();
        return true;
    } else {
        return false;
    }*/

    /*listadoPorHacer = listadoPorHacer.filter(function(tarea) {
        return tarea.descripcion !== descripcion;
    })*/

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer === nuevoListado)
        return false;
    else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}