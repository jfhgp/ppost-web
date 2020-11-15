import React from 'react';
import PropTypes from 'prop-types';

// send email
import SendEmail from './send-email/SendEmailContainer';
// verify code
import VerifyCode from './verify-code/FPVerifyCodeContainer';
// reset password
import ResetPassword from './reset-password/ResetPasswordContainer';

class ForgotPasswordRoutes extends React.Component {
  state = {
    step: 1
  };

  nextStep = () => {
    this.setState(prevState => ({
      step: prevState.step + 1
    }));
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <SendEmail
            nextStep={this.nextStep}
            userType={this.props.userType}
            handleModalViewChange={this.props.handleModalViewChange}
            handleLoginModalClose={this.props.handleLoginModalClose}
          />
        );
      case 2:
        return (
          <VerifyCode
            nextStep={this.nextStep}
            userType={this.props.userType}
            handleModalViewChange={this.props.handleModalViewChange}
            handleLoginModalClose={this.props.handleLoginModalClose}
          />
        );
      case 3:
        return (
          <ResetPassword
            nextStep={this.nextStep}
            userType={this.props.userType}
            handleModalViewChange={this.props.handleModalViewChange}
            handleLoginModalClose={this.props.handleLoginModalClose}
          />
        );
    }
  }
}
// const ForgotPasswordRoutes = () => {
//   return (
//     <Switch>
//       <Route
//         path={`/${routes.forgotPassword}/:type/mobile`}
//         exact
//         component={SendEmail}
//       />
//       <Route
//         path={`/${routes.forgotPassword}/:type/verify`}
//         exact
//         component={VerifyCode}
//       />
//       <Route
//         path={`/${routes.forgotPassword}/:type/reset-password`}
//         exact
//         component={ResetPassword}
//       />

//       {/* Not Found */}
//       <Redirect to="/404" />
//     </Switch>
//   );
// };

ForgotPasswordRoutes.propTypes = {
  userType: PropTypes.string,
  handleModalViewChange: PropTypes.func,
  handleLoginModalClose: PropTypes.func
};

export default ForgotPasswordRoutes;
