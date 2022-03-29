// Establecer la conexion a la BD
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ysando5:Fadetoblack30@tejidoverde.xzv5y.mongodb.net/tejidoverdeDev?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

