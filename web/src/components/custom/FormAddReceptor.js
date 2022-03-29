import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonAdd: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

}));

function FormAddReceptor() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ID, setNewIDReceptor] = React.useState('')
  const [email, setNewEmailReceptor] = React.useState('')
  const [firstName, setNewFirstNameReceptor] = React.useState('')
  const [lastName, setNewLastNameReceptor] = React.useState('')
  const [phone, setNewPhoneReceptor] = React.useState('')
  const [company, setNewCompanyReceptor] = React.useState('')
  const [supplierID, setNewSupplierIDReceptor] = React.useState('')
  const [supplierCompany, setNewSupplierCompanyReceptor] = React.useState('')
  const [supplierEmail, setNewSupplierEmailReceptor] = React.useState('')
  const [nameXML, setNewNameXMLReceptor] = React.useState('')
  const [valueXML, setNewValueXMLReceptor] = React.useState('')
  const [emailRecepcion, setNewEmailRecepcionReceptor] = React.useState('')
  const [passwordRecepcion, setNewPasswordRecepcionReceptor] = React.useState('')
  const [serverImap, setNewServerImapReceptor] = React.useState('')
  const [folderToRead, setNewFolderToReadReceptor] = React.useState('')

  //Petición al servidor
  const addReceptor = async () => {
    try {
      console.log('addReceptor: ', { ID , email, firstName, lastName, phone, company, supplierID, supplierCompany,supplierEmail, nameXML, valueXML, emailRecepcion, passwordRecepcion, serverImap, folderToRead})
      const response = await axios.post('/api/receptors/add', { ID, email, firstName, lastName, phone, company, supplierID, supplierCompany, supplierEmail, nameXML, valueXML, emailRecepcion, passwordRecepcion, serverImap, folderToRead }) // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      handleClose();
    } catch (err) {
      console.log(err)
    }
  }

  const updateState = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    switch (name) {
      case 'ID':

        return setNewIDReceptor(value);

      case 'email':
        return setNewEmailReceptor(value);

      case 'firstName':
        return setNewFirstNameReceptor(value);

      case 'lastName':
        return setNewLastNameReceptor(value);

      case 'phone':
        return setNewPhoneReceptor(value);

      case 'company':
        return setNewCompanyReceptor(value);

      case 'supplierID':
        return setNewSupplierIDReceptor(value);

      case 'supplierCompany':
        return setNewSupplierCompanyReceptor(value);

      case 'supplierEmail':
        return setNewSupplierEmailReceptor(value);

      case 'nameXML':
        return setNewNameXMLReceptor(value);

      case 'valueXML':
        return setNewValueXMLReceptor(value);

      case 'emailRecepcion':
        return setNewEmailRecepcionReceptor(value);

      case 'passwordRecepcion':
        return setNewPasswordRecepcionReceptor(value);

      case 'serverImap':
        return setNewServerImapReceptor(value);

      case 'folderToRead':
        return setNewFolderToReadReceptor(value);
      default:
        break;
    }
  };


  //Open/Close Form
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.buttonAdd}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}>
        Agregar un Receptor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo Receptor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para realizar el registro de un nuevo receptor en el sistema.
          </DialogContentText>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Toolbar>
                  <Typography variant="h6" color="inherit" noWrap>
                    Información Receptor
                 </Typography>
                </Toolbar>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="ID"
                      name="ID"
                      label="Numero Identificación/NIT"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Correo Electrónico"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="Primer Nombre"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Apellido"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="Teléfono"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="company"
                      name="company"
                      label="Nombre Comercial"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                      Registro de Proveedores
          </Typography>
                  </Toolbar>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="supplierID"
                      name="supplierID"
                      label="NIT Proveedor"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="supplierCompany"
                      name="supplierCompany"
                      label="Nombre Comercial"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="supplierEmail"
                      name="supplierEmail"
                      label="Correo Electrónico"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>

                  <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                      Configuración XML Proveedor
                 </Typography>
                  </Toolbar>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nameXML"
                      name="nameXML"
                      label="Elemento del XML a Validar"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="valueXML"
                      name="valueXML"
                      label="Valor"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                      Configuración Correo Recepción
                 </Typography>
                  </Toolbar>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      id="emailRecepcion"
                      name="emailRecepcion"
                      label="Correo electrónico para la recepción de facturas"
                      fullWidth
                      autoComplete="given-name"
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="passwordRecepcion"
                      name="passwordRecepcion"
                      label="Contraseña de acceso"
                      type="password"
                      fullWidth
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="serverImap"
                      name="serverImap"
                      label="Servidor del Correo"
                      fullWidth
                      autoComplete="given-name"
                      value={serverImap}
                      onChange={updateState}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="folderToRead"
                      name="folderToRead"
                      label="Carpeta Recepción"
                      fullWidth
                      value={folderToRead}
                      onChange={updateState}
                    />
                  </Grid>

                </Grid>
                <DialogActions>

                  <Button onClick={handleClose} color="primary">
                    Cancel
                          </Button>

                  <Button variant="contained"
                    color="primary"
                    onClick={addReceptor} >
                    Registrar
                          </Button>
                </DialogActions>
              </React.Fragment>

            </Paper>
          </main>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default FormAddReceptor;
