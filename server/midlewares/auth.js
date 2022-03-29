const jwt = require('jsonwebtoken');
//const { ModuleFilenameHelpers } = require('webpack');
const User = require('../db/model/User');


const auth = async (req, res, next) => {
  try {
    const {cookies = { }} = req;
    const tokenWrapper = (cookies.Authorization) ? cookies.Authorization : req.header('Authorization');// si puede usar la cookie, utilicela para acceder al token, de lo contrario intente con el header
    const token = tokenWrapper.replace('Bearer ', '');
    const decode = jwt.decode(token, 'claveTemporal');
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token })//valida si la sesión esta activa
    if (!user) {//Si la sesion no esta activa
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Usuario no autenticado' });

  }

};

module.exports = auth;

