import React from 'react';

import PropTypes from 'prop-types';

import HeaderComponent from './HeaderComponent';
import NavLinkComponents from '../components/NavLinkComponents';

require('../layout/layout.css');

class Header extends React.Component {
  state = {
    drawerOpen: false,
    headerShow: false
  };

  toggleDrawer = value => {
    this.setState({
      drawerOpen: value,
      headerShow: true
    });
  };

  handleScroll = () => {
    if (window.scrollY > 30) return this.setState({ headerShow: true });
    return this.setState({ headerShow: false });
  };

  componentDidMount() {
    if (!this.props.showHeader) {
      this.setState({ headerShow: true });
      return;
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  render() {
    const { headerShow, drawerOpen } = this.state;
    return (
      <HeaderComponent
        drawerOpen={drawerOpen}
        headerShow={headerShow}
        toggleDrawer={this.toggleDrawer}
        classes={this.props.classes}
        handleLoginModalOpen={this.props.handleLoginModalOpen}
      >
        <NavLinkComponents />
      </HeaderComponent>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.string,
  showHeader: PropTypes.bool,
  handleLoginModalOpen: PropTypes.func
};

export default Header;
