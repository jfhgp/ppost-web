import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Switch,
  FormControlLabel
} from '@material-ui/core';

import { withStore } from '../utils/store.util';
import ApiCalls from '../service/RequestHandler';

class VehicleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.vehicle.active,
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

  handleToggleChange = async e => {
    const { value } = e.target;
    this.setState({ activity: true, active: !JSON.parse(value) });

    try {
      await ApiCalls.markVehicleAvailable({
        _id: this.props.vehicle._id,
        active: !JSON.parse(value)
      });
      this.setState({ activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { vehicle } = this.props;

    return (
      <Card
        className={!vehicle.active ? 'vehicle-card in-active' : 'vehicle-card'}
      >
        <CardContent>
          <div className="content">
            <div>
              <p style={{ textTransform: 'capitalize' }}>{vehicle.mode}</p>
              <p>{vehicle.numberPlate}</p>
            </div>
            {vehicle.make && (
              <p>
                {vehicle.color} {vehicle.make} {vehicle.model}
              </p>
            )}
            {vehicle.information && <p>{vehicle.information}</p>}
            {vehicle.airline && (
              <p>
                {vehicle.airline} {vehicle.flightNumber}
              </p>
            )}

            {vehicle.documents ? (
              <div className="documents">
                {vehicle.documents.length} document(s)
                {vehicle.documents.length ? (
                  <button
                    onClick={() =>
                      this.props.onDocumentClick(vehicle.documents)
                    }
                  >
                    <i className="fas fa-info-circle" />
                  </button>
                ) : null}
              </div>
            ) : null}
            {vehicle.vehiclePictures ? (
              <div className="documents">
                {vehicle.vehiclePictures.length} Vehicle picture(s)
                {vehicle.vehiclePictures.length ? (
                  <button
                    onClick={() =>
                      this.props.onDocumentClick(vehicle.vehiclePictures)
                    }
                  >
                    <i className="fas fa-info-circle" />
                  </button>
                ) : null}
              </div>
            ) : null}

            {vehicle.numberPlatePicture ? (
              <div className="documents">
                {vehicle.numberPlatePicture.length} Picture
                {vehicle.numberPlatePicture.length ? (
                  <button
                    onClick={() =>
                      this.props.onDocumentClick(vehicle.numberPlatePicture)
                    }
                  >
                    <i className="fas fa-info-circle" />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardActions>
          <div className="actions">
            <FormControlLabel
              disabled={this.state.activity}
              control={
                <Switch
                  color="primary"
                  value={this.state.active}
                  checked={this.state.active}
                  onChange={this.handleToggleChange}
                />
              }
              label="Available"
              labelPlacement="start"
              style={{ margin: 0 }}
            />
            <Button
              size="small"
              onClick={this.handleDeleteVehicle}
              disabled={this.state.activity}
              style={{ color: 'rgb(244, 67, 54)' }}
            >
              Delete
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
}

VehicleCard.propTypes = {
  onDocumentClick: PropTypes.func,
  setMyVehicles: PropTypes.func,
  vehicle: PropTypes.shape({
    documents: PropTypes.array,
    _id: PropTypes.string,
    active: PropTypes.bool,
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
