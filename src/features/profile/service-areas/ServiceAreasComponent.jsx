import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';

import { ListComponents, ListComponent } from '../components/ListComponent';

const ServiceAreasComponent = props => {
  const {
    serviceAreas,
    activity,
    component,
    handleCloseDialog,
    handleGetComponent,
    handleSetCurrentComponent,
    id
  } = props;

  const Comp = handleGetComponent(component);

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <table className="_transporter-profile-table">
          <tbody>
            {serviceAreas && serviceAreas.length ? (
              serviceAreas.map((area, index) => {
                return (
                  <ListComponents
                    key={`service-area-${index + 1}`}
                    onClick={() =>
                      handleSetCurrentComponent(
                        area.type === 'location'
                          ? 'service-area-view'
                          : 'service-area-draw-view',
                        area
                      )
                    }
                  >
                    <ListComponent />
                    <td
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}
                      >
                        <img
                          className="_fa"
                          src={`${process.env.PUBLIC_URL}/assets/images/icon/icon-DropOff.png`}
                          alt=""
                        />
                        <span onClick={() => null}>{area.name}</span>
                      </div>
                      <span
                        className="right_service_icon"
                        onClick={e =>
                          props.handleDeleteServiceArea(e, area._id)
                        }
                      >
                        <img
                          src="https://img.icons8.com/android/16/000000/trash.png"
                          alt=""
                        />
                      </span>
                    </td>
                  </ListComponents>
                );
              })
            ) : (
              <tr>
                <td style={{ textAlign: 'center' }} colSpan={4}>
                  We could not find any service areas for you!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={props.isDialogVisible}
        className="full-height-dialog"
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <Comp
          activity={activity}
          id={id}
          serviceAreas={serviceAreas}
          dialogData={props.dialogData}
          handleCloseDialog={handleCloseDialog}
          handleSetCurrentComponent={handleSetCurrentComponent}
          handleServiceAreasAfterAction={props.handleServiceAreasAfterAction}
        />
      </Dialog>
    </div>
  );
};

ServiceAreasComponent.propTypes = {
  activity: PropTypes.bool,
  component: PropTypes.string,
  id: PropTypes.string,
  dialogData: PropTypes.shape(),
  isDialogVisible: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  handleGetComponent: PropTypes.func,
  handleDeleteServiceArea: PropTypes.func,
  handleSetCurrentComponent: PropTypes.func,
  handleServiceAreasAfterAction: PropTypes.func,
  serviceAreas: PropTypes.arrayOf(PropTypes.shape())
};

export default ServiceAreasComponent;
