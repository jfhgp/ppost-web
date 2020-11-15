import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUploadS from '../../components/form/FileUploadS';

const ProfilePictureComponent = props => {
  const { activity } = props;
  const imageSrc =
    props.user.picture || require('../../static/images/image-user.png');

  return (
    <div

      style={{ position: 'relative' }}
    >
      {props.edit ? (
        <FileUploadS
          activity={activity}
          sectionClassName="commodity-file-upload"
          onDrop={files => props.onFileDrop(files[0])}
          message="Upload Profile Picture"
        />
      ) : null}


      <img alt="" src={imageSrc} style={props.addStyle} />
    </div>
  )


}

ProfilePictureComponent.defaultProps = {
  user: {
    picture: ''
  }
};

ProfilePictureComponent.propTypes = {
  addStyle: PropTypes.shape(),
  user: PropTypes.shape({ picture: PropTypes.string })
};



export default ProfilePictureComponent;
