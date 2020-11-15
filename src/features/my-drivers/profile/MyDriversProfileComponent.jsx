import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  ListComponents,
  ListComponent
} from '../../profile/components/ListComponent';
import Page from '../../../components/layout/Page';
import VisaContainer from '../../profile/visa/VisaContainer';
import { dateFormat } from '../../../constants/project-constants';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import LicenseContainer from '../../profile/license/LicenseContainer';
import ProfileHomeComponent from '../../profile/components/ProfileHomeComponent';
import ServiceAreasContainer from '../../profile/service-areas/ServiceAreasContainer';
import IdentificationContainer from '../../profile/identification/IdentificationContainer';
import { Dialog } from '@material-ui/core';
import DriverStatsComponent from '../../../components/DriverStatsComponent';
import VehicleCard from '../../my-vehicles/components/VehicleCard';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';

const MyDriversProfileComponent = props => {
  const {
    activity,
    profile,
    component,
    handleCloseDialog,
    handleGetComponent,
    handleSetCurrentComponent
  } = props;

  const Comp = handleGetComponent(component);
  const travelling = profile.travelling || [];

  return (
    <Page activity={activity} className="t-profile-page">
      <div className="page-title">
        <span style={{ width: '100%', paddingBottom: 10 }}>Driver Profile</span>
      </div>
      <div className="p-grid">
        <div className="p-col-12 p-md-6" style={{ padding: 0, margin: 0 }}>
          <ProfileHomeComponent profile={profile} />
        </div>
        <div className="p-col-12 p-md-6">
          <DriverStatsComponent stats={profile.stats || {}} />
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
        <div className="p-col-12 p-md-6">
          <ServiceAreasContainer
            disableAdd={false}
            _id={profile._id}
            forceGetFromId
          />
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
                          // handleInformation({
                          //   isDialogVisible: true,
                          //   comp: TravellingInformationUpdateContainer,
                          //   updateTravelData: travel
                          // })
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

        {/* driver vehicle row start */}

        <div className="p-col-12">
          <h3 className="heading-with-add-icon">Vehicles</h3>
          {profile.vehicles && profile.vehicles.length ? (
            profile.vehicles.map(vehicle => (
              <div
                key={vehicle._id}
                className="p-col-12 p-sm-6 p-md-6 p-lg-4 p-xl-3"
              >
                <VehicleCard
                  vehicle={vehicle}
                  activity={activity}
                  getVehicleCardPicture={props.getVehicleCardPicture}
                />
              </div>
            ))
          ) : (
            <div className="p-col-12">
              <EmptyPlaceholder message="We could not find any vehicles." />
            </div>
          )}
        </div>

        {/* driver vehicle start */}

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
        {/* document row end */}

        <div className="p-col-12 text-right">
          <FormSubmitBtn
            label="View Requests"
            disabled={activity || profile.deleted}
            style={{ borderRadius: 4, width: 'unset' }}
            onSubmit={() => handleSetCurrentComponent('driver-requests')}
          />
          <FormSubmitBtn
            className="cancel-btn"
            onSubmit={props.handleBlockDriver}
            disabled={activity || profile.deleted}
            style={{ borderRadius: 4, width: 'unset' }}
            label={profile.blocked ? 'Unblock' : 'Block'}
          />
          <FormSubmitBtn
            className="cancel-btn"
            onSubmit={props.handleDeleteDriver}
            disabled={activity || profile.deleted}
            style={{ borderRadius: 4, width: 'unset' }}
            label={profile.deleted ? 'Deleted' : 'Delete'}
          />
        </div>
      </div>
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
          handleCloseDialog={props.handleCloseDialog}
          handleInformation={props.handleInformation}
          handleSetCurrentComponent={handleSetCurrentComponent}
        />
      </Dialog>
    </Page>
  );
};

MyDriversProfileComponent.defaultProps = {
  profile: {
    _id: '',
    orders: [],
    picture: '',
    lastName: '',
    deleted: false,
    blocked: false,
    banned: false,
    active: false,
    firstName: '-',
    email: 'email',
    mobile: 'mobile',
    isVerified: false,
    isSubDriver: false
  }
};

MyDriversProfileComponent.propTypes = {
  activity: PropTypes.bool,
  status: PropTypes.string,
  handleChange: PropTypes.func,
  handleDeleteDriver: PropTypes.func,
  handleBlockDriver: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  handleGetComponent: PropTypes.func,
  handleSetCurrentComponent: PropTypes.func,
  handleInformation: PropTypes.func,
  getVehicleCardPicture: PropTypes.func,
  profile: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    picture: PropTypes.string,
    active: PropTypes.bool,
    banned: PropTypes.bool,
    isSubDriver: PropTypes.bool,
    isVerified: PropTypes.bool,
    totalOrders: PropTypes.number,
    rating: PropTypes.number,
    mode: PropTypes.arrayOf(PropTypes.string),
    serviceAreas: PropTypes.arrayOf(PropTypes.shape()),
    config: PropTypes.shape()
  })
};

export default MyDriversProfileComponent;
