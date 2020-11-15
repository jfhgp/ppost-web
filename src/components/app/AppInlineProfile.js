import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ApiCalls from '../../service/RequestHandler';
import { authClass } from '../../utils/auth.util';
import ProfilePictureComponent from '../dashboard-ui/ProfilePictureComponent';
import { newGrowl } from '../../components/ui/GrowlComponent';
import {
  readImageAsBase64,
  uploadFile,
  generateOrderNumber
} from '../../utils/functions';
class AppInlineProfile extends Component {
  constructor() {
    super();
    this.state = {
      files: "",
      user: authClass.getUser,
    }
    this.div = {};
    this.count = 0;
    this.divHeight = 'unset';
  }

  componentDidUpdate() {
    if (this.count === 0) {
      this.count = 1;
      this.divHeight = this.div.offsetHeight;
      this.setState({});
    }
  }


  onFileDrop = async (file, item) => {
    readImageAsBase64(file, result => {
      this.setState(prevState => ({
        files: file,
      }));
    });
    this.uploadFile(file);
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await ApiCalls.uploadTFile(formData);
      this.handleUpdateUserProfile(response.data.path)
    } catch (error) {
      throw error;
    }
  }

  handleUpdateUserProfile = async (data) => {
    this.setState({
      activity: true
    });
    const profileToUpdate = {
      picture: data
    };
    try {
      const response = await ApiCalls.updateUserProfile(profileToUpdate);
      this.setState({
        activity: false,
        isUpdate: false,
        user: response.data
      });
      window.location.reload();
      await authClass.setUserOnUpdate(response.data);
    } catch (error) {
      this.setState({ activity: false, isUpdate: true });
    }
  };

  handleDivRef = ref => (this.div = ref);

  render() {
    const user = this.state.user;
    return (
      <div
        ref={this.handleDivRef}
        style={{ height: this.divHeight, marginBottom: '1em' }}
      >
        <TransitionGroup>
          {this.props.open ? (
            <CSSTransition
              key="Hey"
              timeout={300}
              classNames="drawer-profile-transition"
            >
              <div className="drawer-profile">
                <div>
                  <ProfilePictureComponent
                    edit={user.userType === "transporter" ? false : true}
                    user={user}
                    onFileDrop={this.onFileDrop}
                    addStyle={{ width: 94, height: 94, borderRadius: "100%" }} />
                  <p className="username">{user.firstName}</p>
                </div>
              </div>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>
    );
  }
}

AppInlineProfile.propTypes = {
  open: PropTypes.bool,
  menuLength: PropTypes.number
};

export default AppInlineProfile;
