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

function FormAddRecycler() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
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


    //Petición al servidor
    const addRecycler = async () => {
        try {
            console.log('addRecycler: ', { TypeID, ID, firstName, secondName, surname, secondSurname, phone, email, numberPlate, typeVehicle, route })
            const response = await axios.post('/api/Recyclers/add', { TypeID, ID, firstName, secondName, surname, secondSurname, phone, email, numberPlate, typeVehicle, route }) // Get o post, de acuerdo a la consulta por axios /{} 
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
                Agregar un Reciclador
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nuevo Reciclador</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los datos para realizar el registro de un nuevo Reciclador en el sistema.
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
                                            id="TypeID"
                                            name="TypeID"
                                            label="Tipo de Identificación"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={updateState}
                                        />
                                    </Grid>
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
                                            id="secondName"
                                            name="secondName"
                                            label="Segundo Nombre"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={updateState}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="surname"
                                            name="surname"
                                            label="Primer Apellido"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={updateState}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="secondSurname"
                                            name="secondSurname"
                                            label="Segundo Apellido"
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
                                            id="email"
                                            name="email"
                                            label="Correo Electrónico"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={updateState}
                                        />
                                    </Grid>
                                    <Toolbar>
                                        <Typography variant="h6" color="inherit" noWrap>
                                            Registro de Vehículo y Ruta
                                        </Typography>
                                    </Toolbar>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="numberPlate"
                                            name="numberPlate"
                                            label="Número de Placa"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={updateState}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="typeVehicle"
                                            name="typeVehicle"
                                            label="Tipo de Vehículo"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={updateState}
                                        />
                                    </Grid>
                                    <Toolbar>
                                        <Typography variant="h6" color="inherit" noWrap>
                                            Información de Rutas
                                        </Typography>
                                    </Toolbar>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="route"
                                            name="route"
                                            label="Ruta del Reciclador"
                                            fullWidth
                                            autoComplete="given-name"
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
                                        onClick={addRecycler} >
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
export default FormAddRecycler;
