import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import GetApp from '@material-ui/icons/GetApp';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import CsvDownloader from 'react-csv-downloader';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: red[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});





function ReportItem(props) {
 
  console.log('props ReportItem: ', props)
  const classes = useStyles();

  const fileName =[{
    fileName : props.nameXML
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
    documentID: props.documentID,
    statusDocument: props.statusDocument,
    dateReception: props.dateReception,
    supplierID: props.supplierID,
    emailSupplier: props.emailSupplier
  }];

  
    return(
        <TableBody>
          <StyledTableRow key={props._id}>         
          <StyledTableCell align="center">
          <Button>
          <GetApp/>
          <CsvDownloader filename={props._id+'_'+props.documentID}
        separator=";"
        wrapColumnChar="'"
        columns={columns}
        datas={datas}
        text="Descargar Reporte" /> 
          </Button>
            </StyledTableCell>
            <StyledTableCell align="center">{props.documentID}
            
            </StyledTableCell>
            <StyledTableCell align="center">{props.statusDocument}</StyledTableCell>
            <StyledTableCell align="center">{props.dateReception}</StyledTableCell>
            <StyledTableCell align="center">{props.supplierID}</StyledTableCell>
            <StyledTableCell align="center">{props.emailSupplier}</StyledTableCell>
          </StyledTableRow>

        </TableBody>
  )
  
 
}

export default ReportItem;
