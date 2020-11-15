import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';

/** Layout **/
import AppLayout from './AppLayout';

/** Auth **/
import { authClass } from './utils/auth.util';

/**  Route Constants **/
import routes from './constants/route-constants';

/** Store **/
import { StoreProvider } from './utils/store.util';

/** CSS **/
import './App.css';
import './layout/layout.css';

/** Features **/
// Home
// Login
import Login from './features/login/LoginContainer';
// Not Found
import NotFoundComponent from './components/app/NotFoundComponent';
// Create Account
import CreateAccount from './features/create-account/CreateAccountContainer';
// Forgot Password
import ForgotPassword from './features/forgot-password/forgot-password-routes';
// Static Details
import StaticDetails from './features/orders/details/static-details/StaticRequestDetails';
// Get Rates
import GetRatesContainer from './features/get-rates/GetRatesContainer';

// Message Dialog
import MessageDialog from './components/ui/MessageDialog';
// Growl Dialog
import GrowlComponent from './components/ui/GrowlComponent';

// Static pages
import Home from './containers/Home';
import AboutUs from './containers/AboutUs';
import Contact from './containers/Contact';
import Services from './containers/Services';
import SendParcel from './containers/SendParcel';
import TrackParcel from './containers/TrackParcel';
import Transporters from './containers/Transporters';
import ReceiveParcel from './containers/ReceiveParcel';
import WebTermsAndConditions from './containers/WebTermsAndConditions';
import WebProhibitedItems from './containers/WebProhibitedItems';
import WebPrivacyAndPolicy from './containers/WebPrivacyAndPolicy';
import WebFAQs from './containers/WebFAQs';
import HowToDoBusiness from './containers/HowToDoBusiness';
import HowItWorks from './containers/HowItWorks';
import PPostSpace from './containers/PPostSpace';

import { Dialog } from '@material-ui/core';

import { LoginModalProvider } from './context/LoginModalContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
      loginModalOpen: false,
      userType: '',
    };
  }

  handleChatClick = (value) => {
    this.setState({ showChat: value })
  }

  handleLoginModalClose = async () => {
    this.props.history.push(`/create-account/${this.state.userType}`);
    this.setState({
      loginModalOpen: false,
      userType: ''
    });
  };

  handleLoginModalOpen = async userType => {
    if (authClass.getUser.userType === userType) {
      if (authClass.getUser.token) {
        await this.handleLoginModalClose();
        await this.props.history.push(`/${authClass.getUser.userType}/home`);
      }
    }
    else {
      this.setState({
        loginModalOpen: true,
        userType: userType
      });
    }
  };

  async componentDidMount() {
    await authClass.setUserFromLocal();
    this.setState({ shouldRender: true });
  }

  render() {
    return this.state.shouldRender ? (
      <StoreProvider>
        <div className="layout-main">
          <Switch>
            {/** Home **/}
            <Route
              path="/"
              exact
              render={() => <Redirect to={`/${routes.home}`} />}
            />
            <Route
              path={`/${routes.home}`}
              exact
              render={props => (
                <Home
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            {/** Login **/}
            {/* <ReRoute path={`/${routes.login}/:type`} exact component={Login} /> */}

            {/** Create Account **/}
            <ReRoute
              path={`/${routes.createAccount}/:type`}
              exact
              component={CreateAccount}
              handleLoginModalOpen={this.handleLoginModalOpen}
              handleLoginModalClose={this.handleLoginModalClose}
            />

            {/** Forgot Password **/}
            {/* <ReRoute
              path={`/${routes.forgotPassword}`}
              component={ForgotPassword}
            /> */}

            {/* Static Request Details */}
            <Route
              path={`/${routes.orders}/${routes.staticDetails}/:orderNumber`}
              exact
              component={StaticDetails}
            />

            <Route
              path={`/${routes.contact}`}
              exact
              render={props => (
                <Contact
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.services}`}
              exact
              render={props => (
                <Services
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.aboutUs}`}
              exact
              render={props => (
                <AboutUs
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.sendParcel}`}
              exact
              render={props => (
                <SendParcel
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.receiveParcel}`}
              exact
              render={props => (
                <ReceiveParcel
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.trackParcel}`}
              exact
              render={props => (
                <TrackParcel
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.transporters}`}
              exact
              render={props => (
                <Transporters
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.getRates}`}
              exact
              render={props => (
                <GetRatesContainer
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.privacyAndPolicy}`}
              exact
              render={props => (
                <WebPrivacyAndPolicy
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.prohibitedItems}`}
              exact
              render={props => (
                <WebProhibitedItems
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.termsAndConditions}`}
              exact
              render={props => (
                <WebTermsAndConditions
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.faq}`}
              exact
              render={props => (
                <WebFAQs
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.ppostSpace}`}
              exact
              render={props => (
                <PPostSpace
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.howToDoBusiness}`}
              exact
              render={props => (
                <HowToDoBusiness
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            <Route
              path={`/${routes.howItWorks}`}
              exact
              render={props => (
                <HowItWorks
                  {...props}
                  handleLoginModalOpen={this.handleLoginModalOpen}
                />
              )}
            />

            {/** Not Found **/}
            <Route path="/404" exact component={NotFoundComponent} />

            {/** App Sign-in Layout **/}
            <Route component={AppLayout} />
          </Switch>
          <MessageDialog />
          <GrowlComponent />
          <Dialog
            open={this.state.loginModalOpen}
            onClose={() => this.setState({ loginModalOpen: false })}
            className="loginDialog"
          >
            <LoginModalProvider value={this.handleLoginModalClose}>
              <Login
                {...this.state}
                handleLoginModalOpen={this.handleLoginModalOpen}
                handleLoginModalClose={this.handleLoginModalClose}
              />
            </LoginModalProvider>
          </Dialog>
        </div>
      </StoreProvider>
    ) : null;
  }
}

const ReRoute = ({
  component: Component,
  handleLoginModalOpen,
  handleLoginModalClose,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authClass.getUser.token ? (
          <Redirect
            to={{
              pathname: `/${authClass.getUser.userType}/${routes.home}`,
              state: { from: props.location }
            }}
          />
        ) : (
            <Component
              {...props}
              handleLoginModalOpen={handleLoginModalOpen}
              handleLoginModalClose={handleLoginModalClose}
            />
          )
      }
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authClass.getUser.token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/home',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.shape(),
  component: PropTypes.func
};

ReRoute.propTypes = {
  location: PropTypes.shape(),
  component: PropTypes.func,
  handleLoginModalOpen: PropTypes.func,
  handleLoginModalClose: PropTypes.func
};

export default withRouter(App);
