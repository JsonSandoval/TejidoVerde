import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecyclerDetails from '../../custom/RecyclerDetails';
import FormAddRecycler from '../../custom/FormAddRecycler';
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


function RecyclersView() {


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

  const [Recyclers, setRecyclers] = useState([]);//state para acceder a las propiedades de un elemento HTML - 
  const [ID, setRecyclersID] = useState('');// busca por ID Recycler - value=""
  const [firstName, setRecyclersFirstName] = useState('');

  const getRecyclers = async () => {
    try {
      const response = await axios.post('/api/Recyclers', { ID, firstName });  // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      setRecyclers(response.data);
    } catch (error) {
      setRecyclers([]);
      console.log(error)
    }
  }
  useEffect(() => {
    getRecyclers();
  }, []);

  const renderRecyclers = () => {
    if (Recyclers.lenght === 0) {
      return (
        <div>Sin Recicladores para mostrar</div>
      );
    }
    return Recyclers.map(Recycler => {
      return (
        <RecyclerDetails {...Recycler} />
      )
    })
  };

  const searchByFilter = () => {
    getRecyclers();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (event.currentTarget.name === 'ID') {
      return setRecyclersID(value);
    }
    setRecyclersFirstName(value);
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
            Administración de Recicladores
          </Typography>
          <FormAddRecycler />
        </Toolbar>
      </AppBar>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField type="text" label="Numero Identificación" value={ID} name="ID" onChange={updateState} fullWidth />

        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField type="text" label="Nombre" value={firstName} name="firstName" onChange={updateState} fullWidth />
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
          {renderRecyclers()}
        </Grid>
      </Box>

    </div>


  )

}

export default RecyclersView;
