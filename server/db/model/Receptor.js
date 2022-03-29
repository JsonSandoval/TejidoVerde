const mongoose = require('mongoose');
const validator = require('validator');
require('../mongoose');
const receptorSchema = mongoose.Schema({//creación de esquema

  ID: {
    type: String,  //guarda como String y espera un String para consultar
    require: true, //requerido para realizar un insert 
    trim: true,      //hace trim() antes de guardar
    unique: true
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
  
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  phone: {
    type: String,
    require: true,
    trim: true,
  },
  company: {
    type: String,
    require: true,
    trim: true
  },
    suppliers:[{
    
      ID: {
       
        type: String,
        //require: true,
        trim: true,
        unique: true,
      },
      company: {
        type: String,
        //require: true,
        trim: true
      },
      email: {
        type: String,
       // require: true,
        trim: true,
        //unique: true, //el valor es unico en la colección
        lowercase: true, //TO DO Agregar validación al correo 
        validate(value) {
          if (!validator.isEmail(value))
            throw new Error('correo no valido');
        }
      },
      elementsValidateXml:[{
        
        name:{
          type: String,
          trim: true,
         // unique: true
        },
        value:{
          type: String,
          trim: true
        }
      }]
    }],
    accessEmail:[{
      email:{
        type: String,
       // require: true,
        trim: true,
       //unique: true
      },
      password:{
        type: String,
        //require: true,
        trim: true
      },
      serverImap:{
        type: String,
        //require: true,
        trim: true
      },
      folderToRead:{
        type: String,
        //require: true,
        trim: true
      }
    }]
  
});
//Define el esquema mongoose con relación a la colección de MongoDB
const Receptor = mongoose.model('receptores', receptorSchema)//relaciona la coleccion de la base de datos con el esquema creado

module.exports = Receptor;
