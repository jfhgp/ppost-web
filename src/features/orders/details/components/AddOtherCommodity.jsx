import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from "lodash";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormInputS from '../../../../components/form/FormInputS';
import { timeFormat } from '../../../../constants/project-constants';
import ApiCalls from '../../../../service/RequestHandler';

import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';



const AddOtherCommodity = props => {

  const { errors, activity } = props
  return (
    <div className="cancel-request-dialog">
      <DialogTitle>Enter Your commodity Name</DialogTitle>
      <DialogContent>

        <div className="p-col-12 p-md-12 p-lg-12">
          <FormInputS
            name="commodityName"
            value={props.commodityName}
            onChange={props.onInputChange}
            placeholder="Commodity Name"
            left={
              <img
                style={{ width: '1rem' }}
                alt=""
                src={require('../../../../static/icons/fragile-icon.png')}
              />
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          <FormSubmitBtn
            label="Cancel"
            disabled={activity}
            onSubmit={props.handleDialogClose}
            style={{ width: 'unset', borderRadius: 4 }}
          />
          <FormSubmitBtn
            className="confirm-btn"
            label="Submit"
            disabled={activity}
            onSubmit={props.handleAddCategory}
            style={{
              width: 'unset',
              borderRadius: 4
            }}


          />
        </div>

      </DialogActions>
    </div>
  );

}

export default AddOtherCommodity;

AddOtherCommodity.propTypes = {
  cancelType: PropTypes.string,
  handleSetDetails: PropTypes.func,
  handleDialogClose: PropTypes.func,
  details: PropTypes.shape({
    _id: PropTypes.string,
    pickupTime: PropTypes.shape(),
    pickupDate: PropTypes.string
  })
};
