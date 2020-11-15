import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/layout/Page';
import FormInputS from '../../../components/form/FormInputS';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';

const MyDriversAddComponent = props => {
  const { onInputChange, activity, errors } = props;

  return (
    <Page className="m-d-add-page" activity={activity} noActivity>
      <div className="page-title">
        <span>Add Driver</span>
      </div>
      <div className="p-grid" style={{ padding: '1em', margin: 0 }}>
        <div className="p-col-12 p-sm-6">
          <FormInputS
            name="firstName"
            label="First Name"
            value={props.firstName}
            placeholder="First Name"
            onChange={onInputChange}
            error={errors.firstName}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInputS
            name="lastName"
            label="Last Name"
            value={props.lastName}
            placeholder="Last Name"
            error={errors.lastName}
            onChange={onInputChange}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInputS
            name="email"
            type="email"
            label="Email"
            value={props.email}
            placeholder="Email"
            error={errors.email}
            onChange={onInputChange}
          />
        </div>
        <div className="p-col-12 p-sm-6">
          <FormInputS
            inputType="number"
            name="mobile"
            label="Phone Number"
            value={props.mobile}
            error={errors.mobile}
            onChange={onInputChange}
            placeholder="Phone Number"
          />
        </div>
        <div className="p-col-12 text-right" style={{ padding: '1eem' }}>
          <FormSubmitBtn
            onSubmit={props.onSubmit}
            disabled={props.activity}
            style={{ width: 'unset', borderRadius: 4 }}
          />
        </div>
      </div>
    </Page>
  );
};

MyDriversAddComponent.propTypes = {
  email: PropTypes.string,
  onSubmit: PropTypes.func,
  activity: PropTypes.bool,
  mobile: PropTypes.string,
  errors: PropTypes.shape(),
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  onInputChange: PropTypes.func
};

export default MyDriversAddComponent;
