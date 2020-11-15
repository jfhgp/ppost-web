/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Page from '../../../components/layout/Page';
import FormSearchInput from '../../../components/form/FormSearchInput';

import FormNativeSelectInput from '../../../components/form/FormNativeSelectInput';

import DragDropListComponent from '../../../components/DragDropListComponent';

import { ExportCSV } from '../../../components/ExportCSVComponent';

const SchedulePickupListComponent = props => {
  const {
    activity,
    // handleSetSchedule,
    onInputChange,
  } = props;
  const ipadWidth = useMediaQuery('(max-width:768px)');
  const mobileWidth = useMediaQuery('(max-width:420px)');
  const veryLargeWidth = useMediaQuery('(min-width:1600px)');

  return (
    <Page activity={activity} className="r-list-container" noActivity>
      <div className="page-title multiple-items">
        <span style={ipadWidth ? { width: '100%', paddingBottom: 10 } : {}}>
          {props.pageTitle}
        </span>
      </div>
      <DragDropListComponent
        {...props}
        largeWidth={veryLargeWidth}
        mobileWidth={mobileWidth}
      />
    </Page>
  );
};

SchedulePickupListComponent.defaultProps = {
  pageTitle: 'Set Schedule Pickup',
  searchPlaceholder: 'Search Your Requests'
};

SchedulePickupListComponent.propTypes = {
  user: PropTypes.shape(),
  fetched: PropTypes.bool,
  activity: PropTypes.bool,
  sortBy: PropTypes.string,
  status: PropTypes.string,
  search: PropTypes.string,
  layout: PropTypes.string,
  history: PropTypes.shape(),
  userType: PropTypes.string,
  handleSort: PropTypes.func,
  pageTitle: PropTypes.string,
  onInputChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  headings: PropTypes.arrayOf(PropTypes.object),
  shouldListLayoutComponentUpdate: PropTypes.bool,
  sortedRequests: PropTypes.arrayOf(PropTypes.shape({})),
  requests: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({}))),
  handlePageClick: PropTypes.func,
  pageCount: PropTypes.number,
  detailsExcelData: PropTypes.arrayOf(PropTypes.shape({})),
  fileName: PropTypes.string
};

export default SchedulePickupListComponent;
