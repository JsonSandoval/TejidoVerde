const express = require('express');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const UserController = require('../../controllers/UserController')


//Llama Middlewares
const auth = require('../../midlewares/auth');
const { route } = require('../views-routes/DashboardRouter');

async function addUser(req, res) {
  try {
    const { user, email, firstName, lastName, phone, company, ID, password } = req.body;
    const response = await UserController.addUser(user, email, firstName, lastName, phone, company, ID, password);
    if (response.err) {
      return res.status(500).send(response);
    }
    return res.status(200).send(response);
  } catch (err) {
    console.log('Error en UserAPI :: addUser ::', err)
    return res.status(500).send({ err: 'Error inesperado' })
  }

}

async function getUsers(req, res) {
  const response = await UserController.getUsers();
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

async function validateUser(req, res) {
  try {
    const { email, password } = req.body;//Parametros de la petición
    const response = await UserController.validateUser(email, password);
    if (response.error) {
      return res.status(500).send(response);
    }
    return res.status(200).send(response);
  } catch (error) {
  }
}



router.post('/api/users/add', addUser);
router.post('/api/login', validateUser);
router.get('/api/users', auth , getUsers); // auth => Si el usuario no llega autorizado no ejecuta el metodo getUsers
//router.get('/api/receptors', auth, getReceptors);


module.exports = router;
