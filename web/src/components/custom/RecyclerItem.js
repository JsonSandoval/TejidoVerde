import React from 'react';
import PropTypes from 'prop-types';

const RecyclerItem = (props) => {
  return (
    <div>
      <div>
        <p>Teléfono: {props.phone}</p>
      </div>
      <div>
        <p>Correo: {props.email}</p>
      </div>
    </div> 
    
)
};

RecyclerItem.propTypes={
  ID: PropTypes.string,
  email: PropTypes.string
}

export default RecyclerItem;
