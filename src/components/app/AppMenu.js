import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class AppSubMenu extends Component {
  static defaultProps = {
    className: null,
    items: null,
    onMenuItemClick: null,
    root: false,
    pathName: ''
  };

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    root: PropTypes.bool,
    pathName: PropTypes.string
  };

  onMenuItemClick(event, item) {
    if (item.route === this.props.pathName) {
      event.preventDefault();
    }

    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //prevent hash change
    if (item.items || !item.route) {
      event.preventDefault();
    }

    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick({
        originalEvent: event,
        item: item
      });
    }
  }

  render() {
    let items =
      this.props.items &&
      this.props.items.map((item, i) => {
        let submenuIcon = item.items && (
          <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />
        );

        return (
          <li className={item.badgeStyleClass} key={i}>
            {item.items && this.props.root === true && (
              <div className="arrow" />
            )}
            <NavLink
              to={item.route}
              onClick={e => this.onMenuItemClick(e, item, i)}
              target={item.target}
              activeClassName="active-menuitem"
            >
              <div>
                <i className={item.icon} />
                <span>{item.label}</span>
                {submenuIcon}
                {/* {badge} */}
              </div>
            </NavLink>
            <AppSubMenu
              items={item.items}
              onMenuItemClick={this.props.onMenuItemClick}
            />
          </li>
        );
      });

    return items ? <ul className={this.props.className}>{items}</ul> : null;
  }
}

const AppMenu = props => {
  return (
    <div className="menu">
      <AppSubMenu
        items={props.model}
        className="layout-main-menu"
        onMenuItemClick={props.onMenuItemClick}
        root={true}
        pathName={props.location.pathname}
      />
    </div>
  );
};

AppMenu.propTypes = {
  model: PropTypes.array,
  onMenuItemClick: PropTypes.func,
  location: PropTypes.shape({ pathname: PropTypes.string })
};

export default AppMenu;

// let active = this.state.activeIndex === i;
// let styleClass = classNames(item.badgeStyleClass, {
//   'active-menuitem': active
// });
// let badge = item.badge && (
//   <span className="menuitem-badge">{item.badge}</span>
// );
