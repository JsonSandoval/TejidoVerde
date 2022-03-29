import React from "react";
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

//import ReceptorsView from '../components/views/dashboard/ReceptorsView' 
import AdminView from '../components/views/dashboard/AdminView' 
import ReceptorsView from '../components/views/dashboard/ReceptorsView'
import ReportsView from '../components/views/dashboard/ReportsView'

import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardLayout from '../components/layout/dashboard-layout/DashboardLayout';

const DashboardPage = () => {
  return (
    <div>
      <Router>
       <DashboardLayout>
         <Switch>
           <Route path="/dashboard">
            <AdminView />
           </Route>
           <Route path="/receptors">
            <ReceptorsView />
           </Route>
           <Route path="/reports">
            <ReportsView />
           </Route>
         </Switch>
       </DashboardLayout>
      </Router>
    </div>
  )
};

ReactDom.render(<DashboardPage />, document.getElementById('root'));
