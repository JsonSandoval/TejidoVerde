import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReceptorDetails from '../../custom/ReceptorDetails';
import FormAddReceptor from '../../custom/FormAddReceptor';
//styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//elements
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
//Icons
import AddIcon from '@material-ui/icons/Add';


function ReceptorsView() {


  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: false,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },

  }));

  const [receptors, setReceptors] = useState([]);//state para acceder a las propiedades de un elemento HTML - 
  const [ID, setReceptorsID] = useState('');// busca por ID receptor - value=""
  const [company, setReceptorsCompany] = useState('');

  const getReceptors = async () => {
    try {
      const response = await axios.post('/api/receptors', { ID, company });  // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      setReceptors(response.data);
    } catch (error) {
      setReceptors([]);
      console.log(error)
    }
  }
  useEffect(() => {
    getReceptors();
  }, []);

  const renderReceptors = () => {
    if (receptors.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return receptors.map(receptor => {
      return (
        <ReceptorDetails {...receptor} />
      )
    })
  };

  const searchByFilter = () => {
    getReceptors();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (event.currentTarget.name === 'ID') {
      return setReceptorsID(value);
    }
    setReceptorsCompany(value);
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Administración de Receptores
          </Typography>
          <FormAddReceptor />
        </Toolbar>
      </AppBar>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField type="text" label="Numero Identificación/NIT" value={ID} name="ID" onChange={updateState} fullWidth />

        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField type="text" label="Compañia" value={company} name="company" onChange={updateState} fullWidth />
        </Grid>

        <Grid item xs={12} sm={9}>

          <Button onClick={searchByFilter}
            variant="contained"
            color="primary"
          >Buscar</Button>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container spacing={2}>
          {renderReceptors()}
        </Grid>
      </Box>

    </div>


  )

}

export default ReceptorsView;
