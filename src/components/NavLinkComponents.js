import React from 'react';

import NavLinkComponent from './NavLinkComponent';
import routes from '../constants/route-constants';


const NavLinkComponents = () => {
  return (
    <React.Fragment>
      <NavLinkComponent name="About Us" goto={`${routes.aboutUs}`} />
      <NavLinkComponent
        name="Services"
        goto={`${routes.services}`}
        subMenu={true}
        items={[
          { name: 'Send Parcel', goto: routes.sendParcel },
          { name: 'Receive Parcel', goto: routes.receiveParcel },
          { name: 'Track Parcel', goto: routes.trackParcel }
        ]}
      />
      {/* <NavLinkComponent name="Send Parcel" goto={`${routes.sendParcel}`} />
      <NavLinkComponent
        name="Receive Parcel"
        goto={`${routes.receiveParcel}`}
      />
      <NavLinkComponent name="Track Parcel" goto={`${routes.trackParcel}`} /> */}
      <NavLinkComponent name="PPost Space" goto={`${routes.ppostSpace}`} />
      <NavLinkComponent name="Get Rate" goto={`${routes.getRates}`} />
      <NavLinkComponent name="Transporters" goto={`${routes.transporters}`} />
      <NavLinkComponent name="Contact" goto={`${routes.contact}`} />
    </React.Fragment>
  );
};

NavLinkComponents.propTypes = {};

export default NavLinkComponents;
