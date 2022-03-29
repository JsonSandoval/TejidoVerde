
const Receptor = require('../db/model/Receptor')

/*
const ReceptorController = {// consulta todos los receptores
 async getReceptors() {
    try {
      const receptors = await Receptors.find({});
      return receptors;
    } catch (error) {
      console.log('Error en ReceptorController :: getReceptors :: ',err)
      return { error: "Error al consultar los receptores" }
    }
  }
};
*/
const ReceptorController = {
  async getReceptors(filters = {} ) {//recibe el obehecto filters para una consulta mas segmentada a la BD - {} por defecto un objecto vacio
     try {
       let query = {};
       for (const key in filters) {
         if (filters[key].length > 0) {
           query[key] = new RegExp(filters[key], 'i')
         }
       }
       const receptors = await Receptor.find(query);
       return receptors;
     } catch (err) {
       console.log('Error en ReceptorController :: getReceptors :: ',err)
       return { err: "Error al consultar los receptores" }
     }
   },
   async deleteReceptors(filters = {}){
    try {
      let query = {};
      for (const key in filters) {
        if (filters[key].length > 0) {
          query[key] = new RegExp(filters[key], 'i')
        }
      }
      console.log('query delete ',query)
      const receptors = await Receptor.remove(query);
      return receptors;
    } catch (err) {
      console.log('Error en ReceptorController :: getReceptors :: ',err)
      return { err: "Error al consultar los receptores" }
    }

   },
   async putReceptors(index, filters){
    try { 
      const receptors = await Receptor.findByIdAndUpdate(index, filters);
      return receptors;
    } catch (err) {
      console.log('Error en ReceptorController :: putReceptors :: ',err)
      return { err: "Error al actualizar los receptores" }
    }

   },
   async addReceptor(body) {
    //Le pasa al usuario los campos del esquema
    
   /* const receptor = {
      ID: body.ID,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lasrName,
      phone: body.phone,
      company: body.company,
      suppliers: [{
        ID: '',
        company: '',
        email: '' 
      }]
    };


    for (const key in body.suppliers) {
      receptor.suppliers[key].ID = body.suppliers[key].ID
     
    }
    console.log("receptor despues del for in: ", receptor)
    */
     
    const newReceptor = new Receptor(body)
    try {
      return await newReceptor.save();
    } catch (err) {
      console.log('Error en ReceptorController :: addReceptor :: ',err)
      return { err: "Error al guardar el receptor" }
    }
  }
 }; 


module.exports = ReceptorController;
