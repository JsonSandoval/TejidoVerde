const Report = require('../db/model/Report')

const ReportController = {
  async getReport(filters = {} ) {//recibe el obehecto filters para una consulta mas segmentada a la BD - {} por defecto un objecto vacio
    try {
      console.log('getReport: ', filters)
      let query = {};
      for (const key in filters) {
        if (filters[key].length > 0) {
          query[key] = new RegExp(filters[key], 'i')
        }
      }
      console.log('getReport:: query :: ', query)
      const report = await Report.find(query);
      return report;
    } catch (err) {
      console.log('Error en ReceptorController :: getReceptors :: ',err)
      return { err: "Error al consultar los receptores" }
    }
  },
  async addReport(body) {
    //Le pasa al usuario los campos del esquema
    
    const newReport = new Report(body)
    try {
      return await newReport.save();
    } catch (err) {
      console.log('Error en ReportController :: addReport :: ',err)
      return { err: "Error al guardar el reporte" }
    }
  }
};

module.exports = ReportController;
