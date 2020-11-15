import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

// import FileUpload from '../../../components/form/FileUpload';
import { capitalize } from '../../../utils/functions';
import moment from 'moment';

const LicenseComponent = props => {
  const { activity, mainActivity } = props;
  return (
    <div className="p-grid profile-identification">
      {/*
      <div className="p-col-12">
         <Typography variant="h5">License</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel risus
          enim.
        </Typography> 
      </div>
        */}
      {/* <div className="p-col-12">
        <FormControl id="image-type-control">
          <FormLabel>Image Type</FormLabel>
          <RadioGroup
            value={props.currentKey}
            onChange={props.handleChange}
            style={{ flexDirection: 'row' }}
          >
            <FormControlLabel
              value="0"
              control={<Radio color="primary" name="currentKey" />}
              label="Front"
            />
            <FormControlLabel
              value="1"
              control={<Radio color="primary" name="currentKey" />}
              label="Back"
            />
          </RadioGroup>
        </FormControl>
      </div> */}
      {/* <div className="p-col-12">
        <FileUpload
          className="identification-drop-zone"
          activity={mainActivity || activity}
          onDrop={acceptedFiles => props.handleFileDrop(acceptedFiles[0])}
        />
      </div> */}

      <div className="p-col-6" style={{ fontWeight: 'bold', color: '#2c2d5b' }}>
        Driving License
      </div>
      <div
        className="p-col-6 text-right"
        style={{ fontWeight: 'bold', color: '#2c2d5b' }}
      >
        {props.licenseExpiry
          ? `Expire: ${moment(props.licenseExpiry).format('YY/M')}`
          : null}
      </div>
      {props.license && props.license.length
        ? props.license.map((license, i) => {
            return (
              <div className="p-col-6" key={i}>
                <div className="documents">
                  <div>
                    <img
                      src={license.path}
                      alt={license.name}
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

      {/* {props.license.map((item, index) => {
        if (item) {
          return (
            <div
              key={`license-${index + 1}`}
              className="p-col-12 p-sm-6 identity-images"
            >
              <p>{capitalize(item.name)}</p>
              <img
                src={item.path}
                alt="license"
                onClick={props.handleImageClick}
              />
            </div>
          );
        }
        return null;
      })} */}
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

LicenseComponent.propTypes = {
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
  license: PropTypes.arrayOf(PropTypes.shape())
};

export default LicenseComponent;
