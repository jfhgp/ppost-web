import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import UnitComponent from '../../components/UnitComponent';
import FormTelInput from '../../components/form/FormTelInput';
import LoginFormInput from '../../components/form/LoginFormInput';
import VerifyCodeComponent from '../../components/VerifyCodeComponent';
import { getPrimaryColors } from '../../utils/functions';
import { Checkbox } from '@material-ui/core';
import AppFooterComponent from '../../components/app/AppFooterComponent';
import AppTopBarLogin from '../../components/app/AppTopBarLogin';
import { classNames } from '../../utils/functions';

const CreateAccountComponent = props => {
  const {
    handleChange,
    activity,
    userType,
    errors,
    handleLoginModalOpen
  } = props;
  const getInfo = () => {
    if (userType === 'user') {
      return {
        text: 'as Customer',
        background:
          'linear-gradient(to bottom,  #152972 0%,#172b6d 36%,#233470 45%,#ebebeb 80%)',

        logo: `${process.env.PUBLIC_URL}/assets/images/PPost-logo-header.png`,
        borderColor: '#152972'
      };
    } else {
      return {
        text: 'as Transporter',
        background:
          'linear-gradient(to bottom,  #fa7816 0%,#fa7816 36%,#fa7816 45%,#ebebeb 80%)',

        logo: `${process.env.PUBLIC_URL}/assets/images/logo-transporter.png`,
        borderColor: '#fa7816'
      };
    }
  };

  return (
    <div
      className="create-account-container"
      style={{ backgroundImage: `${getInfo().background}` }}
    >
      <div>
        <div className="create-account-landing-container">
          {/* Navbar here */}

          <AppTopBarLogin
            imageSrc={getInfo().logo}
            handleLoginModalOpen={handleLoginModalOpen}
          />

          <div className="p-grid container">
            <div className="p-col-12 p-sm-12 p-md-12 p-lg-7">
              <div className="header-left">
                <span className="tagline">
                  Sign up
                  <span>{getInfo().text}</span>
                </span>
                <h1>
                  Fast and Consistently
                  <span>reliable delivery</span>
                </h1>
                <div className="app-btn-container">
                  <button
                    style={{
                      borderColor: getInfo().borderColor,
                      color: getInfo().borderColor
                    }}
                    className="btn btn-google"
                    href="#"
                    title="Google Play"
                  >
                    Google Play
                  </button>
                  <button
                    style={{
                      borderColor: getInfo().borderColor,
                      color: getInfo().borderColor
                    }}
                    className="btn btn-apple"
                    href="#"
                    title="App Store"
                  >
                    App Store
                  </button>
                </div>
              </div>
            </div>

            <div className="p-col-12 p-sm-12 p-md-12 p-lg-5 create-account-card">
              <div className="register-form">
                <TransitionGroup className="c-account-transition-group">
                  {!props.preference && !props.verify ? (
                    <CSSTransition
                      key="create-account"
                      timeout={300}
                      classNames="c-account-transition"
                    >
                      <form
                        onSubmit={props.handleSubmit}
                        style={{ width: '100%' }}
                      >
                        <div>
                          <LoginFormInput
                            type="text"
                            value={props.firstName}
                            onChange={e =>
                              handleChange('firstName', e.target.value)
                            }
                            placeholder="First Name"
                            left={
                              <img
                                src={require('../../static/icons/firstname-icon.png')}
                                style={{ marginRight: 20, width: 16 }}
                              />
                            }
                            error={errors.firstName}
                          />
                        </div>
                        <div>
                          <LoginFormInput
                            type="text"
                            value={props.lastName}
                            onChange={e =>
                              handleChange('lastName', e.target.value)
                            }
                            placeholder="Last Name"
                            left={
                              <img
                                src={require('../../static/icons/lastname-icon.png')}
                                style={{ marginRight: 20, width: 16 }}
                              />
                            }
                            error={errors.lastName}
                          />
                        </div>
                        <div>
                          <LoginFormInput
                            type="email"
                            value={props.email}
                            onChange={e =>
                              handleChange('email', e.target.value)
                            }
                            placeholder="Email"
                            left={
                              <img
                                src={require('../../static/icons/email-icon.png')}
                                style={{ marginRight: 20, width: 16 }}
                              />
                            }
                            error={errors.email}
                          />
                        </div>
                        <div>
                          <LoginFormInput
                            input={
                              <FormTelInput
                                value={props.mobile}
                                onChange={e =>
                                  handleChange('mobile', e.target.value)
                                }
                                ref={props.handleTelInputRef}
                                id="create-account-phone"
                              />
                            }
                            left={
                              <img
                                src={require('../../static/icons/verify-sms-icon.png')}
                                style={{ marginRight: 20, width: 16 }}
                              />
                            }
                            error={errors.mobile}
                          />
                        </div>
                        <div>
                          <LoginFormInput
                            type="password"
                            value={props.password}
                            onChange={e =>
                              handleChange('password', e.target.value)
                            }
                            placeholder="Password"
                            left={
                              <img
                                src={require('../../static/icons/password-icon.png')}
                                style={{ marginRight: 20, width: 16 }}
                              />
                            }
                            error={errors.password}
                          />
                        </div>

                        <div style={{ display: 'flex' }}>
                          <Checkbox
                            style={{ padding: '0 12px 0 0' }}
                            checked={props.agreeToTerms}
                            onChange={e =>
                              handleChange('agreeToTerms', e.target.checked)
                            }
                            color="primary"
                          />
                          <span
                            style={{
                              lineHeight: '22px',
                              fontFamily: 'Exo2-Light',
                              color: getPrimaryColors('primary')
                            }}
                          >
                            I agree to all{' '}
                            <span
                              style={{
                                textDecoration: 'underline',
                                fontFamily: 'Exo2-Medium',
                                color: getPrimaryColors('primary')
                              }}
                            >
                              Terms of services
                            </span>
                            .
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                          }}
                        >
                          <button
                            disabled={activity}
                            className={classNames([
                              'create-account-btn',
                              ['disabled', activity]
                            ])}
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </form>
                    </CSSTransition>
                  ) : null}

                  {!props.preference && props.verify ? (
                    <CSSTransition
                      key="create-account-verify"
                      timeout={300}
                      classNames="c-account-transition"
                    >
                      <VerifyCodeComponent
                        userType={props.userType}
                        verifyType="createAccount"
                        mobile={props.countryCode + props.mobile}
                        navigateTo={props.handleNavigateTo}
                        showPreference={props.showPreference}
                        handleLoginModalClose={props.handleLoginModalClose}
                      />
                    </CSSTransition>
                  ) : null}
                  {/* {props.preference ? (
                 <CSSTransition
                   key="create-account-preference"
                   timeout={300}
                   classNames="c-account-transition"
                 >
                   <UnitComponent navigateTo={props.handleNavigateTo} />
                 </CSSTransition>
               ) : null} */}
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
        <AppFooterComponent />
      </div>
    </div>
    // <div className="c-account-container">
    //   <div className="p-grid p-justify-center">
    //     <div className="p-col-12 p-md-8 p-lg-6 p-xl-6">
    //       <div id="c-account-form-card">
    //         <div>
    //           <Link to={`/${routes.home}`}>
    //             <img
    //               src={require('../../static/images/project-logo.png')}
    //               alt="logo"
    //             />
    //           </Link>
    //         </div>
    //         <div style={{ overflow: 'hidden' }}>
    //           <TransitionGroup className="c-account-transition-group">
    //             {!props.preference && !props.verify ? (
    //               <CSSTransition
    //                 key="create-account"
    //                 timeout={300}
    //                 classNames="c-account-transition"
    //               >
    //                 <form onSubmit={props.handleSubmit}>
    //                   <div id="form-title">
    //                     <span
    //                       style={{
    //                         fontFamily: 'Exo2-Medium',
    //                         color: getPrimaryColors('primary'),
    //                         fontSize: '1.5rem'
    //                       }}
    //                     >
    //                       Sign up
    //                     </span>
    //                     <span
    //                       style={{
    //                         fontFamily: 'Exo2-Light',
    //                         color: getPrimaryColors('primary'),
    //                         fontSize: '1rem'
    //                       }}
    //                     >
    //                       Create your account to get started
    //                     </span>
    //                   </div>
    //                   <div>
    //                     <LoginFormInput
    //                       type="text"
    //                       value={props.firstName}
    //                       onChange={e =>
    //                         handleChange('firstName', e.target.value)
    //                       }
    //                       placeholder="First Name"
    //                       left={
    //                         <img
    //                           src={require('../../static/icons/firstname-icon.png')}
    //                           style={{ marginRight: 20, width: 16 }}
    //                         />
    //                       }
    //                       error={errors.firstName}
    //                     />
    //                   </div>
    //                   <div>
    //                     <LoginFormInput
    //                       type="text"
    //                       value={props.lastName}
    //                       onChange={e =>
    //                         handleChange('lastName', e.target.value)
    //                       }
    //                       placeholder="Last Name"
    //                       left={
    //                         <img
    //                           src={require('../../static/icons/lastname-icon.png')}
    //                           style={{ marginRight: 20, width: 16 }}
    //                         />
    //                       }
    //                       error={errors.lastName}
    //                     />
    //                   </div>
    //                   <div>
    //                     <LoginFormInput
    //                       type="email"
    //                       value={props.email}
    //                       onChange={e => handleChange('email', e.target.value)}
    //                       placeholder="Email"
    //                       left={
    //                         <img
    //                           src={require('../../static/icons/email-icon.png')}
    //                           style={{ marginRight: 20, width: 16 }}
    //                         />
    //                       }
    //                       error={errors.email}
    //                     />
    //                   </div>
    //                   <div>
    //                     <LoginFormInput
    //                       input={
    //                         <FormTelInput
    //                           value={props.mobile}
    //                           onChange={e =>
    //                             handleChange('mobile', e.target.value)
    //                           }
    //                           ref={props.handleTelInputRef}
    //                           id="create-account-phone"
    //                         />
    //                       }
    //                       left={
    //                         <img
    //                           src={require('../../static/icons/verify-sms-icon.png')}
    //                           style={{ marginRight: 20, width: 16 }}
    //                         />
    //                       }
    //                       error={errors.mobile}
    //                     />
    //                   </div>
    //                   <div>
    //                     <LoginFormInput
    //                       type="password"
    //                       value={props.password}
    //                       onChange={e =>
    //                         handleChange('password', e.target.value)
    //                       }
    //                       placeholder="Password"
    //                       left={
    //                         <img
    //                           src={require('../../static/icons/password-icon.png')}
    //                           style={{ marginRight: 20, width: 16 }}
    //                         />
    //                       }
    //                       error={errors.password}
    //                     />
    //                   </div>
    //                   <div
    //                     style={{
    //                       display: 'flex',
    //                       alignItems: 'center',
    //                       justifyContent: 'space-between',
    //                       flexWrap: 'wrap'
    //                     }}
    //                   >
    //                     <div style={{ display: 'flex' }}>
    //                       <Checkbox
    //                         style={{ padding: '0 12px 0 0' }}
    //                         checked={props.agreeToTerms}
    //                         onChange={e =>
    //                           handleChange('agreeToTerms', e.target.checked)
    //                         }
    //                         color="primary"
    //                       />
    //                       <span
    //                         style={{
    //                           lineHeight: '22px',
    //                           fontFamily: 'Exo2-Light',
    //                           color: getPrimaryColors('primary')
    //                         }}
    //                       >
    //                         I agree to all{' '}
    //                         <span
    //                           style={{
    //                             textDecoration: 'underline',
    //                             fontFamily: 'Exo2-Medium',
    //                             color: getPrimaryColors('primary')
    //                           }}
    //                         >
    //                           Terms of services
    //                         </span>
    //                         .
    //                       </span>
    //                     </div>
    //                     <div
    //                       style={{
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         justifyContent: 'space-between'
    //                       }}
    //                     >
    //                       <button
    //                         disabled={activity}
    //                         className={activity ? 'disabled' : ''}
    //                         type="submit"
    //                         style={{
    //                           border: 'none',
    //                           outline: 'none',
    //                           color: '#fff',
    //                           backgroundColor: getPrimaryColors('primary'),
    //                           fontFamily: 'Exo2-Light',
    //                           width: 'unset',
    //                           padding: '4px 1rem',
    //                           letterSpacing: 1.5,
    //                           boxShadow: '0px 1px 6px -2px black',
    //                           lineHeight: '20px',
    //                           fontSize: '1rem'
    //                         }}
    //                       >
    //                         Create Account
    //                       </button>
    //                       <Link
    //                         to={`/${routes.login}/${props.userType}`}
    //                         style={{ alignSelf: 'flex-end' }}
    //                       >
    //                         <button
    //                           style={{
    //                             border: 'none',
    //                             outline: 'none',
    //                             color: getPrimaryColors('primary'),
    //                             backgroundColor: 'transparent',
    //                             fontFamily: 'Exo2-Medium',
    //                             width: 'unset',
    //                             letterSpacing: 1.5,
    //                             fontSize: '1rem'
    //                           }}
    //                         >
    //                           Sign in
    //                         </button>
    //                       </Link>
    //                     </div>
    //                   </div>
    //                 </form>
    //               </CSSTransition>
    //             ) : null}
    //             {!props.preference && props.verify ? (
    //               <CSSTransition
    //                 key="create-account-verify"
    //                 timeout={300}
    //                 classNames="c-account-transition"
    //               >
    //                 <VerifyCodeComponent
    //                   userType={props.userType}
    //                   verifyType="createAccount"
    //                   mobile={props.countryCode + props.mobile}
    //                   navigateTo={props.handleNavigateTo}
    //                   // showPreference={props.showPreference}
    //                 />
    //               </CSSTransition>
    //             ) : null}
    //             {/* {props.preference ? (
    //               <CSSTransition
    //                 key="create-account-preference"
    //                 timeout={300}
    //                 classNames="c-account-transition"
    //               >
    //                 <UnitComponent navigateTo={props.handleNavigateTo} />
    //               </CSSTransition>
    //             ) : null} */}
    //           </TransitionGroup>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
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

CreateAccountComponent.propTypes = {
  verify: PropTypes.bool,
  email: PropTypes.string,
  mobile: PropTypes.string,
  activity: PropTypes.bool,
  errors: PropTypes.shape(),
  password: PropTypes.string,
  lastName: PropTypes.string,
  userType: PropTypes.string,
  preference: PropTypes.bool,
  firstName: PropTypes.string,
  handleSubmit: PropTypes.func,
  agreeToTerms: PropTypes.bool,
  handleChange: PropTypes.func,
  countryCode: PropTypes.string,
  showPreference: PropTypes.func,
  handleNavigateTo: PropTypes.func,
  handleTelInputRef: PropTypes.func,
  handleLoginModalOpen: PropTypes.func,
  handleLoginModalClose: PropTypes.func
};

export default CreateAccountComponent;
