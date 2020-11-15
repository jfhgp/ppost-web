import React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import { Typography } from '@material-ui/core';
import { colors } from '../constants/colors';

const Inquire = props => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 100,
        backgroundColor: '#010101',
        textAlign: 'center',
        padding: '20px 0px',
        color: '#f1f1f1'
      }}
    >
      <Typography variant="h4" color="inherit">
        {props.heading}
      </Typography>
      <hr
        style={{
          width: 70,
          height: 1,
          background: colors.orange,
          border: 'none',
          outline: 'none',
          margin: '15px auto'
        }}
      />

      <ButtonComponent bgColor={colors.orange} borderRadius="15px">
        Inquire Now
      </ButtonComponent>
    </div>
  );
};

export default Inquire;
