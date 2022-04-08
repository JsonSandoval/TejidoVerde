import React, { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';




import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings'
import HomeIcon from '@material-ui/icons/HomeWork';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = useMemo(
    () =>
      forwardRef((linkProps, ref) => (

        <Link ref={ref} to={to} {...linkProps} />

      )),
    [to],
  );


  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.node,
  primary: PropTypes.string,
  to: PropTypes.string
};


export const mainListItems = (
  <div>
    {/*
    <ListItemLink icon={<HomeIcon />} to='/dashboard' primary="Mi Empresa" />
    <ListItemLink icon={<PeopleIcon />} to='/receptors' primary="Clientes" />
    <ListItemLink icon={<BarChartIcon />} to='/reports' primary="Reportes" />
    <ListItemLink icon={<SettingsIcon />} to='/settings' primary="Configuración" />*/}
    <ListItemLink icon={<PeopleIcon />} to='/recyclers' primary="Recicladores" />
  </div>
);

