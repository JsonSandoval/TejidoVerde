const express = require('express');
const { Redirect } = require('react-router');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const ReceptorController = require('../../controllers/ReceptorController')


//Llama Middlewares
const auth = require('../../midlewares/auth');



async function addReceptor(req, res) {
  try {

    const body = req.body;
    const receptor = {
      ID: body.ID,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      company: body.company,
      suppliers: [{
        ID: body.supplierID,
        company: body.supplierCompany,
        email: body.supplierEmail,
        elementsValidateXml: {
          name: body.nameXML,
          value: body.valueXML
          
        }
      }],
      accessEmail: [{
        email: body.emailRecepcion,
        password: body.passwordRecepcion,      
        folderToRead: body.folderToRead,
        serverImap: body.serverImap,
      }]
    }
    
    const response = await ReceptorController.addReceptor(receptor);
    if (response.err) {
      return res.status(500).send(response);
    }
    
    return res.status(200).send(response)
    
  } catch (err) {
    console.log('Error en ReceptorAPI :: addReceptor ::', err)
    return res.status(500).send({ err: 'Error inesperado' })
  }

}

async function getReceptors(req, res) {
  console.log('body getReceptors: ',req.body)
  const
    {
      ID = '',
      company = ''
    } = req.body;


  const response = await ReceptorController.getReceptors({ ID, company }); //se le pasa a la funcion del modelo el parametro recibido 
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

async function deleteReceptor(req, res) {
  console.log('body deleteReceptor: ',req.body)
  const
    {
      ID = '',
    } = req.body;


  const response = await ReceptorController.deleteReceptors({ ID }); //se le pasa a la funcion del modelo el parametro recibido 
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}

async function putReceptor(req, res) {
  
  const body = req.body.data;
    const _id = {
      _id: body.id
    }
    const receptor = {    
      ID: body.ID,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      company: body.company,
      suppliers: [{
        ID: body.supplierID,
        company: body.supplierCompany,
        email: body.supplierEmail,
        elementsValidateXml: {
          name: body.nameXML,
          value: body.valueXML
        }
      }],
      accessEmail: [{
        email: body.emailRecepcion,
        password: body.passwordRecepcion
      }]
    }
    console.log('req.body._id:  ',_id)
  console.log('req.body.ID:  ',receptor)

  //console.log('receptor putReceptor: ',receptor)
  const response = await ReceptorController.putReceptors(_id, receptor); //se le pasa a la funcion del modelo el parametro recibido 
  if (response.error) {
    return res.status(500).send(response);
  }
  return res.status(200).send(response);
}



router.post('/api/receptors', auth, getReceptors);
router.post('/api/receptors/add', auth, addReceptor)
router.delete('/api/receptors/delete', auth, deleteReceptor)
router.put('/api/receptors/put', auth, putReceptor)
//router.get('/api/receptors', auth , getReceptors); // auth => Si el usuario no llega autorizado no ejecuta el metodo getUsers - .get consulta todos los receptores
//router.get('/api/receptors', auth, getReceptors);


module.exports = router;
