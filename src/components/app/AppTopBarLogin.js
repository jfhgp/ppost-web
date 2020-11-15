import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { classNames } from '../../utils/functions';
import routes from '../../constants/route-constants';
import Button from '@material-ui/core/Button';

const AppTopBarLogin = props => {
  const { imageSrc } = props;
  const [openMenu, setOpenMenu] = useState(false);

  const toggleClassNames = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <React.Fragment>
      <div className="p-grid container">
        <nav className="login-navbar">
          <span
            className="login-navbar-toggle "
            id="js-navbar-toggle"
            onClick={toggleClassNames}
          >
            <i className="fas fa-bars"></i>
          </span>
          <div className="navbar-header" style={{ width: 188 }}>
            <div className="navbar-brand">
              <Link to={`/${routes.home}`}>
                <img style={{ width: '100%' }} src={imageSrc} alt="logo" />
              </Link>
            </div>
          </div>
          <ul
            className={classNames(['login-main-nav', ['active', openMenu]])}
            id="js-menu"
          >
            <div>
              <li>
                <Link to="/transporters" className="nav-links">
                  Transporters
                </Link>
              </li>
              <li>
                <Link to="/services" className="nav-links">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-links">
                  Contact
                </Link>
              </li>
            </div>
            {/* <li>
              <a
                className="nav-links"
                onClick={() =>
                  props.handleLoginModalOpen(props.match.params.type)
                }
              >
                Sign in
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

AppTopBarLogin.propTypes = {
  imageSrc: PropTypes.string,
  handleLoginModalOpen: PropTypes.func
};

export default withRouter(AppTopBarLogin);
