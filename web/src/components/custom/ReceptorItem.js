import React from 'react';
import PropTypes from 'prop-types';

const ReceptorItem = (props) => {
  return (
    <div>
      <div>
        <p>N° Identificación: {props.ID}</p>
      </div>
    </div> 
    
)
};

ReceptorItem.propTypes={
  ID: PropTypes.string,
  email: PropTypes.string
}

export default ReceptorItem;
