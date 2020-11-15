import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import {
  DialogTitle,
  DialogContent,
  DialogActions
} from '../../../components/dashboard-ui/Earnings/Dialog';
import FormInputS from '../../../components/form/FormInputS';
import SelectInput from '../../../components/form/SelectInput';
import RequestCard from '../../requests/components/RequestCard';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import FormDateInputField from '../../../components/form/FormDateInputField';
import FinanceCardComponent from '../../../components/dashboard-ui/Earnings/FinanceCardComponent';
import ContainerLayout from '../../../components/layout/ContainerLayout';

const vehicleLabel = {
  air: ['airline', 'flightNumber'],
  bus: ['information'],
  train: ['information'],
  sea: ['information'],
  van: ['model', 'numberPlate'],
  car: ['model', 'numberPlate'],
  bike: ['model', 'numberPlate'],
  truck: ['model', 'numberPlate']
};

const MyFinancesListComponent = props => {
  const {
    user,
    errors,
    activity,
    myFinances,
    dialogData,
    handleChange,
    filterResults
  } = props;
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');

  const btnFontSize = mobileWidth
    ? { fontSize: '0.9rem' }
    : { fontSize: '1.2rem' };

  return (
    <Page activity={activity} className="m-f-list-page">
      <div className="page-title">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          Earnings
        </span>
      </div>
      <ContainerLayout>
        <div className="p-col-12">
          <div className="p-grid">
            <div className="p-col-12 p-md-6 p-lg-3">
              <SelectInput
                label="Drivers"
                placeholder="Drivers"
                name="transporterIds"
                error={errors.transporterIds}
                value={props.transporterIds}
                onChange={props.handleChangeMultiple}
                multiple
                options={props.myDrivers.map(driver => {
                  let _id = driver._id;
                  let value = driver.firstName + ' ' + driver.lastName;
                  return { value, _id };
                })}
              />
            </div>


            <div className="p-col-12 p-md-6 p-lg-3">
              <SelectInput
                label="Vehicles"
                placeholder="Vehicles"
                error={errors.vehicles}
                value={props.vehicles}
                name="vehicles"
                onChange={props.handleChangeMultiple}
                multiple
                options={props.myVehicles.map(vehicle => {
                  let _id = vehicle._id;
                  let value = vehicleLabel[vehicle.mode]
                    .map(label => vehicle[label])
                    .join(' - ');
                  return { value, _id };
                })}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-3 finance-date-filter">
              <FormDateInputField
                minDate={false}
                placeholder="Date From"
                error={errors.startDate}
                value={props.startDate ? new Date(props.startDate) : null}
                onChange={e =>
                  handleChange({
                    target: {
                      name: 'startDate',
                      value: moment(e)
                    }
                  })
                }
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-3 finance-date-filter">
              <FormDateInputField
                minDate={false}
                placeholder="Date To"
                error={errors.endDate}
                value={props.endDate ? new Date(props.endDate) : null}
                onChange={e =>
                  handleChange({
                    target: {
                      name: 'endDate',
                      value: moment(e)
                    }
                  })
                }
              />
            </div>
            {/* <div className="p-col-12 p-md-4">
              <SelectInput
                label="Categories"
                placeholder="Item Type"
                error={errors.categories}
                value={props.categories}
                name="categories"
                onChange={props.handleChangeMultiple}
                multiple
                options={props.categories.map(categories => {
                  let _id = categories._id;
                  let value = categories.name;
                  return { value, _id };
                })}
              />
            </div> */}
            <div className="p-col-12 p-md-4">
              <FormInputS
                // left={
                //   <img src="/assets/images/icon/Icon-Customer.png" alt="" />
                // }
                name="pickup"
                label="Pickup"
                value={props.pickup}
                placeholder="Pickup"
                onChange={handleChange}
                fullWidth
                error={errors.pickup}
              />
            </div>
            <div className="p-col-12 p-md-4">
              <FormInputS
                // left={
                //   <img src="/assets/images/icon/Icon-Customer.png" alt="" />
                // }
                name="dropoff"
                label="Dropoff"
                value={props.dropoff}
                placeholder="Dropoff"
                onChange={handleChange}
                fullWidth
                error={errors.dropoff}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-4">
              <SelectInput
                label="Commodity"
                placeholder="Commodity Type"
                name="categoriesIds"
                error={errors.categoriesIds}
                value={props.categoriesIds}
                onChange={props.handleChangeMultiple}
                multiple
                options={props.categories.map(category => {
                  let _id = category._id;
                  let value = category.name;
                  return { value, _id };
                })}
              />
            </div>
            <div className="p-col-12 p-md-6 p-lg-3">
              <SelectInput
                label="Status"
                placeholder="Status"
                error={errors.status}
                value={props.status}
                name="status"
                onChange={e => {
                  handleChange({
                    target: {
                      name: e.currentTarget.dataset.name,
                      value: e.currentTarget.dataset.value
                    }
                  });
                }}
                options={[
                  { name: 'All', value: 'All' },
                  { name: 'Paid', value: 'Paid' },
                  { name: 'Unpaid', value: 'Unpaid' }
                ]}
              />
            </div>
            <div className="p-col-12 text-right">
              <FormSubmitBtn
                label="Clear"
                className="no-gradient-btn"
                disabled={activity}
                onSubmit={props.handleClearFilters}
                style={{
                  width: 'unset',
                  borderRadius: 4,
                  color: 'unset',
                  ...btnFontSize
                }}
              />
              <FormSubmitBtn
                label="Search"
                disabled={activity}
                onSubmit={props.handleSearch}
                style={{ width: 'unset', borderRadius: 4, ...btnFontSize }}
              />
            </div>
          </div>
        </div>
        {filterResults ? (
          filterResults.length ? (
            filterResults.map(item => (
              <div key={item._id} className="p-col-12 p-sm-6 p-lg-3">
                <FinanceCardComponent
                  {...item}
                  openDialog={() => props.handleSetDialogData(item)}
                  currency={user.config.currency}
                  amount={item.amount.toFixed(2)}
                  orders={item.orders.length}
                  status={item.status}
                />
              </div>
            ))
          ) : (
              <div className="p-col-12">
                <EmptyPlaceholder message="We could not find any finance history." />
              </div>
            )
        ) : null}
        {!filterResults ? (
          /**
           * Original finance history
           */
          myFinances.length ? (
            myFinances.map(item => (
              <div key={item._id} className="p-col-12 p-sm-6 p-lg-3">
                <FinanceCardComponent
                  {...item}
                  openDialog={() => props.handleSetDialogData(item)}
                  currency={user.config.currency}
                  amount={item.amount.toFixed(2)}
                  orders={item.orders.length}
                  status={item.status}
                />
              </div>
            ))
          ) : (
              <div className="p-col-12">
                <EmptyPlaceholder message="We could not find any finance history." />
              </div>
            )
        ) : null}
        {/* ===================================== */}
      </ContainerLayout>
      <Dialog
        open={props.isDialogVisible}
        onClose={props.handleDialogClose}
        maxWidth="lg"
        className="m-f-list-dialog"
        // scroll="body"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title">
          <span style={{ marginRight: 25 }}>Total Earnings</span>
          {user.config.currency} {dialogData.amount.toFixed(2)}
        </DialogTitle>

        <DialogContent>
          <div
            className="p-grid"
            style={{
              margin: 0,
              paddingTop: '1rem',
              justifyContent: 'flex-start'
            }}
          >
            {dialogData.orders.map(item => {
              if (item._id) {
                return (
                  <div key={item._id} className="p-col-12 p-sm-6 p-lg-4">
                    <RequestCard
                      request={item}
                      requestType="requests"
                      goTo="requests"
                      target="_blank"
                      showRates
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <FormSubmitBtn
            label="Back"
            disabled={activity}
            onSubmit={props.handleDialogClose}
            style={{
              width: 'unset',
              borderRadius: 4
            }}
          />
        </DialogActions>
      </Dialog>
    </Page>
  );
};

MyFinancesListComponent.defaultProps = {
  myFinances: [],
  dialogData: {
    amount: 0,
    orders: []
  }
};

MyFinancesListComponent.propTypes = {
  user: PropTypes.shape(),
  activity: PropTypes.bool,
  pickup: PropTypes.string,
  dropoff: PropTypes.string,
  errors: PropTypes.shape(),
  endDate: PropTypes.shape(),
  startDate: PropTypes.shape(),
  handleSearch: PropTypes.func,
  handleChange: PropTypes.func,
  handleChangeMultiple: PropTypes.func,
  dialogData: PropTypes.shape(),
  isDialogVisible: PropTypes.bool,
  filterResults: PropTypes.arrayOf(PropTypes.shape()),
  handleDialogClose: PropTypes.func,
  handleClearFilters: PropTypes.func,
  handleSetDialogData: PropTypes.func,
  vehicles: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.shape()),
  myDrivers: PropTypes.arrayOf(PropTypes.shape()),
  myVehicles: PropTypes.arrayOf(PropTypes.shape()),
  myFinances: PropTypes.arrayOf(PropTypes.shape()),
  transporterIds: PropTypes.arrayOf(PropTypes.string)
};

export default MyFinancesListComponent;
