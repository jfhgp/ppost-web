import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import {
  Dialog
} from '@material-ui/core';
import _ from "lodash";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { timeFormat } from '../constants/project-constants';
import { validateCallbackInformation } from "../components/callback-validator";
import ApiCalls from '../service/RequestHandler';
import FormTextArea from '../components/form/FormTextArea';
import FormInput from '../components/form/FormInputS';
import FormSubmitBtn from '../components/form/FormSubmitBtn';
import * as authUtil from '../utils/auth.util';
import { newGrowl } from '../components/ui/GrowlComponent';
import EmptyPlaceholder from '../components/ui/EmptyPlaceholder';

import routes from '../constants/route-constants';

const INITIAL_STATE = {
  errors: {},
  activity: false,
  name: null,
  number: null,
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      activity: false,
      name: null,
      number: null,
      isDialogVisible: false
    };

  }

  handleDialogClose = () => {
    this.setState({
      isDialogVisible: false
    });
  };

  handleDialogVisibility = () => {
    this.setState({
      isDialogVisible: true
    });
  }

  handleCallBack = async () => {
    if (this.isValid()) {
      const {
        name,
        number
      } = this.state;

      const data = {
        name: name,
        number: number,
      }
      this.setState({ activity: true });
      try {
        const response = await ApiCalls.requestCallBack(data);
        this.setState({
          ...INITIAL_STATE
        });
        this.handleDialogClose();
        newGrowl.showGrowl(
          'success',
          'Success',
          'Your callback request has been submitted successfully.'
        );
      } catch (error) {
        this.setState({ activity: false });
      }
    };

  }

  isValid() {
    const { errors, isValid } = validateCallbackInformation(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onInputChange = event => {
    const { name, value, checked, type } = event.target;
    if (this.state.errors[name]) {
      this.setState(prevState => {
        return {
          [name]: type === 'checkbox' ? checked : value,
          errors: { ...prevState.errors, [name]: false },
          getRate: false
          // deliveryType: this.changeDeliveryType({
          //   pickupDate: prevState.pickupDate,
          //   deliveryDate: prevState.deliveryDate,
          //   [name]: value
          // })
        };
      });
    } else {
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
        getRate: false
        // deliveryType: this.changeDeliveryType({
        //   pickupDate: this.state.pickupDate,
        //   deliveryDate: this.state.deliveryDate,
        //   [name]: value
        // })
      });
    }
  };
  render() {
    const { isDialogVisible, name, number, errors, activity } = this.state;
    return (
      <div>
        <div
          className="mainContainer"
          style={{
            background: `url(${process.env.PUBLIC_URL}${this.props.bgImagePath}) no-repeat center`
          }}
        >
          <Grid container style={{ maxWidth: 1366 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h5" color="inherit">
                About <span style={{ color: '#fa7816' }}>PPost</span>
              </Typography>
              <Typography
                variant="body1"
                color="inherit"
                style={{ lineHeight: 1.8, paddingTop: 10 }}
              >
                PPost is an affordable and trusted service provider company. We
                offer online logistics and transportation services to deliver wide
                range of parcels, packages, posts, mails. Having its head office in
                Paris (France), PPost network exclusively covers all 28 countries of
                EU (European Union). We have state-of-the-art virtual platform,
                robust web and mobile applications, and professional team to serve
                our valued customers round the clock.
          </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              lg={5}
              className="empty-grid-for-layout"
            ></Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[{ name: 'Home', route: routes.home }].map((item, key) => {
                    return (
                      <Link key={key} to={item.route}>
                        <li style={{ paddingTop: 10, color: '#fff' }}>
                          {item.name}
                        </li>
                      </Link>
                    );
                  })}
                  {[
                    { name: 'Privacy Policy', route: routes.privacyAndPolicy },
                    { name: 'Prohibited Items', route: routes.prohibitedItems },
                    {
                      name: 'Terms and Conditions',
                      route: routes.termsAndConditions
                    },
                    {
                      name: 'FAQ',
                      route: routes.faq
                    },
                    { name: 'How to do Business', route: routes.howToDoBusiness },
                    { name: 'How it Works', route: routes.howItWorks },
                  ].map((item, key) => {
                    return (
                      <Link key={key} to={item.route} >
                        <li style={{ paddingTop: 10, color: '#fff' }}>
                          {item.name}
                        </li>
                      </Link>
                    );
                  })}
                  <Link to="#" onClick={() => this.handleDialogVisibility()}>
                    <li style={{ paddingTop: 10, color: '#fff' }}>
                      Request Call Back
                </li>
                  </Link>
                </ul>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    textAlign: 'right'
                  }}
                >
                  {[
                    { name: 'Send Parcel', route: routes.sendParcel },
                    { name: 'Receive Parcel', route: routes.receiveParcel },
                    { name: 'Track Parcel', route: routes.trackParcel },
                    { name: 'Transporters', route: routes.transporters },
                    { name: 'Services', route: routes.services }
                  ].map((item, key) => {
                    return (
                      <Link key={key} to={item.route}>
                        <li style={{ paddingTop: 10, color: '#fff' }}>
                          {item.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                paddingTop: '2rem',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <div>
                {['facebook', 'twitter', 'linkedin', 'instagram'].map(
                  (item, key) => {
                    return (
                      <i
                        key={key}
                        className={`fab fa-2x fa-${item}`}
                        style={{ padding: 5, color: '#fa7816' }}
                      />
                    );
                  }
                )}
              </div>
              <br />
              <div>
                &copy; 2019 <span style={{ color: '#fa7816' }}>PPost</span>. All
                Rights Reserved
          </div>
            </Grid>
          </Grid>
        </div>
        <Dialog
          open={isDialogVisible}
          onClose={this.handleDialogClose}
          aria-labelledby="actions-dialog"
          className="u-r-d-actions-dialog"
        >
          <div className="cancel-request-dialog">
            <DialogTitle>Request Call Back</DialogTitle>
            <DialogContent>

              <div>
                <div className="p-col-12 p-md-12 p-lg-12">
                  <p className="heading">Name</p>
                  <FormInput
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e =>
                      this.onInputChange({
                        target: {
                          name: 'name',
                          value: e.target.value
                        }
                      })
                    }
                    error={errors.name}
                    left={
                      <img
                        style={{ width: '1rem' }}
                        alt=""
                        src={require('../static/icons/date-icon.png')}
                      />
                    }
                  />
                </div>
                <div className="p-col-12 p-md-12 p-lg-12">
                  <p className="heading">Phone Number</p>
                  <FormInput
                    placeholder="Phone Number"
                    name="number"
                    type="tel"
                    value={number}
                    onChange={e =>
                      this.onInputChange({
                        target: {
                          name: 'number',
                          value: e.target.value
                        }
                      })
                    }
                    error={errors.number}
                    left={
                      <img
                        style={{ width: '1rem' }}
                        alt=""
                        src={require('../static/icons/date-icon.png')}
                      />
                    }
                  />
                </div>
              </div>


            </DialogContent>
            <DialogActions>
              <div>
                <FormSubmitBtn
                  label="Cancel"
                  disabled={activity}
                  onSubmit={this.handleDialogClose}
                  style={{ width: 'unset', borderRadius: 4 }}
                />
                <FormSubmitBtn
                  className="confirm-btn"
                  label="Submit"
                  disabled={activity}
                  onSubmit={this.handleCallBack}
                  style={{
                    width: 'unset',
                    borderRadius: 4
                  }}


                />
              </div>

            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  };

}

Footer.propTypes = {
  bgImagePath: PropTypes.string
};

export default Footer;
