import PropTypes from 'prop-types';
import React from 'react';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import {
  FormControlLabel,
  Switch
} from '@material-ui/core';
import {
  currencyUnits,
  weightUnits,
  measurementUnits,
  languages
} from '../../utils/unit.util';
import Page from '../../components/layout/Page';
import FormInputS from '../../components/form/FormInputS';
import { getPrimaryColors } from '../../utils/functions';
import FormSubmitBtn from '../../components/form/FormSubmitBtn';
import FormNativeSelectInputField from '../../components/form/FormNativeSelectInputField';
import FormBankAccount from '../../components/form/FormBankAccountS';
import ContainerLayout from '../../components/layout/ContainerLayout';



const TransporterSettingsComponent = props => {
  const {
    isUpdate,
    errors,
    activity,
    dialogData,
    notifications,
    twoFactorLogin,
    handleChange,
    handleDialogVisibility,
    handleChangePassoword,
    user,
    handleToggleChange
  } = props;
  const mobileWidth = useMediaQuery('(max-width:425px)');

  return (
    <Page activity={activity} className="u-profile-page" noActivity>
      <div className="page-title">
        <span>Settings</span>
      </div>
      <ContainerLayout>
        <div
          className="p-col-12 p-lg-6"
          style={
            mobileWidth
              ? { padding: '0.5em', fontSize: '0.85em' }
              : {}
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1em'
            }}
          >
            <span className="heading" style={{ padding: '0' }}>
              Profile
            </span>
          </div>
          <div
            style={{
              fontSize: '1.2em',
              padding: '0.5em 0.65em',
              display: 'flex',
              justifyContent: 'space-between',
              color: getPrimaryColors('primary'),
              borderBottom: '1px solid',
              borderColor: getPrimaryColors('secondary')
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ minWidth: 75, display: 'inline-block' }}>
                Name :
              </span>{' '}
              {props.firstName} {props.lastName}
            </p>
          </div>
          <div
            className="show-on-hover"
            style={{
              fontSize: '1.2em',
              padding: '0.5em 0.65em',
              display: 'flex',
              justifyContent: 'space-between',
              color: getPrimaryColors('primary'),
              borderBottom: '1px solid',
              borderColor: getPrimaryColors('secondary')
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ minWidth: 75, display: 'inline-block' }}>
                Email :
              </span>{' '}
              {props.email}
            </p>
            <button
              style={{
                width: 'unset',
                background: 'none',
                padding: 0,
                border: 'none',
                color: getPrimaryColors('primary'),
                filter: 'none',
                fontSize: '0.9em'
              }}
              onClick={() =>
                handleDialogVisibility(true, {
                  heading: 'Edit Email',
                  values: [
                    {
                      name: 'email',
                      placeholder: 'Email'
                    }
                  ]
                })
              }
            >
              <i className="fas fa-pencil-alt" />
            </button>
          </div>
          <div
            style={{
              fontSize: '1.2em',
              padding: '0.5em 0.65em',
              display: 'flex',
              justifyContent: 'space-between',
              color: getPrimaryColors('primary'),
              borderBottom: '1px solid',
              borderColor: getPrimaryColors('secondary')
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ minWidth: 75, display: 'inline-block' }}>
                Phone :
              </span>{' '}
              +{props.mobile}
            </p>
          </div>
        </div>
        {/* {props.hideBankAccount ? null : (
          <div
            className="p-col-12"
            style={
              mobileWidth
                ? { padding: '0.5em', fontSize: '0.85em' }
                : { padding: '1em 0' }
            }
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1em'
              }}
            >
              <span className="heading" style={{ padding: 0 }}>
                Bank Account
              </span>
              <button
                disabled={activity}
                style={{
                  padding: 0,
                  width: 'unset',
                  filter: 'none',
                  border: 'none',
                  background: 'none',
                  outline: 'none'
                }}
                onClick={() =>
                  handleDialogVisibility(true, {
                    name: 'iban',
                    heading: 'Add Bank Account',
                    values: [
                      {
                        name: 'iban',
                        placeholder: 'Please type your IBAN number'
                      }
                    ],
                    onSubmit: props.handleAddBankAccount
                  })
                }
              >
                <i
                  className="fas fa-plus"
                  style={{
                    padding: 5,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    color: getPrimaryColors('primary')
                  }}
                />
              </button>
            </div>
            <div className="p-grid" style={{ margin: '0', padding: '0.5em 0' }}>
              {props.bankAccounts.length
                ? props.bankAccounts.map(account => (
                    <div
                      key={account._id}
                      className="p-col-12 p-lg-6"
                      style={{ padding: '0.5em 1em' }}
                    >
                      <FormBankAccount
                        _id={account._id}
                        value={account.iban}
                        checked={account.defaultAccount}
                        onChange={props.handleUpdateDefaultCard}
                        style={
                          account.defaultAccount
                            ? { borderColor: 'rgb(44,116,24)' }
                            : {}
                        }
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        )} */}
        <div
          className="p-col-12 p-lg-6"
          style={
            mobileWidth
              ? { padding: '0.5em', fontSize: '0.85em' }
              : { padding: '1em' }
          }
        >
          <FormControlLabel
            control={
              <Switch
                color="primary"
                name="notifications"
                checked={notifications}
                onChange={handleToggleChange}
              />
            }
            label="Notifications"
            labelPlacement="start"
            className="menu-toggle"
          />


          <FormControlLabel
            control={
              <Switch
                color="primary"
                name="twoFactorLogin"
                checked={twoFactorLogin}
                onChange={handleToggleChange}
              />
            }
            label="Two Factor Authentication"
            labelPlacement="start"
            className="menu-toggle"
          />
        </div>

        <div
          className="p-col-12 p-lg-6"
          style={
            mobileWidth
              ? { padding: '0.5em', fontSize: '0.85em' }
              : {}
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1em'
            }}
          >
            <span className="heading" style={{ padding: '0' }}>
              Change Password
            </span>
          </div>
          <div
            className="show-on-hover"
            style={{
              fontSize: '1.2em',
              padding: '0.5em 0.65em',
              display: 'flex',
              justifyContent: 'space-between',
              color: getPrimaryColors('primary'),
              borderBottom: '1px solid',
              borderColor: getPrimaryColors('secondary')
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ minWidth: 75, display: 'inline-block' }}>
                Password :
              </span>{' '}
              {props.password}
            </p>
            <button
              style={{
                width: 'unset',
                background: 'none',
                padding: 0,
                border: 'none',
                color: getPrimaryColors('primary'),
                filter: 'none',
                fontSize: '0.9em'
              }}
              onClick={() =>
                handleDialogVisibility(true, {
                  heading: 'Are you sure you want to change password?',
                  values: [
                    {
                      name: 'oldPassword',
                      placeholder: 'Old Password',
                      type: "password"
                    },
                    {
                      name: 'newPassword',
                      placeholder: 'NewPassword',
                      type: "password"
                    }
                  ]
                })
              }
            >
              <i className="fas fa-pencil-alt" />
            </button>
          </div>
        </div>

        <div
          className="p-col-12"
          style={
            mobileWidth
              ? { padding: '0.5em', fontSize: '0.85em' }
              : { padding: '1em 0' }
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1em'
            }}
          >
            <span className="heading" style={{ padding: '0' }}>
              Preferences
            </span>
          </div>
          <div className="p-grid" style={{ margin: '0', padding: '0.5em 0' }}>
            <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Currency
              </div>
              <FormNativeSelectInputField
                name="currency"
                type="react-select"
                style={{ padding: 0 }}
                value={
                  currencyUnits.find(
                    options => options.value === props.currency.value
                  ) || { value: '', label: 'Currency' }
                }
                onChange={handleChange}
                options={currencyUnits}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Language
              </div>
              <FormNativeSelectInputField
                name="language"
                type="react-select"
                style={{ padding: 0 }}
                // error={this.state.error}
                value={
                  languages.find(
                    options => options.value === props.language.value
                  ) || { value: '', label: 'Language' }
                }
              // onChange={this.handleChange}
              // options={this.state.myVehicles}
              // getOptionValue={item => item._id}
              // formatOptionLabel={item => getVehicleName(item)}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Weight
              </div>
              <FormNativeSelectInputField
                name="weightUnit"
                type="react-select"
                style={{ padding: 0 }}
                value={
                  weightUnits.find(
                    options => options.value === props.weightUnit.value
                  ) || { value: '', label: 'Weight' }
                }
                onChange={handleChange}
                options={weightUnits}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-3" style={{ padding: '1em' }}>
              <div
                className="p-col-12"
                style={{ fontWeight: 'bold', color: '#2c2d5b' }}
              >
                Dimension
              </div>
              <FormNativeSelectInputField
                name="measurementUnit"
                type="react-select"
                style={{ padding: 0 }}
                value={
                  measurementUnits.find(
                    options => options.value === props.measurementUnit.value
                  ) || { value: '', label: 'Measurement' }
                }
                onChange={handleChange}
                options={measurementUnits}
              />
            </div>
          </div>
        </div>
      </ContainerLayout>
      <div
        className="text-right"
        style={{
          padding: '2em',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}
      >
        {isUpdate ? (
          <FormSubmitBtn
            label="Update"
            disabled={activity}
            onSubmit={props.handleUpdateProfile}
            style={{ width: 'unset', borderRadius: 4 }}
          />
        ) : null}
      </div>
      <Dialog
        className="full-width-dialog"
        maxWidth="sm"
        open={props.isDialogVisible}
        onClose={handleDialogVisibility}
      >
        <div className="user-settings-dialog">
          <DialogTitle>{dialogData.heading || ''}</DialogTitle>
          <div className="content">
            {dialogData.values.map((item, i) => (
              <div
                key={`update-item-${i + 1}`}
                style={{ paddingBottom: '1em' }}
              >
                <FormInputS
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  value={props[item.name]}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  error={errors[item.name]}
                />
              </div>
            ))}
          </div>
          <DialogActions style={{ paddingTop: 0 }}>
            <FormSubmitBtn
              label="Submit"
              disabled={activity}
              onSubmit={isUpdate ? dialogData.onSubmit || handleDialogVisibility : handleChangePassoword}
              style={{
                width: 'unset',
                borderRadius: 4
              }}
            />
          </DialogActions>
        </div>
      </Dialog>
    </Page >
  );
};

TransporterSettingsComponent.defaultProps = {
  dialogData: { values: [] },
  profile: {
    picture: '',
    firstName: '',
    lastName: ''
  }
};

TransporterSettingsComponent.propTypes = {
  isUpdate: PropTypes.bool,
  email: PropTypes.string,
  activity: PropTypes.bool,
  mobile: PropTypes.string,
  errors: PropTypes.shape(),
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  handleChange: PropTypes.func,
  dialogData: PropTypes.shape(),
  hideBankAccount: PropTypes.bool,
  isDialogVisible: PropTypes.bool,
  handleUpdateProfile: PropTypes.func,
  handleAddBankAccount: PropTypes.func,
  handleDialogVisibility: PropTypes.func,
  handleUpdateDefaultCard: PropTypes.func,
  bankAccounts: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.shape({ value: PropTypes.string }),
  language: PropTypes.shape({ value: PropTypes.string }),
  weightUnit: PropTypes.shape({ value: PropTypes.string }),
  measurementUnit: PropTypes.shape({ value: PropTypes.string })
};

export default TransporterSettingsComponent;
