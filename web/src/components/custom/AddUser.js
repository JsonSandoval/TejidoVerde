import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';





const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Registrar Cliente
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form action="/api/receptors/add" method="POST" className={classes.root} noValidate autoComplete="off" >
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="ID"
                    name="ID"
                    label="Numero Identificación/NIT"
                    fullWidth
                    autoComplete="given-name"
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="company"
                    name="company"
                    label="Nombre Comercial/Razón Social"
                    fullWidth
                    autoComplete="given-name"
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="supplierCompany"
                    name="supplierCompany"
                    label="Nombre Comercial/Razón Social"
                    fullWidth
                    autoComplete="given-name"
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
                    autoComplete="given-name"
                  />
                </Grid>

              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Registrar
                 </Button>
              </Grid>
            </React.Fragment>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}
