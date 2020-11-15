import React from 'react';

import { Grid } from '@material-ui/core';

import LoginCard from '../containers/LoginCard';
import routes from '../constants/route-constants';
import { colors } from '../constants/colors';

const LoginCards = () => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <LoginCard
          name="Transporters"
          bgColor={colors.blueToRight}
          btnBgColor={colors.blueToRight}
          btnText="Click Here"
          route={routes.typeTransporter}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LoginCard
          name="Customers"
          bgColor={colors.orangeToRight}
          btnBgColor={colors.blueToRight}
          btnText="Click Here"
          route={routes.typeUser}
        />
      </Grid>
    </>
  );
};

LoginCards.propTypes = {};

export default LoginCards;
