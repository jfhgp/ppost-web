import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import FormNativeSelectInput from '../../../components/form/FormNativeSelectInput';
import FormSearchInput from '../../../components/form/FormSearchInput';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import VehicleCard from '../components/VehicleCard';
import ContainerLayout from '../../../components/layout/ContainerLayout';

const MyVehiclesListComponent = props => {
  const { activity, filtered } = props;

  return (
    <Page activity={activity} className="m-v-list-page">
      <HeaderTop {...props} />
      <ContainerLayout>
        {filtered.length ? (
          filtered.map(vehicle => (
            <div
              key={vehicle._id}
              className="p-col-12 p-sm-6 p-md-6 p-lg-4 p-xl-3"
            >
              <VehicleCard
                vehicle={vehicle}
                activity={activity}
                setMyVehicles={props.handleSetVehicles}
                getVehicleCardPicture={props.getVehicleCardPicture}
              />
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <EmptyPlaceholder message="We could not find any vehicles." />
          </div>
        )}
      </ContainerLayout>
    </Page>
  );
};

export default MyVehiclesListComponent;

const HeaderTop = props => {
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');

  return (
    <div className="page-title multiple-items">
      <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
        Mode of Transportation
      </span>
      <div
        style={
          mobileWidth
            ? { margin: '10px 0', flexDirection: 'column-reverse' }
            : {}
        }
      >
        <div
          style={
            mobileWidth
              ? { marginTop: '1rem', textAlign: 'right', width: '100%' }
              : { marginRight: '1.5rem' }
          }
        >
          <Link to="vehicles/add">
            <FormSubmitBtn
              label="Add Vehicle"
              // onSubmit={() => props.handleDialogVisibility(true)}
              disabled={props.activity}
            />
          </Link>
        </div>
        <div
          style={
            mobileWidth
              ? { marginTop: '1rem', width: '100%' }
              : { marginRight: '1.5rem' }
          }
        >
          <FormNativeSelectInput
            name="status"
            value={props.status}
            onChange={e => props.handleStatusChange(undefined, e)}
            options={[
              { value: 'all', label: 'All' },
              { value: 'active-true', label: 'Active' },
              { value: 'active-false', label: 'Inactive' },
              { value: 'approved-true', label: 'Approved' },
              { value: 'approved-false', label: 'Unapproved' }
            ]}
          />
        </div>
        <div style={mobileWidth ? { marginTop: '1rem', width: '100%' } : {}}>
          <FormSearchInput
            name="search"
            value={props.search}
            placeholder="Mode of Transportation"
            onChange={() => null}
            right={
              <img
                alt=""
                src={require('../../../static/icons/icon-search.png')}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  status: PropTypes.string,
  activity: PropTypes.bool,
  search: PropTypes.string,
  handleChange: PropTypes.func,
  handleStatusChange: PropTypes.func
};

MyVehiclesListComponent.propTypes = {
  activity: PropTypes.bool,
  getVehicleCardPicture: PropTypes.func,
  handleSetVehicles: PropTypes.func,
  handleDialogVisibility: PropTypes.func,
  filtered: PropTypes.arrayOf(
    PropTypes.shape({
      documents: PropTypes.array,
      _id: PropTypes.string,
      active: PropTypes.bool,
      model: PropTypes.string,
      make: PropTypes.string,
      numberPlate: PropTypes.string,
      color: PropTypes.string
    })
  )
};
