import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  currencyUnits,
  weightUnits,
  measurementUnits,
  languages
} from '../../../utils/unit.util';
import VisaContainer from '../visa/VisaContainer';
import Page from '../../../components/layout/Page';
import { getPrimaryColors } from '../../../utils/functions';
import LicenseContainer from '../license/LicenseContainer';
import ProfileHomeComponent from '../components/ProfileHomeComponent';
import ServiceAreasContainer from '../service-areas/ServiceAreasContainer';
import { ListComponents, ListComponent } from '../components/ListComponent';
import IdentificationContainer from '../identification/IdentificationContainer';
import { dateFormat } from '../../../constants/project-constants';
import ContainerLayout from '../../../components/layout/ContainerLayout';
import FormBankAccount from '../../../components/form/FormBankAccountS';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import FormNativeSelectInputField from '../../../components/form/FormNativeSelectInputField';
import FormInputS from '../../../components/form/FormInputS';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

const TransporterProfileComponent = props => {
  const {
    activity,
    errors,
    profile,
    component,
    handleCloseDialog,
    dialogData,
    userType,
    handleChange,
    handleGetComponent,
    handleSetCurrentComponent,
    handleDialogVisibility
  } = props;
  const Comp = handleGetComponent(component);
  const travelling = profile.travelling || [];
  const { config } = profile
  const mobileWidth = useMediaQuery('(max-width:425px)');

  return (
    <Page activity={activity} className="t-profile-page">
      <div className="page-title">
        <span style={{ width: '100%', paddingBottom: 10 }}>
          {userType === 'user' ? 'Transporter Details' : 'My Profile'}
        </span>
      </div>
      <ContainerLayout>
        <div className="p-col-12 p-md-6" style={{ padding: 0, margin: 0 }}>
          <ProfileHomeComponent profile={profile} />
        </div>
        <div className="p-col-12 p-md-6">
          {/* <div className="heading-with-add-icon">
              <h3>Bank Account</h3>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            {profile.bankInfo ? (
              <div
                className={classNames([
                  '_bank-info-card',
                  ['_bank-info-card-default', profile.bankInfo.defaultAccount]
                ])}
              >
                <p
                  className={classNames([
                    'iban',
                    ['p-default', profile.bankInfo.defaultAccount]
                  ])}
                >{`IBAN ${profile.bankInfo.iban}`}</p>
                {profile.bankInfo.defaultAccount ? (
                  <img src="/assets/images/icon/icon-detail.png" alt="" />
                ) : (
                  <img src="/assets/images/icon/icon-detail.png" alt="" />
                )}
              </div>
            ) : (
              <p>We could not find any bank account against your account</p>
            )}*/}
        </div>
        {userType === 'user' ? null : (
          <ContainerLayout>
            <div className="p-col-12 p-md-6">
              <ServiceAreasContainer />
            </div>
            <div className="p-col-12 p-md-6">
              <div className="heading-with-add-icon">
                <h3>Plan a Journey</h3>
                <i
                  className="fa fa-plus-circle"
                  aria-hidden="true"
                  onClick={() => handleSetCurrentComponent('travelling-add')}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
              <div
                id="plan-a-journey"
                style={{
                  border: '1px solid #fa7816',
                  height: 200,
                  overflow: 'hidden',
                  overflowY: 'auto'
                }}
              >
                <table className="_transporter-profile-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {travelling.length ? (
                      travelling
                        .map(travel => {
                          return (
                            <ListComponents
                              key={travel._id}
                              onClick={() =>
                                handleSetCurrentComponent(
                                  'travelling-update',
                                  travel
                                )
                              }
                            // onClick={
                            //   () => null
                            //   // handleInformation({
                            //   //   isDialogVisible: true,
                            //   //   comp: TravellingInformationUpdateContainer,
                            //   //   updateTravelData: travel
                            //   // })
                            // }
                            >
                              <ListComponent />
                              <ListComponent
                                name={travel.origin.name}
                                left="/assets/images/icon/icon-DropOff.png"
                              />
                              <ListComponent
                                name={travel.destination.name}
                                left="/assets/images/icon/icon-Pickup.png"
                              />
                              <ListComponent
                                name={moment(travel.date).format(dateFormat)}
                              />
                            </ListComponents>
                          );
                        })
                        .reverse()
                    ) : (
                        <tr>
                          <td style={{ textAlign: 'center' }} colSpan={4}>
                            We could not find any journeys for you!
                        </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            {props.hideBankAccount ? null : (
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
                  <h3 className="heading-with-add-icon">Bank Account</h3>
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
                <div
                  className="p-grid"
                  style={{ margin: '0', padding: '0.5em 0' }}
                >
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
            )}
            {/* document row start */}
            <div className="p-col-12">
              <h3 className="heading-with-add-icon">Documents</h3>

              <div className="p-grid">
                {/* id card grid start */}
                <div className="p-col-12 p-lg-4">
                  <IdentificationContainer profile={profile} />
                </div>
                {/* id card grid end */}
                {/* passport grid end */}
                <div className="p-col-12 p-lg-4">
                  <VisaContainer profile={profile} />
                </div>
                {/* passport grid end */}

                {/* driving licence grid start */}
                <div className="p-col-12 p-lg-4">
                  <LicenseContainer profile={profile} />
                </div>
                {/* driving licence grid end */}
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
                <h3 className="heading-with-add-icon">Preferences</h3>
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
                    isDisabled={true}
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
                    isDisabled={true}
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
                    isDisabled={true}
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
                    isDisabled={true}
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
        )}

        {/* document row end */}
      </ContainerLayout>
      <Dialog
        className="full-width-dialog"
        maxWidth="sm"
        open={props.isDialogVisibleAddBankAccount}
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
              onSubmit={dialogData.onSubmit || handleDialogVisibility}
              style={{
                width: 'unset',
                borderRadius: 4
              }}
            />
          </DialogActions>
        </div>
      </Dialog>

      <Dialog
        open={props.isDialogVisible}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <Comp
          profile={profile}
          activity={activity}
          componentData={props.componentData}
          handleInformation={props.handleInformation}
          handleSetCurrentComponent={handleSetCurrentComponent}
        />
      </Dialog>
    </Page>
  );
};

TransporterProfileComponent.propTypes = {
  hideBankAccount: PropTypes.bool,
  handleChange: PropTypes.func,
  dialogData: PropTypes.shape(),
  errors: PropTypes.shape(),
  handleUpdateDefaultCard: PropTypes.func,
  bankAccounts: PropTypes.arrayOf(PropTypes.object),
  handleAddBankAccount: PropTypes.func,
  activity: PropTypes.bool,
  profile: PropTypes.shape({}),
  isDialogVisible: PropTypes.bool,
  isDialogVisibleAddBankAccount: PropTypes.bool,
  handleInformation: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  handleGetComponent: PropTypes.func,
  handleSetCurrentComponent: PropTypes.func,
  handleDialogVisibility: PropTypes.func
};

export default TransporterProfileComponent;
