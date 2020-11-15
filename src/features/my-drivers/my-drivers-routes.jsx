import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../AppLayout';
import routes from '../../constants/route-constants';

// my drivers list
import MyDriversList from './list/MyDriversListContainer';
// my drivers add
import MyDriversAdd from './add/MyDriversAddContainer';
// my drivers profile
import MyDriversProfile from './profile/MyDriversProfileContainer';

const MyDriversRoutes = () => {
  return (
    <Switch>
      {/* List */}
      <PrivateRoute
        path={`/${routes.typeTransporter}/${routes.myDrivers}`}
        exact
        component={MyDriversList}
      />

      {/* Add */}
      <PrivateRoute
        path={`/${routes.typeTransporter}/${routes.myDrivers}/${routes.addDriver}`}
        exact
        component={MyDriversAdd}
      />

      {/* Profile */}
      <PrivateRoute
        path={`/${routes.typeTransporter}/${routes.myDrivers}/:driverId`}
        exact
        component={MyDriversProfile}
      />

      {/* Not Found */}
      <Redirect to="/404" />
    </Switch>
  );
};

export default MyDriversRoutes;
