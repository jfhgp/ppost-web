import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/layout/Page';
import { Typography, Button, Dialog } from '@material-ui/core';
import ServiceAreasAddContainer from '../add/ServiceAreasAddContainer';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';
import ServiceAreasEditContainer from '../add/ServiceAreasEditContainer';
import ServiceAreasDrawContainer from '../draw/ServiceAreasDrawContainer';
import ServiceAreasEditDrawContainer from '../draw/ServiceAreaEditDrawContainer';

const ServiceAreasListComponent = props => {
  const {
    activity,
    handleDialogVisibility,
    currentComp: CurrentComp,
    serviceAreas
  } = props;

  return (
    <Page activity={activity} className="s-a-list-page">
      <div className="p-grid">
        <div className="p-col-12">
          <Typography variant="h5">Service Areas</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
            risus enim.
          </Typography>
        </div>
        <div className="p-col-12 text-right">
          <Button
            variant="contained"
            disabled={activity}
            onClick={() =>
              handleDialogVisibility(true, ServiceAreasAddContainer, {})
            }
            style={{ margin: '0 0 1rem 1rem' }}
          >
            Add Service Area
          </Button>
          <Button
            variant="contained"
            disabled={activity}
            onClick={() =>
              handleDialogVisibility(true, ServiceAreasDrawContainer, {})
            }
            style={{ margin: '0 0 1rem 1rem' }}
          >
            Draw Service Area
          </Button>
        </div>

        {serviceAreas.length ? (
          serviceAreas.map(item => (
            <div key={item._id} className="p-col-12 p-md-4 p-lg-4">
              <div
                className="s-area-card"
                onClick={() => {
                  if (item.type === 'location') {
                    handleDialogVisibility(
                      true,
                      ServiceAreasEditContainer,
                      item
                    );
                  } else {
                    handleDialogVisibility(
                      true,
                      ServiceAreasEditDrawContainer,
                      item
                    );
                  }
                }}
              >
                <i className="fas fa-home" />
                <Typography variant="body1">
                  {item.name || 'Unknown'}
                </Typography>
                <button
                  onClick={e => props.handleDeleteServiceArea(e, item._id)}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <EmptyPlaceholder message="We could not find any service areas." />
          </div>
        )}
      </div>
      <Dialog
        open={props.isDialogVisible}
        onClose={handleDialogVisibility}
        maxWidth="md"
        className="full-width-dialog full-height-dialog"
      >
        <CurrentComp
          serviceAreas={serviceAreas}
          dialogData={props.dialogData}
          handleServiceAreasAfterAction={props.handleServiceAreasAfterAction}
        />
      </Dialog>
    </Page>
  );
};

ServiceAreasListComponent.defaultProps = {
  currentComp: () => null
};

ServiceAreasListComponent.propTypes = {
  activity: PropTypes.bool,
  currentComp: PropTypes.func,
  dialogData: PropTypes.shape(),
  isDialogVisible: PropTypes.bool,
  handleDialogVisibility: PropTypes.func,
  handleDeleteServiceArea: PropTypes.func,
  handleServiceAreasAfterAction: PropTypes.func,
  serviceAreas: PropTypes.arrayOf(PropTypes.shape())
};

export default ServiceAreasListComponent;
