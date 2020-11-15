import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { classNames } from '../../utils/functions';

import LoginFormInput from '../../components/form/LoginFormInput';
import VerifyCodeComponent from '../../components/VerifyCodeComponent';

import FormTelInput from '../../components/form/FormTelInput';
import { getPrimaryColors } from '../../utils/functions';
import ForgotPasswordRoutes from '../forgot-password/forgot-password-routes';

const LoginComponent = props => {
  const { onInputChange, onSubmit, errors, activity, userType } = props;

  let _userType;
  if (userType === 'user') {
    _userType = 'customer';
  } else {
    _userType = userType;
  }

  return (
    <div className="_login-container">
      {!props.verify && !props.isForgotPassword ? (
        <h1>
          Sign in <span>(as {_userType})</span>
        </h1>
      ) : null}
      <TransitionGroup className="login-transition-group">
        {!props.verify && !props.isForgotPassword ? (
          <CSSTransition
            key="login"
            timeout={300}
            classNames="login-transition"
          >
            <form onSubmit={onSubmit} ref={props.handleFormRef}>
              <div ref={props.handleFieldRef}>
                <LoginFormInput
                  input={
                    <FormTelInput
                      name="mobile"
                      value={props.mobile}
                      onChange={onInputChange}
                      ref={props.tellInputRef}
                    />
                  }
                  left={
                    <img
                      alt=""
                      src={require('../../static/icons/verify-sms-icon.png')}
                      style={{ marginRight: 20, width: 16 }}
                    />
                  }
                  error={errors.mobile}
                />
              </div>
              <div
                style={{
                  minHeight: props.fieldRef.offsetHeight
                }}
              >
                {props.showPassword && (
                  <LoginFormInput
                    type="password"
                    value={props.password}
                    onChange={onInputChange}
                    placeholder="Password"
                    left={
                      <img
                        alt=""
                        src={require('../../static/icons/password-icon.png')}
                        style={{ marginRight: 20, width: 16 }}
                      />
                    }
                    error={errors.password}
                    name="password"
                  />
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <button
                  disabled={activity}
                  className={classNames([
                    'sign-in-btn',
                    ['disabled', activity]
                  ])}
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: '1rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 1
                }}
              >
                <span
                  onClick={props.handleLoginModalClose}
                  style={{
                    border: 'none',
                    outline: 'none',
                    color: getPrimaryColors('primary'),

                    fontFamily: 'Exo2-Medium',
                    width: 'unset',
                    letterSpacing: 1.5,
                    fontSize: '1rem',
                    padding: '10px 1rem',
                    paddingLeft: 0,
                    borderRadius: 3
                  }}
                >
                  Sign up
                </span>
                <span
                  onClick={() =>
                    props.handleModalViewChange('isForgotPassword', true)
                  }
                  style={{
                    border: 'none',
                    outline: 'none',
                    color: getPrimaryColors('primary'),

                    fontFamily: 'Exo2-Medium',
                    width: 'unset',
                    letterSpacing: 1.5,
                    fontSize: '1rem',
                    padding: '10px 1rem',
                    paddingRight: 0,
                    borderRadius: 3
                  }}
                >
                  Forgot Password
                </span>
              </div>
            </form>
          </CSSTransition>
        ) : null}
        {props.isForgotPassword ? (
          <CSSTransition
            key="verify"
            timeout={300}
            classNames="login-transition"
          >
            <ForgotPasswordRoutes
              userType={props.userType}
              handleLoginModalClose={() => props.handleLoginModalClose()}
              handleModalViewChange={props.handleModalViewChange}
            />
          </CSSTransition>
        ) : null}
        {props.verify && !props.isForgotPassword ? (
          <CSSTransition
            key="verify"
            timeout={300}
            classNames="login-transition"
          >
            <VerifyCodeComponent
              // height={props.formRef.offsetHeight}
              userType={props.userType}
              activity={activity}
              verifyType={props.verifyType}
              mobile={props.fullMobile}
              navigateTo={props.navigateTo}
              handleLoginModalClose={() => props.handleLoginModalClose()}
              handleModalViewChange={props.handleModalViewChange}
            />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </div>
    // <div className="login-container">
    //   <Grid container justify="center">
    //     <Grid item xs={12} sm={8} md={6} lg={6} xl={4}>
    //       <div id="login-form-card">
    //         <div>
    //           <Link to={`/${routes.home}`}>
    //             <img
    //               src={require('../../static/images/project-logo.png')}
    //               alt="logo"
    //             />
    //           </Link>
    //         </div>
    //         <div
    //           style={{
    //             overflow: 'hidden',
    //             display: 'flex',
    //             alignItems: 'center',
    //             flexGrow: 1
    //           }}
    //         >
    //           <TransitionGroup className="login-transition-group">
    //             {!props.verify ? (
    //               <CSSTransition
    //                 key="login"
    //                 timeout={300}
    //                 classNames="login-transition"
    //               >
    //                 <form onSubmit={onSubmit} ref={props.handleFormRef}>
    //                   <div id="form-title">
    //                     <span
    //                       style={{
    //                         fontFamily: 'Exo2-Medium',
    //                         color: getPrimaryColors('primary'),
    //                         fontSize: '1.5rem'
    //                       }}
    //                     >
    //                       Sign in
    //                     </span>
    //                     <span
    //                       style={{
    //                         fontFamily: 'Exo2-Light',
    //                         color: getPrimaryColors('primary'),
    //                         fontSize: '1rem'
    //                       }}
    //                     >
    //                       Fast & consistently reliable delivery.
    //                     </span>
    //                     <p
    //                       style={{
    //                         fontFamily: 'Exo2-Light',
    //                         color: getPrimaryColors('primary'),
    //                         fontSize: '1rem',
    //                         margin: '16px 0 10px 0',
    //                         letterSpacing: 2,
    //                         width: '100%',
    //                         textAlign: 'center'
    //                       }}
    //                     >
    //                       The game-changing delivery app for home or business
    //                     </p>
    //                   </div>
    //                   <div ref={props.handleFieldRef}>
    //                     <LoginFormInput
    //                       input={
    //                         <FormTelInput
    //                           name="mobile"
    //                           value={props.mobile}
    //                           onChange={onInputChange}
    //                           ref={props.tellInputRef}
    //                         />
    //                       }
    //                       left={
    //                         <img
    //                           alt=""
    //                           src={require('../../static/icons/verify-sms-icon.png')}
    //                           style={{ marginRight: 20, width: 16 }}
    //                         />
    //                       }
    //                       error={errors.mobile}
    //                     />
    //                   </div>
    //                   <div
    //                     style={{
    //                       minHeight: props.fieldRef.offsetHeight
    //                     }}
    //                   >
    //                     {props.showPassword && (
    //                       <LoginFormInput
    //                         type="password"
    //                         value={props.password}
    //                         onChange={onInputChange}
    //                         placeholder="Password"
    //                         left={
    //                           <img
    //                             alt=""
    //                             src={require('../../static/icons/password-icon.png')}
    //                             style={{ marginRight: 20, width: 16 }}
    //                           />
    //                         }
    //                         error={errors.password}
    //                         name="password"
    //                       />
    //                     )}
    //                   </div>
    //                   <div style={{ textAlign: 'right' }}>
    //                     <button
    //                       disabled={activity}
    //                       className={activity ? 'disabled' : ''}
    //                       type="submit"
    //                       style={{
    //                         border: 'none',
    //                         outline: 'none',
    //                         color: '#fff',
    //                         backgroundColor: getPrimaryColors('primary'),
    //                         fontFamily: 'Exo2-Light',
    //                         width: 'unset',
    //                         padding: '4px 3rem',
    //                         letterSpacing: 1.5,
    //                         boxShadow: '0px 1px 6px -2px black',
    //                         lineHeight: '20px',
    //                         fontSize: '1rem'
    //                       }}
    //                     >
    //                       Signin
    //                     </button>
    //                   </div>
    //                   <div
    //                     style={{
    //                       display: 'flex',
    //                       marginTop: '5rem',
    //                       alignItems: 'center',
    //                       justifyContent: 'space-between',
    //                       paddingBottom: 1
    //                     }}
    //                   >
    //                     <Link to={`/${routes.createAccount}/${props.userType}`}>
    //                       <button
    //                         style={{
    //                           border: 'none',
    //                           outline: 'none',
    //                           color: getPrimaryColors('primary'),
    //                           backgroundColor: 'rgba(255,255,255,0.5)',
    //                           fontFamily: 'Exo2-Medium',
    //                           width: 'unset',
    //                           letterSpacing: 1.5,
    //                           fontSize: '1rem',
    //                           padding: '10px 1rem',
    //                           borderRadius: 3,
    //                           boxShadow: '0px 1px 3px -2px black'
    //                         }}
    //                       >
    //                         Register Now
    //                       </button>
    //                     </Link>
    //                     <Link
    //                       to={`/${routes.forgotPassword}/${props.userType}/mobile`}
    //                     >
    //                       <button
    //                         style={{
    //                           border: 'none',
    //                           outline: 'none',
    //                           color: getPrimaryColors('primary'),
    //                           backgroundColor: 'rgba(255,255,255,0.5)',
    //                           fontFamily: 'Exo2-Medium',
    //                           width: 'unset',
    //                           letterSpacing: 1.5,
    //                           fontSize: '1rem',
    //                           padding: '10px 1rem',
    //                           borderRadius: 3,
    //                           boxShadow: '0px 1px 3px -2px black'
    //                         }}
    //                       >
    //                         Forgot Password
    //                       </button>
    //                     </Link>
    //                   </div>
    //                 </form>
    //               </CSSTransition>
    //             ) : null}
    //             {props.verify ? (
    //               <CSSTransition
    //                 key="verify"
    //                 timeout={300}
    //                 classNames="login-transition"
    //               >
    //                 <VerifyCodeComponent
    //                   height={props.formRef.offsetHeight}
    //                   userType={props.userType}
    //                   activity={activity}
    //                   verifyType={props.verifyType}
    //                   mobile={props.fullMobile}
    //                   navigateTo={props.navigateTo}
    //                 />
    //               </CSSTransition>
    //             ) : null}
    //           </TransitionGroup>
    //         </div>
    //       </div>
    //     </Grid>
    //   </Grid>
    //   <div
    //     style={{
    //       padding: '0 0 1.5rem 1.5rem',
    //       fontFamily: 'Exo2-Medium',
    //       color: getPrimaryColors('primary')
    //     }}
    //   >
    //     &copy; 2019{' '}
    //     <span style={{ color: getPrimaryColors('secondary') }}>PPost</span>. All
    //     Rights Reserved.
    //   </div>
    // </div>
  );
};

LoginComponent.propTypes = {
  activity: PropTypes.bool,
  isForgotPassword: PropTypes.bool,
  verify: PropTypes.bool,
  showPassword: PropTypes.bool,
  mobile: PropTypes.string,
  userType: PropTypes.string,
  password: PropTypes.string,
  verifyType: PropTypes.string,
  fullMobile: PropTypes.string,
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
  growlRef: PropTypes.func,
  showGrowl: PropTypes.func,
  navigateTo: PropTypes.func,
  handleFieldRef: PropTypes.func,
  handleFormRef: PropTypes.func,
  tellInputRef: PropTypes.func,
  fieldRef: PropTypes.shape({ offsetHeight: PropTypes.number }),
  formRef: PropTypes.shape({ offsetHeight: PropTypes.number }),
  errors: PropTypes.objectOf(PropTypes.bool),
  handleLoginModalClose: PropTypes.func,
  handleModalViewChange: PropTypes.func
};

export default LoginComponent;
