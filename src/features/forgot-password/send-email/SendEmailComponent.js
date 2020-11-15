import React from 'react';
import PropTypes from 'prop-types';

import { getPrimaryColors } from '../../../utils/functions';
import FormTelInput from '../../../components/form/FormTelInput';
import LoginFormInput from '../../../components/form/LoginFormInput';

const SendEmailComponent = props => {
  const { activity } = props;
  return (
    <div
      className="_s-email-container"
      style={{ background: 'none', width: '100%' }}
    >
      <div className="p-grid">
        <div
          className="p-col-12 p-md-8 p-lg-6 p-xl-6"
          style={{ width: '100%', padding: 0 }}
        >
          <form onSubmit={props.handleSubmit}>
            <div id="form-title" style={{ padding: '1.5rem 0' }}>
              <span
                style={{
                  fontFamily: 'Exo2-Medium',
                  color: getPrimaryColors('primary'),
                  fontSize: '1.5rem'
                }}
              >
                Forgot Password
              </span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <LoginFormInput
                input={
                  <FormTelInput
                    value={props.mobile}
                    onChange={e => props.handleChange('mobile', e.target.value)}
                    placeholder="mobile"
                    autoFocus
                    name="mobile"
                    ref={props.tellInputRef}
                  />
                }
                left={
                  <img
                    src={require('../../../static/icons/verify-sms-icon.png')}
                    style={{ marginRight: 20, width: 16 }}
                  />
                }
                error={props.error}
              />
              <small
                style={{
                  margin: 0,
                  color: getPrimaryColors('primary'),
                  fontFamily: 'Exo2-Light',
                  display: 'inline-block',
                  marginTop: 14,
                  fontSize: 13
                }}
              >
                Please enter your registered phone number. We will send you a
                verification code.
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
                  padding: '12px 20px',
                  letterSpacing: 1.5,
                  lineHeight: '20px',
                  fontSize: '1rem',
                  borderRadius: 3
                }}
              >
                Next
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between'
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
                  borderRadius: 3
                }}
              >
                Sign up
              </span>

              <span
                style={{
                  border: 'none',
                  outline: 'none',
                  color: getPrimaryColors('primary'),
                  fontFamily: 'Exo2-Medium',
                  width: 'unset',
                  letterSpacing: 1.5,
                  fontSize: '1rem',
                  padding: '10px 1rem',
                  borderRadius: 3
                }}
              >
                Sign in
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div className="s-email-container">
    //   <div className="p-grid p-justify-center">
    //     <div className="p-col-12 p-md-8 p-lg-6 p-xl-6">
    //       <div id="s-email-form-card">
    //         <div>
    //           <Link to={`/${routes.home}`}>
    //             <img
    //               src={require('../../../static/images/project-logo.png')}
    //               alt="logo"
    //             />
    //           </Link>
    //         </div>
    //         <div>
    //           {/* <TransitionGroup className="login-transition-group">
    //             {!props.verify ? (
    //               <CSSTransition
    //                 key="login"
    //                 timeout={300}
    //                 classNames="login-transition"
    //                 ref={props.handleFormRef}
    //               > */}
    //           <form onSubmit={props.handleSubmit}>
    //             <div id="form-title">
    //               <span
    //                 style={{
    //                   fontFamily: 'Exo2-Medium',
    //                   color: getPrimaryColors('primary'),
    //                   fontSize: '1.5rem'
    //                 }}
    //               >
    //                 Forgot Password
    //               </span>
    //               <span
    //                 style={{
    //                   fontFamily: 'Exo2-Light',
    //                   color: getPrimaryColors('primary'),
    //                   fontSize: '1rem'
    //                 }}
    //               >
    //                 Fast & consistently reliable delivery.
    //               </span>
    //               <p
    //                 style={{
    //                   fontFamily: 'Exo2-Light',
    //                   color: getPrimaryColors('primary'),
    //                   fontSize: '1rem',
    //                   margin: '16px 0 10px 0',
    //                   letterSpacing: 2,
    //                   width: '100%',
    //                   textAlign: 'center'
    //                 }}
    //               >
    //                 The game-changing delivery app for home or business
    //               </p>
    //             </div>
    //             <div>
    //               <LoginFormInput
    //                 input={
    //                   <FormTelInput
    //                     value={props.mobile}
    //                     onChange={e =>
    //                       props.handleChange('mobile', e.target.value)
    //                     }
    //                     placeholder="mobile"
    //                     autoFocus
    //                     name="mobile"
    //                     ref={props.tellInputRef}
    //                   />
    //                 }
    //                 left={
    //                   <img
    //                     src={require('../../../static/icons/verify-sms-icon.png')}
    //                     style={{ marginRight: 20, width: 16 }}
    //                   />
    //                 }
    //                 error={props.error}
    //               />
    //               <small
    //                 style={{
    //                   margin: 0,
    //                   color: getPrimaryColors('primary'),
    //                   fontFamily: 'Exo2-Light',
    //                   display: 'inline-block',
    //                   marginTop: 14,
    //                   fontSize: 13
    //                 }}
    //               >
    //                 Please enter your registered phone number. We will send you
    //                 a verification code.
    //               </small>
    //             </div>
    //             <div style={{ textAlign: 'right' }}>
    //               <button
    //                 disabled={activity}
    //                 className={activity ? 'disabled' : ''}
    //                 type="submit"
    //                 style={{
    //                   border: 'none',
    //                   outline: 'none',
    //                   color: '#fff',
    //                   backgroundColor: getPrimaryColors('primary'),
    //                   fontFamily: 'Exo2-Light',
    //                   width: 'unset',
    //                   padding: '4px 2rem',
    //                   letterSpacing: 1.5,
    //                   boxShadow: '0px 1px 6px -2px black',
    //                   lineHeight: '20px',
    //                   fontSize: '1rem'
    //                 }}
    //               >
    //                 Next
    //               </button>
    //             </div>
    //             <div
    //               style={{
    //                 display: 'flex',
    //                 marginTop: '5rem',
    //                 alignItems: 'center',
    //                 justifyContent: 'space-between'
    //               }}
    //             >
    //               <Link to={`/${routes.createAccount}/${props.userType}`}>
    //                 <button
    //                   style={{
    //                     border: 'none',
    //                     outline: 'none',
    //                     color: getPrimaryColors('primary'),
    //                     backgroundColor: 'rgba(255,255,255,0.5)',
    //                     fontFamily: 'Exo2-Medium',
    //                     width: 'unset',
    //                     letterSpacing: 1.5,
    //                     fontSize: '1rem',
    //                     padding: '10px 1rem',
    //                     borderRadius: 3,
    //                     boxShadow: '0px 1px 3px -2px black'
    //                   }}
    //                 >
    //                   Register Now
    //                 </button>
    //               </Link>
    //               <Link to={`/${routes.login}/${props.userType}`}>
    //                 <button
    //                   style={{
    //                     border: 'none',
    //                     outline: 'none',
    //                     color: getPrimaryColors('primary'),
    //                     backgroundColor: 'rgba(255,255,255,0.5)',
    //                     fontFamily: 'Exo2-Medium',
    //                     width: 'unset',
    //                     letterSpacing: 1.5,
    //                     fontSize: '1rem',
    //                     padding: '10px 1rem',
    //                     borderRadius: 3,
    //                     boxShadow: '0px 1px 3px -2px black'
    //                   }}
    //                 >
    //                   Signin
    //                 </button>
    //               </Link>
    //             </div>
    //           </form>
    //           {/* </CSSTransition>
    //             ) : null}
    //           </TransitionGroup> */}
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

SendEmailComponent.propTypes = {
  error: PropTypes.bool,
  mobile: PropTypes.string,
  activity: PropTypes.bool,
  userType: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  tellInputRef: PropTypes.func,
  handleLoginModalClose: PropTypes.func
};

export default SendEmailComponent;
