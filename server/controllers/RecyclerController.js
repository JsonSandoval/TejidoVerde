
const Recycler = require('../db/model/Recycler')

/*
const RecyclerController = {// consulta todos los Recycleres
 async getRecyclers() {
    try {
      const Recyclers = await Recyclers.find({});
      return Recyclers;
    } catch (error) {
      console.log('Error en RecyclerController :: getRecyclers :: ',err)
      return { error: "Error al consultar los Recycleres" }
    }
  }
};
*/
const RecyclerController = {
  async getRecyclers(filters = {} ) {//recibe el obehecto filters para una consulta mas segmentada a la BD - {} por defecto un objecto vacio
     try {
       let query = {};
       for (const key in filters) {
         if (filters[key].length > 0) {
           query[key] = new RegExp(filters[key], 'i')
         }
       }
       const Recyclers = await Recycler.find(query);
       return Recyclers;
     } catch (err) {
       console.log('Error en RecyclerController :: getRecyclers :: ',err)
       return { err: "Error al consultar los Recycleres" }
     }
   },
   async deleteRecyclers(filters = {}){
    try {
      let query = {};
      for (const key in filters) {
        if (filters[key].length > 0) {
          query[key] = new RegExp(filters[key], 'i')
        }
      }
      console.log('query delete ',query)
      const Recyclers = await Recycler.remove(query);
      return Recyclers;
    } catch (err) {
      console.log('Error en RecyclerController :: getRecyclers :: ',err)
      return { err: "Error al consultar los Recycleres" }
    }

   },
   async putRecyclers(index, filters){
    try { 
      const Recyclers = await Recycler.findByIdAndUpdate(index, filters);
      return Recyclers;
    } catch (err) {
      console.log('Error en RecyclerController :: putRecyclers :: ',err)
      return { err: "Error al actualizar los Recycleres" }
    }

   },
   async addRecycler(body) {
    //Le pasa al usuario los campos del esquema
    
   /* const Recycler = {
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
      Recycler.suppliers[key].ID = body.suppliers[key].ID
     
    }
    console.log("Recycler despues del for in: ", Recycler)
    */
     
    const newRecycler = new Recycler(body)
    try {
      return await newRecycler.save();
    } catch (err) {
      console.log('Error en RecyclerController :: addRecycler :: ',err)
      return { err: "Error al guardar el Recycler" }
    }
  }
 }; 


module.exports = RecyclerController;
