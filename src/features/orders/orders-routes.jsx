import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from '../../AppLayout';
import routes from '../../constants/route-constants';

// orders list
import OrdersList from './list/OrdersListContainer';
// orders add
import OrdersAdd from './add/OrdersAddContainer';
// edit
import OrdersEdit from './update/OrderUpdateContainer';
// orders details
import OrdersDetails from './details/OrdersDetailsContainer';

const OrdersRoutes = () => {
  return (
    <Switch>
      {/* List */}
      <PrivateRoute
        path={`/${routes.typeUser}/${routes.orders}`}
        exact
        component={OrdersList}
      />

      {/* Add */}
      <PrivateRoute
        path={`/${routes.typeUser}/${routes.orders}/${routes.addOrder}`}
        exact
        component={OrdersAdd}
      />

      {/* Details */}
      <PrivateRoute
        path={`/${routes.typeUser}/${routes.orders}/${routes.orderDetail}/:id`}
        component={OrdersDetails}
      />

      {/* Edit Order */}
      <PrivateRoute
        path={`/${routes.typeUser}/${routes.orders}/:type/:id`}
        component={OrdersEdit}
      />
      {/* Duplicate Order */}
      <PrivateRoute
        path={`/${routes.typeUser}/${routes.orders}/:type/:id`}
        component={OrdersEdit}
      />
      <PrivateRoute
        path={`/${routes.typeUser}/${routes.orders}/:status`}
        exact
        component={OrdersList}
      />
      {/* Not Found */}
      <Redirect to="/404" />
    </Switch>
  );
};

export default OrdersRoutes;
