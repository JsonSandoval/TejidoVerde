const mongoose = require('mongoose');
const validator = require('validator');
require('../mongoose');


const reportSchema = mongoose.Schema({
  receptorID:{
    type: String,
    require: true,
    trim: true, 
    unique: true
  },
  emailReceptor:{
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('correo no valido');
    }
  },
  documentID:{
    type: String,
    require: true,
    trim: true,
  },
  dateReception:{
    type: String,
    require: true,
    trim: true,
  },
  supplierID:{
    type: String,
    require: true,
    trim: true,
  },
  emailSupplier:{
    type: String,
    require: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('correo no valido');
    }
  },
  validateElementXML:[{
    name:{
      type: String,
      require: true,
      trim: true,
    },
    value:{
      type: String,
      require: true,
      trim: true,
    },
    codeError:{
      type: String,
      require: true,
      trim: true,
    },
    descriptionError:{
      type: String,
      require: true,
      trim: true,
    }
  }],
  statusDocument:{
    type: String,
    require: true,
    trim: true,
  }
});

const Report = mongoose.model('readings', reportSchema)//relaciona la coleccion de la base de datos con el esquema creado

module.exports = Report;
