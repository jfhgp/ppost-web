import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../AppLayout';
import routes from '../../constants/route-constants';

// service areas list
import MyFinancesList from './list/MyFinancesListContainer';

const MyFinancesRoutes = () => {
  return (
    <Switch>
      {/* List */}
      <PrivateRoute
        path={`/${routes.typeTransporter}/${routes.myEarnings}`}
        exact
        component={MyFinancesList}
      />

      {/* Not Found */}
      <Redirect to="/404" />
    </Switch>
  );
};

export default MyFinancesRoutes;
