import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../AppLayout';
import routes from '../../constants/route-constants';

// service areas list
import ServiceAreasList from './list/ServiceAreasListContainer';

const ServiceAreasRoutes = () => {
  return (
    <Switch>
      {/* List */}
      <PrivateRoute
        path={`/${routes.typeTransporter}/${routes.serviceAreas}`}
        exact
        component={ServiceAreasList}
      />

      {/* Not Found */}
      <Redirect to="/404" />
    </Switch>
  );
};

export default ServiceAreasRoutes;
