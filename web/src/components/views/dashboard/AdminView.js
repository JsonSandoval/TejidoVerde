import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddUser from '../../custom/AddUser';

function AdminView() {

/*
  const [admin, setAdmin] = useState([]);//state para acceder a las propiedades de un elemento HTML - 
  const [ID, setAdminID] = useState('');// busca por ID receptor - value=""
  const [company, setAdmin] = useState('');

  const getReceptors = async () => {
    try {
      const response = await axios.post('/api/receptors',{ID, company});  // Get o post, de acuerdo a la consulta por axios /{} 
      setReceptors(response.data);
    } catch (error) {
      setReceptors([]);
      console.log(err)
    }
  }
  useEffect(() => {
    getReceptors();
  }, []);

 /*const renderReceptors = () => {
    if (receptors.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return receptors.map(receptors => {
      return (

        <ReceptorItem key={receptors._id}{...receptors} />
      )
    })
  };

  const searchByFilter = () => {
    getReceptors();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (event.currentTarget.name === 'ID'){
     return setReceptorsID(value);
    }
    setReceptorsCompany(value);
  };*/

  return (
    <div>
     
     
    </div>
  )

}

export default AdminView;

