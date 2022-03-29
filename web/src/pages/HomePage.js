import React from "react";
import ReactDom from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import HomeLayout from '../components/layout/home-layout/HomeLayout';

const HomePage = () => {
  return (
    <div>
      <CssBaseline />
      <HomeLayout />
      
    </div>
  )
};

ReactDom.render(<HomePage />, document.getElementById('root'));
