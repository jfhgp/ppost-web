import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Button from '@material-ui/core/Button';

const IdentificationComponent = props => {
  const { activity, mainActivity } = props;

  return (
    <div className="p-grid profile-identification">
      <div className="p-col-6" style={{ fontWeight: 'bold', color: '#2c2d5b' }}>
        ID Card
      </div>
      <div
        className="p-col-6 text-right"
        style={{ fontWeight: 'bold', color: '#2c2d5b' }}
      >
        {props.idCardExpiry
          ? `Expire: ${moment(props.idCardExpiry).format('YY/M')}`
          : null}
      </div>
      {props.identity && props.identity.length
        ? props.identity.map((identity, i) => {
            return (
              <div className="p-col-6" key={i}>
                <div className="documents">
                  <div>
                    <img
                      src={identity.path}
                      alt={identity.name}
                      onClick={props.handleImageClick}
                    />
                  </div>
                </div>
              </div>
            );
          })
        : //fallback if there is no image
          [1, 2].map(item => (
            <div className="p-col-6" key={item}>
              <div className="documents">
                <div></div>
              </div>
            </div>
          ))}
      {props.canUpdate ? (
        <React.Fragment>
          <div className="p-col-12">
            <p className="heading-body" style={{ marginTop: '1.5rem' }}>
              Actions
            </p>
          </div>
          <div className="p-col-12 text-right">
            <Button
              disabled={activity || mainActivity}
              onClick={props.handleUpdateProfile}
            >
              Save
            </Button>
          </div>
        </React.Fragment>
      ) : null}
      <div className="p-col-12 text-right" style={{ paddingTop: '1rem' }}>
        {props.canDone ? (
          <Button
            onClick={props.handleSetProfile}
            disabled={activity || mainActivity}
            color="primary"
          >
            Done
          </Button>
        ) : null}
      </div>
    </div>
  );
};

IdentificationComponent.propTypes = {
  activity: PropTypes.bool,
  mainActivity: PropTypes.bool,
  canUpdate: PropTypes.bool,
  canDone: PropTypes.bool,
  handleSetProfile: PropTypes.func,
  handleImageClick: PropTypes.func,
  handleUpdateProfile: PropTypes.func,
  handleFileDrop: PropTypes.func,
  handleChange: PropTypes.func,
  currentKey: PropTypes.string,
  identity: PropTypes.arrayOf(PropTypes.shape()),
  idCardExpiry: PropTypes.number
};

export default IdentificationComponent;
