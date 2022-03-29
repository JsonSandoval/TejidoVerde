//Define el esquema o Modelo de datos de una coleccion
const mongoose = require('mongoose');
const validator = require('validator');
const bycripjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../mongoose');

//Definir el esquema a partir de los campos de la colección
const userSchema = mongoose.Schema({//creación de esquema

  user: {
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
    trim: true,
  },
  ID: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  tokens: [
    {
      token:{
      type: String,
      require: true
    }
    
  }]
});

userSchema.pre('save', async function (next) {//antes de guardar debe realizar la siguiente funcion
  //this hace referencia la objecto que tiene los datos
  if (this.isModified('password')) {
    this.password = await bycripjs.hash(this.password, 8);
  }
  next();
})

userSchema.statics.checkCredentials = async (email, password) => {//Consulta credenciales de acceso
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Erro al iniciar sesión');
  }
  const isCorrect = await bycripjs.compare(password, user.password);
  if (!isCorrect) {
    throw new Error('Erro al iniciar sesión');
  }
  return user;
};



userSchema.methods.generateToken = async function () {
  const currentUser = this;
  const token = jwt.sign({ _id: currentUser._id.toString() }, "claveTemporal");
  currentUser.tokens = currentUser.tokens.concat({token});
  await currentUser.save();
  console.log(token);
  return token;
}

userSchema.methods.toJSON= function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
}

//Define el esquema mongoose con relación a la colección de MongoDB
const User = mongoose.model('usuarios', userSchema)//relaciona la coleccion de la base de datos con el esquema creado

module.exports = User;


//const newUser = new User({user: 'jfsandoval', email: 'jeison@gmail.com', firstName: 'Jeison', lastName: 'Sandoval', phone: '3209048264', company: 'CADENA S.A', ID: "1047455473", password: "123456789"})

//Promesas
//newUser.save().then(result => {
  //console.log(result);
//}).catch(err =>{
  //console.log(err)
//});
