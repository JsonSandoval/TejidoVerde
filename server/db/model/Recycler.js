const mongoose = require('mongoose');
const validator = require('validator');
require('../mongoose');
const RecyclerSchema = mongoose.Schema({//creación de esquema


    TypeID: {
        type: String,  //guarda como String y espera un String para consultar
        require: true, //requerido para realizar un insert 
        trim: true     //hace trim() antes de guardar
    },
    ID: {
        type: String,  //guarda como String y espera un String para consultar
        require: true, //requerido para realizar un insert 
        trim: true,      //hace trim() antes de guardar
        unique: true
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    secondName: {
        type: String,
        require: true,
        trim: true,
    },
    surname: {
        type: String,
        require: true,
        trim: true,
    },
    secondSurname: {
        type: String,
        require: true,
        trim: true,
    },
    phone: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true, //el valor es unico en la colección
        lowercase: true, //TO DO Agregar validación al correo 
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('correo no valido');
        }
    },
    numberPlate: {
        type: String,
        //require: true,
        trim: true
    },
    typeVehicle: {
        type: String,
        //require: true,
        trim: true
    },
    route: {
        type: String,
        // require: true,
        trim: true,
        //unique: true
    }
});
//Define el esquema mongoose con relación a la colección de MongoDB
const Recycler = mongoose.model('Recyclers', RecyclerSchema)//relaciona la coleccion de la base de datos con el esquema creado

module.exports = Recycler;
