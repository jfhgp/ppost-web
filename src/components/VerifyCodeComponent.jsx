import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ReactCodeInput from 'react-code-input';

import { classNames } from '../utils/functions';
import ApiCalls from '../service/RequestHandler';
import { authClass } from '../utils/auth.util';
import { newGrowl } from '../components/ui/GrowlComponent';
import { getPrimaryColors } from '../utils/functions';

const apiCallType = {
  user: {
    login: ApiCalls.verifyLogin,
    createAccount: ApiCalls.verifyUOtp,
    resendCode: ApiCalls.resendCodeUser
  },
  transporter: {
    login: ApiCalls.verifyTLogin,
    createAccount: ApiCalls.verifyTOtp,
    resendCode: ApiCalls.resendCodeTransporter
  }
};

const myProps = {
  inputStyle: {
    color: 'rgba(20, 40, 112, 0.5)',
    fontFamily: 'Exo2-Medium',
    background: 'transparent',
    margin: '4px 14px 4px 0',
    MozAppearance: 'textfield',
    minWidth: '3em',
    width: 15,
    textAlign: 'center',
    fontSize: '14px',
    height: '26px',
    paddingLeft: '0',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid',
    borderColor: getPrimaryColors('primary')
  },
  inputStyleInvalid: {
    fontFamily: 'Exo2-Medium',
    background: 'transparent',
    margin: '4px 14px 4px 0',
    MozAppearance: 'textfield',
    minWidth: '3em',
    width: 15,
    textAlign: 'center',
    fontSize: '14px',
    height: '26px',
    paddingLeft: '0',
    outline: 'none',
    border: 'none',
    color: getPrimaryColors('error'),
    borderBottom: '1px solid',
    borderColor: getPrimaryColors('error')
  }
};

class VerifyCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      smsCode: '',
      emailCode: '',
      error: false,
      preference: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activity && !this.props.activity && this.state.activity) {
      this.setState({ activity: false });
    }
  }

  verifyCode = async e => {
    if (e) {
      e.preventDefault();
    }

    const { smsCode, emailCode } = this.state;
    const { userType, verifyType, mobile } = this.props;
    let response = null;

    try {
      // verify on login
      if (verifyType === 'login') {
        if (smsCode.length === 4) {
          this.setState({ activity: true });
          response = await apiCallType[userType].login({
            smsCode: smsCode,
            mobile: mobile
          });
        } else {
          this.setState({ error: true });
        }
      }

      // verify on create account
      if (verifyType === 'createAccount') {
        if (smsCode.length === 4 && emailCode.length === 4) {
          this.setState({ activity: true });
          response = await apiCallType[userType].createAccount({
            smsCode,
            emailCode,
            mobile
          });
        } else {
          this.setState({ error: true });
        }
      }
    } catch (error) {
      this.setState({
        smsCode: '',
        error: true,
        emailCode: '',
        activity: false
      });

      try {
        newGrowl.showGrowl('error', 'Error', error.response.data.message);
      } catch (error) {
        //
      }
    }

    // on success
    if (response) {
      await authClass.setUser({
        ...response.data,
        userType,
        token: response.data.token
      });
      // if (this.props.showPreference) {
      //   this.props.showPreference();
      // } else {
      // await this.props.navigateTo(`/${userType}/home`);
      await this.props.handleLoginModalClose();
      await this.props.history.push(`/${userType}/home`);
      // }
    }
  };

  onChange = async e => {
    await this.setState({ [e.target.name]: e.target.value, error: false });
    if (e.target.value.length === 4) {
      this.verifyCode();
    }
  };

  resendCode = async e => {
    e.stopPropagation();
    this.setState({ activity: true });
    try {
      await apiCallType[this.props.userType].resendCode({
        mobile: this.props.mobile
      });
      this.setState({ activity: false });
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  render() {
    const { error, smsCode, emailCode, activity } = this.state;
    const { verifyType } = this.props;

    return verifyType === 'login' ? (
      <div className="verify-code-div">
        <form
          onSubmit={this.verifyCode}
          style={{ height: this.props.height }}
          autoComplete="off"
        >
          <div id="form-title" style={{ padding: '1.5rem 0' }}>
            <span
              style={{
                fontFamily: 'Exo2-Medium',
                color: getPrimaryColors('primary'),
                fontSize: '1.5rem'
              }}
            >
              Sign in
            </span>
            {/* <span
              style={{
                fontFamily: 'Exo2-Light',
                color: getPrimaryColors('primary'),
                fontSize: '1rem'
              }}
            >
              Fast & consistently reliable delivery.
            </span>
            <p
              style={{
                fontFamily: 'Exo2-Light',
                color: getPrimaryColors('primary'),
                fontSize: '1rem',
                margin: '16px 0 10px 0',
                letterSpacing: 2,
                width: '100%',
                textAlign: 'center'
              }}
            >
              The game-changing delivery app for home or business
            </p> */}
          </div>
          <div className="verify-input">
            <label>
              <i
                className="fas fa-key"
                style={{
                  marginRight: 16,
                  color: getPrimaryColors('secondary')
                }}
              />
            </label>
            <ReactCodeInput
              type="number"
              fields={4}
              name="smsCode"
              value={smsCode}
              // disabled={activity}
              onChange={text =>
                this.onChange({ target: { name: 'smsCode', value: text } })
              }
              error={error}
              isValid={!error}
              placeholder="code"
              autoFocus
              {...myProps}
            />
          </div>
          <div style={{ margin: '0 0 10px 0' }}>
            <small
              style={{
                margin: 0,
                color: getPrimaryColors('primary'),
                fontFamily: 'Exo2-Light',
                display: 'inline-block',
                fontSize: 13
              }}
            >
              We have sent you a verification code on your phone number.{' '}
              <button
                disabled={activity}
                className={activity ? 'disabled' : ''}
                type="button"
                onClick={this.resendCode}
                style={{
                  width: 'unset',
                  padding: 0,
                  margin: 0,
                  fontSize: 'unset',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Exo2-Medium',
                  color: getPrimaryColors('primary')
                }}
              >
                Resend ?
              </button>
            </small>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button
              disabled={activity}
              className={classNames([
                'verify-code-btn',
                ['disabled', activity]
              ])}
              type="submit"
              style={{ marginBottom: '1.5rem' }}
            >
              Verify
            </button>
          </div>
          {/* <div
            style={{
              display: 'flex',
              marginTop: '5rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 1
            }}
          >
            <Link to={`/${routes.createAccount}/${this.props.userType}`}>
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  color: getPrimaryColors('primary'),
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Exo2-Medium',
                  width: 'unset',
                  letterSpacing: 1.5,
                  fontSize: '1rem',
                  padding: '10px 1rem',
                  borderRadius: 3,
                  boxShadow: '0px 1px 3px -2px black'
                }}
              >
                Register Now
              </button>
            </Link>
            <Link
              to={`/${routes.forgotPassword}/${this.props.userType}/mobile`}
            >
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  color: getPrimaryColors('primary'),
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Exo2-Medium',
                  width: 'unset',
                  letterSpacing: 1.5,
                  fontSize: '1rem',
                  padding: '10px 1rem',
                  borderRadius: 3,
                  boxShadow: '0px 1px 3px -2px black'
                }}
              >
                Forgot Password
              </button>
            </Link>
          </div> */}
        </form>
      </div>
    ) : (
        <div className="verify-code-div">
          <form
            onSubmit={this.verifyCode}
            style={{ height: this.props.height }}
            autoComplete="off"
          >
            {/* <div id="form-title">
            <span
              style={{
                fontFamily: 'Exo2-Medium',
                color: getPrimaryColors('primary'),
                fontSize: '1.5rem'
              }}
            >
              Sign up
            </span>
            <span
              style={{
                fontFamily: 'Exo2-Light',
                color: getPrimaryColors('primary'),
                fontSize: '1rem'
              }}
            >
              Fast & consistently reliable delivery.
            </span>
            <p
              style={{
                fontFamily: 'Exo2-Light',
                color: getPrimaryColors('primary'),
                fontSize: '1rem',
                margin: '16px 0 10px 0',
                letterSpacing: 2,
                width: '100%',
                textAlign: 'center'
              }}
            >
              The game-changing delivery app for home or business
            </p>
          </div> */}
            <div className="verify-input">
              <label>
                <img
                  src={require('../static/icons/verify-sms-icon.png')}
                  style={{ marginRight: 20, width: 16 }}
                />
              </label>
              <ReactCodeInput
                type="text"
                fields={4}
                name="smsCode"
                value={smsCode}
                onChange={text =>
                  this.onChange({ target: { name: 'smsCode', value: text } })
                }
                error={error}
                isValid={!error}
                placeholder="code"
                autoFocus
                {...myProps}
              />
            </div>
            <div className="verify-input">
              <label>
                <img
                  src={require('../static/icons/email-icon.png')}
                  style={{ marginRight: 20, width: 16 }}
                />
              </label>
              <ReactCodeInput
                type="text"
                fields={4}
                name="emailCode"
                value={emailCode}
                onChange={text =>
                  this.onChange({ target: { name: 'emailCode', value: text } })
                }
                error={error}
                isValid={!error}
                placeholder="Code"
                autoFocus={false}
                {...myProps}
              />
            </div>
            <div style={{ margin: '0 0 10px 0' }}>
              <small
                style={{
                  margin: 0,
                  color: getPrimaryColors('primary'),
                  fontFamily: 'Exo2-Light',
                  display: 'inline-block',
                  fontSize: 13
                }}
              >
                We have sent you a verification code on your phone number and
              email.{' '}
                <button
                  type="button"
                  onClick={this.resendCode}
                  style={{
                    width: 'unset',
                    padding: 0,
                    margin: 0,
                    fontSize: 'unset',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Exo2-Medium',
                    color: getPrimaryColors('primary')
                  }}
                >
                  Resend ?
              </button>
              </small>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                disabled={activity}
                className={activity ? 'disabled' : ''}
                type="submit"
                style={{
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  backgroundColor: getPrimaryColors('primary'),
                  fontFamily: 'Exo2-Light',
                  width: 'unset',
                  // padding: '4px 3rem',
                  letterSpacing: 1.5,
                  // boxShadow: '0px 1px 6px -2px black',
                  lineHeight: '20px',
                  fontSize: '1rem',
                  padding: '12px 30px',
                  borderRadius: 3
                }}
              >
                Verify
            </button>
            </div>
            {/* <div
            style={{
              display: 'flex',
              marginTop: '5rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 1
            }}
          >
            <Link to={`/${routes.createAccount}/${this.props.userType}`}>
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  color: getPrimaryColors('primary'),
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Exo2-Medium',
                  width: 'unset',
                  letterSpacing: 1.5,
                  fontSize: '1rem',
                  padding: '10px 1rem',
                  borderRadius: 3,
                  boxShadow: '0px 1px 3px -2px black'
                }}
              >
                Register Now
              </button>
            </Link>
            <Link to={`/${routes.login}/${this.props.userType}`}>
              <button
                style={{
                  border: 'none',
                  outline: 'none',
                  color: getPrimaryColors('primary'),
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Exo2-Medium',
                  width: 'unset',
                  letterSpacing: 1.5,
                  fontSize: '1rem',
                  padding: '10px 1rem',
                  borderRadius: 3,
                  boxShadow: '0px 1px 3px -2px black'
                }}
              >
                Signin
              </button>
            </Link>
          </div> */}
          </form>
        </div>
      );
  }
}

VerifyCodeComponent.propTypes = {
  userType: PropTypes.string,
  verifyType: PropTypes.string,
  mobile: PropTypes.string,
  navigateTo: PropTypes.func,
  showPreference: PropTypes.func,
  height: PropTypes.number,
  activity: PropTypes.bool,
  handleLoginModalClose: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({ type: PropTypes.string })
  })
};

export default withRouter(VerifyCodeComponent);
