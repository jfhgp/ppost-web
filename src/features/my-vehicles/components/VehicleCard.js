import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStore } from '../../../utils/store.util';
import ApiCalls from '../../../service/RequestHandler';
import routes from '../../../constants/route-constants';

// function getVehiclePicture(mode) {
//   switch (mode) {
//     case 'Bus':
//       break;

//     default:
//       break;
//   }
// }

class VehicleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false
    };
  }

  handleDeleteVehicle = async () => {
    this.props.store.setWithRender('messageDialog', {
      open: true,
      className: 'danger',
      actionBtnLabel: 'Delete',
      title: 'Are you sure you want to delete?',
      action: this.deleteVehicle
    });
  };

  deleteVehicle = async () => {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.deleteVehicleById(this.props.vehicle._id);
      this.props.setMyVehicles(response.data.vehicles);
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { vehicle, getVehicleCardPicture } = this.props;

    return (
      <div className="m-v-l-vehicle-card">
        <Link
          to={`/${routes.typeTransporter}/${routes.vehicles}/${routes.vehiclesDetails}/${vehicle._id}`}
        >
          <div className="text-center">
            <img
              alt="Vehicle Picture"
              src={getVehicleCardPicture(vehicle.mode)}
            />
          </div>
          <div className="item">
            <img
              alt=""
              src={require('../../../static/icons/cart-icon-name.png')}
            />
            <span style={{ textTransform: 'capitalize' }}>
              Vehicle Type : {vehicle.mode}
            </span>
          </div>

          {vehicle.make && (
            <>
              <div className="item">
                <img
                  alt=""
                  src={require('../../../static/icons/cart-icon-phone.png')}
                />
                <span>Vehicle Model : {vehicle.model}</span>
              </div>
              <div className="item">
                <img
                  alt=""
                  src={require('../../../static/icons/cart-icon-phone.png')}
                />
                <span>Vehicle Color : {vehicle.color}</span>
              </div>
            </>
          )}

          {vehicle.information && (
            <div className="item">
              <img
                alt=""
                src={require('../../../static/icons/cart-icon-name.png')}
              />
              <span>Information : {vehicle.information}</span>
            </div>
          )}

          {vehicle.airline && (
            <>
              <div className="item">
                <img
                  alt=""
                  src={require('../../../static/icons/cart-icon-earning.png')}
                />
                <span>Flight Number : {vehicle.flightNumber}</span>
              </div>
              <div className="item">
                <img
                  alt=""
                  src={require('../../../static/icons/cart-icon-earning.png')}
                />
                <span>Ticket Number : {vehicle.ticketNumber}</span>
              </div>
            </>
          )}

          {vehicle.numberPlate && (
            <div className="item">
              <img
                alt=""
                src={require('../../../static/icons/cart-icon-orders.png')}
              />
              <span>Vehicle Number: {vehicle.numberPlate}</span>
            </div>
          )}
        </Link>
        <div className="multiple-items" style={{ marginTop: '1rem' }}>
          <div
            className="item"
            onClick={this.handleDeleteVehicle}
            disabled={this.state.activity}
            style={{ cursor: 'pointer' }}
          >
            <img
              alt=""
              src={require('../../../static/icons/icon-detail.png')}
            />
            <span>Delete</span>
          </div>

          {/* <Link
            to={`${routes.vehicles}/${routes.vehiclesDetails}/${vehicle._id}`}
          >
            <div className="item">
              <img
                alt=""
                src={require('../../../static/icons/icon-detail.png')}
              />
              <span>View</span>
            </div>
          </Link> */}
        </div>
      </div>
    );
  }
}

VehicleCard.propTypes = {
  getVehicleCardPicture: PropTypes.func,
  setMyVehicles: PropTypes.func,
  vehicle: PropTypes.shape({
    documents: PropTypes.array,
    _id: PropTypes.string,
    model: PropTypes.string,
    make: PropTypes.string,
    numberPlate: PropTypes.string,
    color: PropTypes.string
  }),
  activity: PropTypes.bool,
  store: PropTypes.shape({
    setWithRender: PropTypes.func
  })
};
export default withStore(VehicleCard);
