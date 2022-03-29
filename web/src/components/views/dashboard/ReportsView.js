import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetApp from '@material-ui/icons/GetApp';
import CsvDownloader from 'react-csv-downloader';
import { red, blue, green } from '@material-ui/core/colors';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { LensTwoTone } from '@material-ui/icons';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const theme = createMuiTheme({
  palette: {
    primary: green,
    secundary: red,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



function ReportsView() {

  const [reports, setReports] = useState([]);
  const [documentID, setReportsDocument] = useState('');
  const [receptorID, setReportsReceptor] = useState('');
  const [dateReception, setDateReception] = useState(new Date(''));


  const getReports = async () => {
    try {
      console.log('consulta reporte individual: ', { documentID, receptorID, dateReception })
      const response = await axios.post('/api/reports', { documentID, receptorID, dateReception });  // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      setReports(response.data);
    } catch (error) {
      setReports([]);
      console.log(error)
    }
  }


  useEffect(() => {
    getReports();
  }, []);

  const createCSV = (row) => {
    const fileName = [{
      fileName: row.nameXML
    }]

    const columns = [{
      id: 'documentID',
      displayName: 'N° Documento'
    }, {
      id: 'statusDocument',
      displayName: 'Estado'
    },
    {
      id: 'dateReception',
      displayName: 'Fecha Recepción'
    },
    {
      id: 'supplierID',
      displayName: 'Nit Proveedor'
    },
    {
      id: 'emailSupplier',
      displayName: 'Email Proveedor'
    }];


    const datas = [{
      documentID: row.documentID,
      statusDocument: row.statusDocument,
      dateReception: row.dateReception,
      supplierID: row.supplierID,
      emailSupplier: row.emailSupplier
    }]


    return (
      <Button>
        <GetApp />
        <CsvDownloader filename={row._id + '_' + row.documentID}
          separator=";"
          wrapColumnChar=""
          columns={columns}
          datas={datas}
          text="Reporte individual" />
      </Button>
    )
  }

  const DownloadCSV = () => {
    const fileName = [{
      fileName: 'ReportRecepcion'
    }]

    const columns = [{
      id: 'documentID',
      displayName: 'N° Documento'
    }, {
      id: 'statusDocument',
      displayName: 'Estado'
    },
    {
      id: 'dateReception',
      displayName: 'Fecha Recepción'
    },
    {
      id: 'supplierID',
      displayName: 'Nit Proveedor'
    },
    {
      id: 'emailSupplier',
      displayName: 'Email Proveedor'
    }];



    return (
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          <DescriptionOutlinedIcon />
          <CsvDownloader filename="reporteRecepción"
            separator=";"
            wrapColumnChar=""
            columns={columns}
            datas={reports}
             >Descargar Reporte</CsvDownloader>
        </Button>
      </ThemeProvider>

    )


  }

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 700,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const renderReports = () => {


    if (reports.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>NIT Receptor</StyledTableCell>
              <StyledTableCell>N° Documento</StyledTableCell>
              <StyledTableCell>Estado</StyledTableCell>
              <StyledTableCell>Fecha Recepción</StyledTableCell>
              <StyledTableCell>Nit Proveedor</StyledTableCell>
              <StyledTableCell>Email Proveedor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((row) => (

              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {createCSV(row)}

                </StyledTableCell>
                <StyledTableCell >{row.receptorID}</StyledTableCell>
                <StyledTableCell >{row.documentID}</StyledTableCell>
                <StyledTableCell>{row.statusDocument}</StyledTableCell>
                <StyledTableCell>{row.dateReception}</StyledTableCell>
                <StyledTableCell >{row.supplierID}</StyledTableCell>
                <StyledTableCell >{row.emailSupplier}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  }


  const classes = useStyles();

  const searchByFilter = () => {
    getReports();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    switch (name) {
      case 'documentID':

        return setReportsDocument(value);

      case 'receptorID':
        return setReportsReceptor(value);

      case 'dateReception':
        return setDateReception(value);
    };
  }

  return (
    <Box m={1}>
      <Card className={classes.root}>
        <CardHeader
          title="Formulario Reportes"
        />
        <CardContent>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>

                <Grid item xs={3}>
                  <TextField type="text" label="Numero Documento" value={documentID} name="documentID" onChange={updateState} fullWidth />
                </Grid>

                <Grid item xs sm={3} >
                  <TextField type="text" label="NIT Receptor" value={receptorID} name="receptorID" onChange={updateState} fullWidth /></Grid>

                <Grid item xs={6}>
                  <TextField id="date" label="Fecha Validación" value={dateReception} type="date" name="dateReception" onChange={updateState} className={classes.textField} InputLabelProps={{ shrink: true, }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>


          <Grid container spacing={3}>

            <Grid item xs={3}>
              <Button onClick={searchByFilter}
                variant="contained"
                color="secundary"
              >Buscar</Button>
            </Grid>
            <Grid item xs={3}>

              {DownloadCSV()}

            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              {renderReports()}
            </Grid>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>

  )
}
export default ReportsView;
