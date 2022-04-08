import React from 'react';
import PropTypes from 'prop-types';
import RecyclerItem from '../custom/RecyclerItem';
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



function RecyclerDetails(props) {
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const classes = useRowStyles();
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    //const [ID, setRecyclersID] = React.useState('')
    const [RecyclerSelect, setRecyclerSelect] = React.useState('')


    //Editar
    const id = props._id;
    const [TypeID, setNewTypeIDRecycler] = React.useState('')
    const [ID, setNewIDRecycler] = React.useState('')
    const [firstName, setNewFirstNameRecycler] = React.useState('')
    const [secondName, setNewSecondNameRecycler] = React.useState('')
    const [surname, setNewSurnameRecycler] = React.useState('')
    const [secondSurname, setNewSecondSurnameRecycler] = React.useState('')
    const [phone, setNewPhoneRecycler] = React.useState('')
    const [email, setNewEmailRecycler] = React.useState('')
    const [numberPlate, setNewNumberPlateRecycler] = React.useState('')
    const [typeVehicle, setNewTypeVehicleRecycler] = React.useState('')
    const [route, setNewRouteRecycler] = React.useState('')

    //Peticiones al servidor

    const deleteRecycler = async () => {
        try {
            const response = await axios.delete('/api/Recyclers/delete', { data: { ID } }) // Get o post, de acuerdo a la consulta por axios /{} 
            console.log('response: ', response)
            ModalDelete();
        } catch (err) {
            console.log(err)
        }
    }

    const updateRecycler = async () => {
        try {
            //console.log('updateRecycler: ', {id, ID, email, firstName, lastName, phone, company, supplierID, supplierCompany, supplierEmail, nameXML, valueXML, emailRecepcion, passwordRecepcion, serverImap, folderToRead })
            const response = await axios.put('/api/Recyclers/put', { data: { id, TypeID, ID, firstName, secondName, surname, secondSurname, phone, email, numberPlate, typeVehicle, route } }) // Get o post, de acuerdo a la consulta por axios /{} 
            console.log('response: ', response)
            handleCloseDialog();
        } catch (err) {
            console.log(err)
        }
    }

    /* const updateState = (event) => {
       const value = event.currentTarget.value;
       if (event.currentTarget.name === 'ID') {
         return setRecyclersID(value);
       }
     };*/


    React.useEffect(() => {
        firstUpdateState();
    }, []);


    const firstUpdateState = () => {
        setNewTypeIDRecycler(props.TypeID);
        setNewIDRecycler(props.ID);
        setNewFirstNameRecycler(props.firstName);
        setNewSecondNameRecycler(props.secondName);
        setNewSurnameRecycler(props.surname);
        setNewSecondSurnameRecycler(props.secondSurname);
        setNewPhoneRecycler(props.phone);
        setNewEmailRecycler(props.email)
        setNewNumberPlateRecycler(props.numberPlate);
        setNewTypeVehicleRecycler(props.typeVehicle);
        setNewRouteRecycler(props.route);
    }

    const updateState = (event) => {


        let value = '';
        let name = '';
        let idElement = '';

        value = event.currentTarget.value;
        name = event.currentTarget.name;
        idElement = event.currentTarget.id;
        switch (name) {
            case 'TypeID':

                return setNewTypeIDRecycler(value);

            case 'ID':

                return setNewIDRecycler(value);

            case 'firstName':
                return setNewFirstNameRecycler(value);

            case 'secondName':
                return setNewSecondNameRecycler(value);

            case 'surname':
                return setNewSurnameRecycler(value);


            case 'secondSurname':
                return setNewSecondSurnameRecycler(value);

            case 'phone':
                return setNewPhoneRecycler(value);

            case 'email':
                return setNewEmailRecycler(value);

            case 'numberPlate':
                return setNewNumberPlateRecycler(value);

            case 'typeVehicle':
                return setNewTypeVehicleRecycler(value);

            case 'route':
                return setNewRouteRecycler(value);

            default:
                break;
        }
    }


    //Modal
    const handleOpen = (Recycler, option) => {
        setRecyclerSelect(Recycler);
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
                    title={props.firstName + " " + props.surname}
                    subheader={props.TypeID + ": " + props.ID}
                />
                <CardContent>
                    <Grid item xs >
                        <RecyclerItem {...props} />
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
                        <Grid>
                            <IconButton aria-label="delete Recycler" >
                                <IconDelete onClick={() => handleOpen(props, 'Delete')} />
                            </IconButton>
                            <IconButton aria-label="Edit Recycler">
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
                                Información Véhiculo
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box margin={1}>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Tipo Vehículo</TableCell>
                                                    <TableCell>Placa</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow key={props.ID}>
                                                    <TableCell component="th" scope="row">
                                                        {props.typeVehicle}
                                                    </TableCell>
                                                    <TableCell>{props.numberPlate}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
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
                                            <TextField type="text" label="Confirme El Número de Identificación" value={ID} name="ID" onChange={updateState} fullWidth />
                                        </Grid>
                                    </Grid>
                                    <div align="right">
                                        <Button onClick={() => deleteRecycler()}>Eliminar</Button>
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
                                                    Información Reciclador
                                                </Typography>
                                            </Toolbar>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id={props.TypeID}
                                                        name="TypeID"
                                                        label="Tipo de Identificación"
                                                        fullWidth
                                                        autoComplete="given-name"
                                                        value={TypeID}
                                                        onChange={updateState}
                                                    />
                                                </Grid>
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
                                                        id={props.secondName}
                                                        name="secondName"
                                                        label="Segundo Nombre"
                                                        fullWidth
                                                        autoComplete="given-name"
                                                        value={secondName}
                                                        onChange={updateState}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id={props.surname}
                                                        name="surname"
                                                        label="Primer Apellido"
                                                        fullWidth
                                                        autoComplete="given-name"
                                                        value={surname}
                                                        onChange={updateState}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id={props.secondSurname}
                                                        name="secondSurname"
                                                        label="Segundo Apellido"
                                                        fullWidth
                                                        autoComplete="given-name"
                                                        value={secondSurname}
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
                                                        id={props.email}
                                                        name="email"
                                                        label="Correo Electrónico"
                                                        fullWidth
                                                        autoComplete="given-name"
                                                        value={email}
                                                        onChange={updateState}
                                                    />
                                                </Grid>
                                                <Toolbar>
                                                    <Typography variant="h6" color="inherit" noWrap>
                                                        Registro de Vehículo
                                                    </Typography>
                                                </Toolbar>

                                            </Grid>
                                            <div>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            id={props.numberPlate}
                                                            name="numberPlate"
                                                            label="Número de Placa"
                                                            fullWidth

                                                            value={numberPlate}
                                                            onChange={updateState}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            id={props.typeVehicle}
                                                            name="typeVehicle"
                                                            label="Tipo de Vehículo"
                                                            fullWidth
                                                            value={typeVehicle}
                                                            onChange={updateState}
                                                        />
                                                    </Grid>

                                                    <Toolbar>
                                                        <Typography variant="h6" color="inherit" noWrap>
                                                            Configuración Ruta
                                                        </Typography>
                                                    </Toolbar>
                                                </Grid>


                                            </div>
                                            <div>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            required
                                                            id={props.route}
                                                            name="route"
                                                            label="Ruta"
                                                            fullWidth
                                                            autoComplete="given-name"
                                                            value={route}
                                                            onChange={updateState}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <DialogActions>
                                                <Button onClick={handleCloseDialog} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button variant="contained"
                                                    color="primary"
                                                    onClick={() => updateRecycler()}
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
export default RecyclerDetails
