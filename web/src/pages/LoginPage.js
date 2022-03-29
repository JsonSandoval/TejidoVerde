import React from "react";
import ReactDom from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import LoginLayout from '../components/layout/login-layout/LoginLayout';

const LoginPage = () => {
  return (
    <div>
      <CssBaseline />
      <LoginLayout />
      
    </div>
  )
};

ReactDom.render(<LoginPage />, document.getElementById('root'));
