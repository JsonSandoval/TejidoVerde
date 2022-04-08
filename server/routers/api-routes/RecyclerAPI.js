const express = require('express');
const { Redirect } = require('react-router');

// const express = require('express');
const router = express.Router();


//Llama al controlador
const RecyclerController = require('../../controllers/RecyclerController')


//Llama Middlewares
const auth = require('../../midlewares/auth');



async function addRecycler(req, res) {
    try {

        const body = req.body;
        const Recycler = {
            TypeID: body.TypeID,
            ID: body.ID,
            firstName: body.firstName,
            secondName: body.secondName,
            surname: body.surname,
            secondSurname: body.secondSurname,
            phone: body.phone,
            email: body.email,
            numberPlate: body.numberPlate,
            typeVehicle: body.typeVehicle,
            route: body.route
        }

        const response = await RecyclerController.addRecycler(Recycler);
        if (response.err) {
            return res.status(500).send(response);
        }

        return res.status(200).send(response)

    } catch (err) {
        console.log('Error en RecyclerAPI :: addRecycler ::', err)
        return res.status(500).send({ err: 'Error inesperado' })
    }

}

async function getRecyclers(req, res) {
    console.log('body getRecyclers: ', req.body)
    const
        {
            ID = '',
            firstName = ''
        } = req.body;


    const response = await RecyclerController.getRecyclers({ ID, firstName }); //se le pasa a la funcion del modelo el parametro recibido 
    if (response.error) {
        return res.status(500).send(response);
    }
    return res.status(200).send(response);
}

async function deleteRecycler(req, res) {
    console.log('body deleteRecycler: ', req.body)
    const
        {
            ID = '',
        } = req.body;


    const response = await RecyclerController.deleteRecyclers({ ID }); //se le pasa a la funcion del modelo el parametro recibido 
    if (response.error) {
        return res.status(500).send(response);
    }
    return res.status(200).send(response);
}

async function putRecycler(req, res) {

    const body = req.body.data;
    const _id = {
        _id: body.id
    }
    const Recycler = {
        TypeID: body.TypeID,
        ID: body.ID,
        firstName: body.firstName,
        secondName: body.secondName,
        surname: body.surname,
        secondSurname: body.secondSurname,
        phone: body.phone,
        email: body.email,
        numberPlate: body.numberPlate,
        typeVehicle: body.typeVehicle,
        route: body.route
    }
    console.log('req.body._id:  ', _id)
    console.log('req.body.ID:  ', Recycler)

    //console.log('Recycler putRecycler: ',Recycler)
    const response = await RecyclerController.putRecyclers(_id, Recycler); //se le pasa a la funcion del modelo el parametro recibido 
    if (response.error) {
        return res.status(500).send(response);
    }
    return res.status(200).send(response);
}



router.post('/api/Recyclers', auth, getRecyclers);
router.post('/api/Recyclers/add', auth, addRecycler)
router.delete('/api/Recyclers/delete', auth, deleteRecycler)
router.put('/api/Recyclers/put', auth, putRecycler)
//router.get('/api/Recyclers', auth , getRecyclers); // auth => Si el usuario no llega autorizado no ejecuta el metodo getUsers - .get consulta todos los Recycleres
//router.get('/api/Recyclers', auth, getRecyclers);


module.exports = router;
