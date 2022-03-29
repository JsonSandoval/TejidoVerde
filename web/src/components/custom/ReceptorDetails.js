import React from 'react';
import PropTypes from 'prop-types';
import ReceptorItem from '../custom/ReceptorItem';
import axios from 'axios';
//estilos
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
//elementos
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
//iconos
import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Mail from '@material-ui/icons/Mail';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { TextField } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEdit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    backgroundColor: red[500],
  },


}));

 

function ReceptorDetails(props) {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useRowStyles();
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  //const [ID, setReceptorsID] = React.useState('')
  const [receptorSelect, setReceptorSelect] = React.useState('')


  //Editar
  const id = props._id;
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

  //Peticiones al servidor

  const deleteReceptor = async () => {
    try {
      const response = await axios.delete('/api/receptors/delete', { data: { ID } }) // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      ModalDelete();
    } catch (err) {
      console.log(err)
    }
  }

  const updateReceptor = async () => {
    try {
      //console.log('updateReceptor: ', {id, ID, email, firstName, lastName, phone, company, supplierID, supplierCompany, supplierEmail, nameXML, valueXML, emailRecepcion, passwordRecepcion, serverImap, folderToRead })
      const response = await axios.put('/api/receptors/put', { data: {id, ID, email, firstName, lastName, phone, company, supplierID, supplierCompany, supplierEmail, nameXML, valueXML, emailRecepcion, passwordRecepcion, serverImap, folderToRead } }) // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      handleCloseDialog();
    } catch (err) {
      console.log(err)
    }
  }

  /* const updateState = (event) => {
     const value = event.currentTarget.value;
     if (event.currentTarget.name === 'ID') {
       return setReceptorsID(value);
     }
   };*/


  React.useEffect(() => {
    firstUpdateState();
  }, []);


  const firstUpdateState = () =>{
    setNewIDReceptor(props.ID);
    setNewEmailReceptor(props.email)
    setNewFirstNameReceptor(props.firstName);
    setNewLastNameReceptor(props.lastName);
    setNewPhoneReceptor(props.phone);
    setNewCompanyReceptor(props.company);
    props.suppliers.map((supplier) => (
      setNewSupplierIDReceptor(supplier.ID),
      setNewSupplierCompanyReceptor(supplier.company),
      setNewSupplierEmailReceptor(supplier.email)

    )
    );
    props.suppliers.map((supplier) => (
      supplier.elementsValidateXml.map((element) => {
        setNewNameXMLReceptor(element.name),
          setNewValueXMLReceptor(element.value)
      })));

    props.accessEmail.map((access) => (
      setNewEmailRecepcionReceptor(access.email),
      setNewPasswordRecepcionReceptor(access.password),
      setNewServerImapReceptor(access.serverImap),
      setNewFolderToReadReceptor(access.folderToRead)
    ));

  }

  const updateState = (event) => {

   
    let value = '';
    let name = '';
    let idElement = '';
    
      value = event.currentTarget.value;
      name = event.currentTarget.name;
      idElement = event.currentTarget.id;
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
    }
  

  //Modal
  const handleOpen = (receptor, option) => {
    setReceptorSelect(receptor);
    (option === 'Edit') ? ModalEdit() : ModalDelete()

  };

  const ModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  const ModalDelete = () => {
    setModalDelete(!modalDelete);
  }


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  //Dialog Edit
  //Open/Close Form
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  return (
    <Box m={1} key={props._id}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
          </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.company}
          subheader={props.email}
        />
        <CardContent>
          <Grid item xs >
            <ReceptorItem {...props} />
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded && <ExpandLessIcon />}
            {!expanded && <ExpandMoreIcon />}
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {props.accessEmail.map((access) => (
              <Typography variant="h6" gutterBottom component="div" size="small">
                <Mail />
                {access.email}
              </Typography>
            ))}
            <Grid>
              <IconButton aria-label="delete receptor" >
                <IconDelete onClick={() => handleOpen(props, 'Delete')} />
              </IconButton>
              <IconButton aria-label="Edit Receptor">
                <IconEdit onClick={handleClickOpenDialog} />
              </IconButton>
            </Grid>

            <TableRow className={classes.root}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                Proveedores
    </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                {props.suppliers.map((supplier) => (
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        {supplier.company}
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>NIT</TableCell>
                            <TableCell>Correo Electrónico</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow key={props.ID}>
                            <TableCell component="th" scope="row">
                              {supplier.ID}
                            </TableCell>
                            <TableCell>{supplier.email}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                ))};
              </TableCell>
            </TableRow>



            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={modalDelete}
              onClose={ModalDelete}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={modalDelete}>

                <div className={classes.paperModal}>
                  <p id="transition-modal-description">Esta seguro de eliminar {props.ID} </p>
                  <Grid container spacing={1}>
                    <Grid>
                      <TextField type="text" label="Confirme el Nit" value={ID} name="ID" onChange={updateState} fullWidth />
                    </Grid>
                  </Grid>
                  <div align="right">
                    <Button onClick={() => deleteReceptor()}>Eliminar</Button>
                    <Button onClick={() => ModalDelete()}>Cancelar</Button>
                  </div>
                </div>
              </Fade>
            </Modal>
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Editar  {props.company}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Ingrese los nuevos datos para actualizar la informacion en el sistema.
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
                            id={props.ID}
                            name="ID"
                            label="Numero Identificación/NIT"
                            fullWidth
                            autoComplete="given-name"
                            value={ID}
                            onChange={updateState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id={props.email}
                            name="email"
                            label="Correo Electrónico"
                            fullWidth
                            autoComplete="given-name"
                            value={email}
                            onChange={updateState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id={props.firstName}
                            name="firstName"
                            label="Primer Nombre"
                            fullWidth
                            autoComplete="given-name"
                            value={firstName}
                            onChange={updateState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id={props.lastName}
                            name="lastName"
                            label="Apellido"
                            fullWidth
                            autoComplete="given-name"
                            value={lastName}
                            onChange={updateState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id={props.phone}
                            name="phone"
                            label="Teléfono"
                            fullWidth
                            autoComplete="given-name"
                            value={phone}
                            onChange={updateState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id={props.company}
                            name="company"
                            label="Nombre Comercial"
                            fullWidth
                            autoComplete="given-name"
                            value={company}
                            onChange={updateState}
                          />
                        </Grid>
                        <Toolbar>
                          <Typography variant="h6" color="inherit" noWrap>
                            Registro de Proveedores
          </Typography>
                        </Toolbar>

                      </Grid>
                      <div>

                        {props.suppliers.map((supplier) => (
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id={supplier.ID}
                                name="supplierID"
                                label="NIT Proveedor"
                                fullWidth

                                value={supplierID}
                                onChange={updateState}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id={supplier.company}
                                name="supplierCompany"
                                label="Nombre Comercial"
                                fullWidth
                                value={supplierCompany}
                                onChange={updateState}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id={supplier.email}
                                name="supplierEmail"
                                label="Correo Electrónico"
                                fullWidth
                                autoComplete="given-name"
                                value={supplierEmail}
                                onChange={updateState}
                              />
                            </Grid>
                            <Toolbar>
                              <Typography variant="h6" color="inherit" noWrap>
                                Configuración XML Proveedor
                 </Typography>
                            </Toolbar>
                          </Grid>

                        ))}
                      </div>
                      <div>
                        {props.suppliers.map((supplier) => (
                          supplier.elementsValidateXml.map((element) => {
                            return (
                              <Grid container spacing={3}>

                                <Grid item xs={12} sm={12}>
                                  <TextField
                                    required
                                    id={element.name}
                                    name="nameXML"
                                    label="Elemento del XML a Validar"
                                    fullWidth
                                    autoComplete="given-name"
                                    value={nameXML}
                                    onChange={updateState}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    required
                                    id={element.value}
                                    name="valueXML"
                                    label="Valor"
                                    fullWidth
                                    autoComplete="given-name"
                                    value={valueXML}
                                    onChange={updateState}
                                  />
                                </Grid>

                                <Toolbar>
                                  <Typography variant="h6" color="inherit" noWrap>
                                    Configuración Correo Recepción
                 </Typography>
                                </Toolbar>
                              </Grid>
                            )
                          })
                        ))}
                      </div>
                      <div>
                        {props.accessEmail.map((access) => (
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={9}>
                              <TextField
                                required
                                id={access.email}
                                name="emailRecepcion"
                                label="Correo electrónico para la recepción de facturas"
                                fullWidth
                                autoComplete="given-name"
                                value={emailRecepcion}
                                onChange={updateState}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id={access.password}
                                name="passwordRecepcion"
                                label="Contraseña de acceso"
                                type="password"
                                value={passwordRecepcion}
                                fullWidth
                                onChange={updateState}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id={access.serverIMAP}
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
                                id={access.folderToRead}
                                name="folderToRead"
                                label="Carpeta Recepción"
                                fullWidth
                                value={folderToRead}
                                onChange={updateState}
                              />
                            </Grid>

                          </Grid>
                        ))}
                      </div>
                      <DialogActions>

                        <Button onClick={handleCloseDialog} color="primary">
                          Cancel
                          </Button>
                        <Button variant="contained"
                          color="primary"
                          onClick={() => updateReceptor()}
                        >
                          Actualizar
                          </Button>
                      </DialogActions>
                    </React.Fragment>

                  </Paper>
                </main>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )


                        }
export default ReceptorDetails
