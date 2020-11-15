import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import Page from '../../../components/layout/Page';
import routes from '../../../constants/route-constants';
import SpacesCard from '../../spaces/components/SpacesCard';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import ListLayoutComponent from '../../../components/ListLayoutComponent';
import ContainerLayout from '../../../components/layout/ContainerLayout';
import Paginate from '../../../components/Paginate';

const MySpacesListComponent = props => {
  const {
    activity,

    spaces,

    fetched,
    handlePageClick,
    pageCount
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
            <Link to="spaces/add">
              <FormSubmitBtn
                label="Add Space"
                // onSubmit={() => props.handleDialogVisibility(true)}
                disabled={props.activity}
              />
            </Link>
          </div>
          {/* {!props.search ? (
            <div
              style={
                mobileWidth
                  ? { marginTop: '1em', width: '100%' }
                  : { marginRight: '1em' }
              }
            >
              <FormNativeSelectInput
                name="status"
                value={props.status}
                onChange={onInputChange}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'picked', label: 'Picked' },
                  { value: 'pending', label: 'Assigned' },
                  { value: 'completed', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
              />
            </div>
          ) : null} */}
          {/* <div
            style={
              mobileWidth
                ? { marginTop: '1em', width: '100%' }
                : { marginRight: '1em' }
            }
          >
            <FormSearchInput
              name="search"
              value={props.search}
              placeholder={props.searchPlaceholder}
              onChange={onInputChange}
              right={
                <img
                  alt=""
                  src={require('../../../static/icons/icon-search.png')}
                />
              }
            />
          </div> */}
          {/* <div
            className="layout-btn-div"
            style={mobileWidth ? { width: '100%' } : {}}
          >
            <img
              alt="Switch to grid view."
              style={{ marginRight: '1em' }}
              src={require('../../../static/icons/icon-grid.png')}
              onClick={() =>
                onInputChange({ target: { name: 'layout', value: 'grid' } })
              }
            />
            <img
              alt="Switch to list view."
              src={require('../../../static/icons/icon-list.png')}
              onClick={() =>
                onInputChange({ target: { name: 'layout', value: 'list' } })
              }
            />
          </div> */}
        </div>
      </div>
      {/* <div style={{ textAlign: 'right', margin: '1rem 2rem' }}>
        {!activity ? (
          <ExportCSV
            csvData={props.detailsExcelData}
            fileName={props.fileName}
            disabled={activity}
          />
        ) : null}
      </div> */}
      <ContainerLayout>
        {props.layout === 'grid' ? (
          fetched ? (
            spaces.length ? (
              spaces.map(space => {
                return (
                  <div
                    key={space._id}
                    className="p-col-12 p-md-6 p-lg-4 p-xl-4"
                    style={
                      veryLargeWidth
                        ? { padding: '1rem', width: `${100 / 4}%` }
                        : mobileWidth
                        ? { padding: '0.5rem' }
                        : { padding: '1rem' }
                    }
                  >
                    <SpacesCard space={space} user={props.user} />
                  </div>
                );
              })
            ) : (
              <div className="p-col-12">
                <EmptyPlaceholder message="We could not find any spaces." />
              </div>
            )
          ) : null
        ) : null}
        {props.layout === 'list' ? (
          <div style={{ padding: '1rem', width: '100%', overflowX: 'auto' }}>
            <ListLayoutComponent
              user={props.user}
              sortBy={props.sortBy}
              options={props.options}
              headings={props.headings}
              handleSort={props.handleSort}
              values={props.sortedRequests}
              shouldListLayoutComponentUpdate={
                props.shouldListLayoutComponentUpdate
              }
              goTo={`${routes.requests}/${routes.requestDetails}`}
            />
          </div>
        ) : null}
      </ContainerLayout>
      {fetched && spaces.length && pageCount > 1 ? (
        <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      ) : null}
    </Page>
  );
};

MySpacesListComponent.defaultProps = {
  pageTitle: 'My Spaces',
  searchPlaceholder: 'Search Your Spaces'
};

MySpacesListComponent.propTypes = {
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
  spaces: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({}))),
  handlePageClick: PropTypes.func,
  pageCount: PropTypes.number,
  detailsExcelData: PropTypes.arrayOf(PropTypes.shape({})),
  fileName: PropTypes.string
};

export default MySpacesListComponent;
