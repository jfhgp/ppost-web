import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import routes from '../../../constants/route-constants';
import { capitalize } from '../../../utils/functions';
import { dateFormat } from '../../../constants/project-constants';

const OrderCard = props => {
  const { request } = props;
  return (
    <Card className="o-list-order-card">
      <CardContent>
        <Typography variant="subtitle2">#{request.orderNumber}</Typography>
        <Typography variant="body1" color="textSecondary">
          {moment(request.pickupDate).format(dateFormat)}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {capitalize(request.deliveryType)}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {capitalize(request.status)}
        </Typography>
        <div className="pickup">
          <div>
            <i className="fas fa-caret-up" />
            <Typography variant="body1" color="textSecondary">
              {request.pickup.address}
            </Typography>
          </div>
          <div>
            <i className="fas fa-map-marker-alt" />
            <Typography variant="body1" color="textSecondary">
              {request.dropoff.address}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Link
          to={`/${routes.typeUser}/${routes.orders}/${routes.orderDetail}/${request._id}`}
          target={props.target}
        >
          <Button size="small" variant="contained">
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

OrderCard.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string,
    deliveryType: PropTypes.string,
    pickupDate: PropTypes.string,
    pickup: PropTypes.shape()
  }),
  target: PropTypes.string
};

export default OrderCard;
