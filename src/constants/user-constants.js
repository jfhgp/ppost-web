/**
 *
 * Constants for different type of users
 */

/** Features **/

// User //
// Home
import UserHome from '../containers/UserHome';
// Orders
import Orders from '../features/orders/orders-routes';
// Promotions
import Promotions from '../features/promotions/PromotionsContainer';
// Payments
import CardsList from '../features/payments/card/list/CardListContainer';
// Settings
import UserSettings from '../features/user-settings/UserSettingsContainer';
// Notifications
import Notifications from '../features/notifications/NotificationsContainer';

// Transporter //
// Home
import { TransporterHome } from '../containers/TransporterHome';
// My Drivers
import MyDrivers from '../features/my-drivers/my-drivers-routes';
// My Finances
import MyFinances from '../features/my-finances/my-finances-routes';
// Requests
import Requests from '../features/requests/list/RequestsListContainer';
// My Requests
import MyRequests from '../features/my-requests/list/MyRequestsListContainer';
import SchedulePickup from '../features/my-requests/SchedulePickup/SchedulePickupListContainer';
import MapView from '../features/my-requests/MapView/MapViewContainer';
// My Vehicles
import MyVehicles from '../features/my-vehicles/list/MyVehiclesListContainer';
// My Spaces
import MySpaces from '../features/my-spaces/list/MySpacesListContainer';
import MySpacesAddContainer from '../features/my-spaces/add/MySpacesAddContainer';
import MySpacesUpdateContainer from '../features/my-spaces/update/MySpacesUpdateContainer';
// My Vehicles Add
import MyVehiclesAddContainer from '../features/my-vehicles/add/MyVehiclesAddContainer';
// Request Details
import RequestDetails from '../features/my-requests/details/MyRequestsDetailsContainer';
// Profile
import TransporterProfile from '../features/profile/transporter/TransporterProfileContainer';
import CustomerProfile from '../features/profile/Customer/CustomerProfileContainer';
// Settings
import TransporterSettings from '../features/transporter-settings/TransporterSettingsContainer';
// My Vehicles Update
import MyVehiclesUpdateContainer from '../features/my-vehicles/update/MyVehiclesUpdateContainer';
// My Drivers Requests
import MyDriversRequests from '../features/my-drivers-requests/list/MyDriversRequestsListContainer';

// Misc //
import FAQDashboard from '../containers/FAQDashboard';
import ProhibitedItems from '../containers/ProhibitedItems';
import PrivacyAndPolicy from '../containers/PrivacyAndPolicy';
import TermsAndConditions from '../containers/TermsAndConditions';

import routes from './route-constants';

// Chat Component

const userTypes = {
  USER: 'user',
  DRIVER: 'driver',
  TRANSPORTER: 'transporter'
};

// Customer
const typeUserMenu = [
  {
    label: 'Home',
    icon: 'home-icon',
    route: `/${routes.typeUser}/${routes.loggedInHome}`
  },

  {
    label: 'My Requests',
    icon: 'my-request-icon',
    route: `/${routes.typeUser}/${routes.orders}`
  },
  {
    label: 'Notifications',
    icon: 'notification-icon',
    route: `/${routes.typeUser}/${routes.notifications}`
  },
  {
    label: 'Payments',
    icon: 'payments-icon',
    route: `/${routes.typeUser}/${routes.payments}`
  },
  {
    label: 'My Spaces',
    icon: 'vehicle-icon',
    route: `/${routes.typeUser}/${routes.spaces}`
  },
  {
    label: 'Promotion',
    icon: 'promotion-icon',
    route: `/${routes.typeUser}/${routes.promotions}`
  },
  {
    label: 'Settings',
    icon: 'setting-icon',
    route: `/${routes.typeUser}/${routes.settings}`
  },
  {
    label: 'Help',
    icon: 'help-icon',
    dataName: 'Help',
    items: [
      {
        label: 'FAQ',
        icon: 'faq-icon',
        route: `/${routes.typeUser}/${routes.faq}`
      },
      {
        label: 'Prohibited Items',
        icon: 'prohibited-icon',
        route: `/${routes.typeUser}/${routes.prohibitedItems}`
      },
      {
        label: 'Terms and Conditions',
        icon: 'terms-icon',
        route: `/${routes.typeUser}/${routes.termsAndConditions}`
      },
      {
        label: 'Privacy Policy',
        icon: 'privacy-icon',
        route: `/${routes.typeUser}/${routes.privacyAndPolicy}`
      }
    ]
  },
  {
    label: 'Support',
    icon: 'support-icon',
    dataName: 'Support',
    items: [
      {
        isEmail: true,
        label: 'Email',
        icon: 'email-icon',
        route: `mailto:customerservice@ppost.com`
      },
      {
        label: 'Call',
        isEmail: true,
        icon: 'call-icon',
        route: `tel:+000000000`
      },
      {
        label: 'Live Chat',
        isChat: true,
        icon: 'support-icon',
      }
    ]
  }
];

// Transporter
const typeTransporterMenu = [
  {
    label: 'Home',
    icon: 'home-icon',
    route: `/${routes.typeTransporter}/${routes.loggedInHome}`
  },
  {
    label: 'Requests',
    icon: 'my-request-icon',
    dataName: 'Requests',
    items: [
      {
        label: 'My Requests',
        icon: 'my-request-icon',
        route: `/${routes.typeTransporter}/${routes.myRequests}`
      },
      {
        label: 'Schedule Pickup',
        icon: 'my-request-icon',
        route: `/${routes.typeTransporter}/${routes.schedulePickup}`
      },
      {
        label: 'Driver Requests',
        icon: 'driver-request-icon',
        route: `/${routes.typeTransporter}/${routes.myDriversRequests}`
      }
    ]
  },
  {
    label: 'Find a Request',
    icon: 'find-request-icon',
    route: `/${routes.typeTransporter}/${routes.requests}`
  },
  {
    label: 'My Drivers',
    icon: 'driver-icon',
    route: `/${routes.typeTransporter}/${routes.myDrivers}`
  },
  {
    label: 'Mode of Transportation',
    icon: 'vehicle-icon',
    route: `/${routes.typeTransporter}/${routes.vehicles}`
  },
  {
    label: 'My Spaces',
    icon: 'vehicle-icon',
    route: `/${routes.typeTransporter}/${routes.spaces}`
  },
  // {
  //   label: 'My Service Areas',
  //   icon: 'fas fa-bus',
  //   route: `/${routes.typeTransporter}/${routes.serviceAreas}`
  // },
  // {
  //   label: 'My Journeys',
  //   icon: 'fas fa-wallet',
  //   route: `/${routes.typeTransporter}/${routes.journeys}`
  // },
  {
    label: 'My Earnings',
    icon: 'earning-icon',
    route: `/${routes.typeTransporter}/${routes.myEarnings}`
  },
  {
    label: 'Notifications',
    icon: 'notification-icon',
    route: `/${routes.typeTransporter}/${routes.notifications}`
  },
  {
    label: 'Promotion',
    icon: 'promotion-icon',
    route: `/${routes.typeTransporter}/${routes.promotions}`
  },
  {
    label: 'Settings',
    icon: 'setting-icon',
    route: `/${routes.typeTransporter}/${routes.settings}`
  },
  {
    label: 'Help',
    icon: 'help-icon',
    dataName: 'Help',
    route: `/${routes.typeTransporter}/${routes.help}`,
    items: [
      {
        label: 'FAQ',
        icon: 'faq-icon',
        route: `/${routes.typeTransporter}/${routes.faq}`
      },
      {
        label: 'Prohibited Items',
        icon: 'prohibited-icon',
        route: `/${routes.typeTransporter}/${routes.prohibitedItems}`
      },
      {
        label: 'Terms and Conditions',
        icon: 'terms-icon',
        route: `/${routes.typeTransporter}/${routes.termsAndConditions}`
      },
      {
        label: 'Privacy Policy',
        icon: 'privacy-icon',
        route: `/${routes.typeTransporter}/${routes.privacyAndPolicy}`
      }
    ]
  },
  {
    label: 'Support',
    icon: 'support-icon',
    dataName: 'Support',
    route: `/${routes.typeTransporter}/${routes.help}`,
    items: [
      {
        isEmail: true,
        label: 'Email',
        icon: 'email-icon',
        route: `mailto:customerservice@ppost.com`
      },
      {
        label: 'Call',
        isEmail: true,
        icon: 'call-icon',
        route: `tel:+000000000`
      },
      {
        label: 'Live Chat',
        isChat: true,
        icon: 'support-icon',
      }
    ]
  }
];

// Drivers
const typeDriverMenu = [
  {
    label: 'Home',
    icon: 'home-icon',
    route: `/${routes.typeTransporter}/${routes.loggedInHome}`
  },
  {
    label: 'My Requests',
    icon: 'my-request-icon',
    route: `/${routes.typeTransporter}/${routes.myRequests}`
  },
  {
    label: 'Find a Request',
    icon: 'find-request-icon',
    route: `/${routes.typeTransporter}/${routes.requests}`
  },
  {
    label: 'Notifications',
    icon: 'notification-icon',
    route: `/${routes.typeTransporter}/${routes.notifications}`
  },
  {
    disabled: true,
    label: 'Promotions',
    icon: 'promotion-icon',
    route: `/${routes.typeTransporter}/${routes.promotions}`
  },
  {
    label: 'Settings',
    icon: 'setting-icon',
    route: `/${routes.typeTransporter}/${routes.settings}`
  },
  {
    label: 'Help',
    icon: 'help-icon',
    dataName: 'Help',
    route: `/${routes.typeTransporter}/${routes.help}`,
    items: [
      {
        label: 'FAQ',
        icon: 'faq-icon',
        route: `/${routes.typeTransporter}/${routes.faq}`
      },
      {
        label: 'Prohibited Items',
        icon: 'prohibited-icon',
        route: `/${routes.typeTransporter}/${routes.prohibitedItems}`
      },
      {
        label: 'Terms and Conditions',
        icon: 'terms-icon',
        route: `/${routes.typeTransporter}/${routes.termsAndConditions}`
      },
      {
        label: 'Privacy Policy',
        icon: 'privacy-icon',
        route: `/${routes.typeTransporter}/${routes.privacyAndPolicy}`
      }
    ]
  },
  {
    label: 'Support',
    icon: 'support-icon',
    dataName: 'Support',
    route: `/${routes.typeTransporter}/${routes.help}`,
    items: [
      {
        isEmail: true,
        label: 'Email',
        icon: 'email-icon',
        route: `mailto:customerservice@ppost.com`
      },
      {
        label: 'Call',
        isEmail: true,
        icon: 'call-icon',
        route: `tel:123456789`
      },
      {
        label: 'Live Chat',
        isChat: true,
        icon: 'support-icon',
      }
    ]
  }
];

export const getMenu = user => {
  switch (user.userType) {
    case userTypes.USER: {
      return typeUserMenu;
    }
    case userTypes.TRANSPORTER: {
      if (user.isSubDriver) {
        return typeDriverMenu;
      }
      return typeTransporterMenu;
    }
    default:
      return [];
  }
};

// Routes based on user type

// Customer
const typeUserRoutes = [
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.loggedInHome}`,
    component: UserHome
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.settings}`,
    component: UserSettings
  },
  {
    exact: true,
    params: { hideBankAccount: false },
    path: `/${routes.typeUser}/${routes.profile}`,
    component: CustomerProfile
  },
  {
    exact: true,
    params: { hideBankAccount: false },
    path: `/${routes.typeTransporter}/${routes.profile}/:id`,
    component: TransporterProfile
  },
  {
    path: `/${routes.typeUser}/${routes.orders}`,
    component: Orders
  },
  {
    path: `/${routes.typeUser}/${routes.orders}/:status`,
    component: Orders
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.payments}`,
    component: CardsList
  },
  {
    exact: true,
    path: `/:userType/${routes.notifications}`,
    component: Notifications
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.promotions}`,
    component: Promotions
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.spaces}`,
    component: MySpaces
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.space}/:spaceId/:spaceStatus`,
    component: MyRequests
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.spaces}/${routes.addSpaces}`,
    component: MySpacesAddContainer
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.spaces}/${routes.spacesDetails}/:id`,
    component: MySpacesUpdateContainer
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.faq}`,
    component: FAQDashboard
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.prohibitedItems}`,
    component: ProhibitedItems
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.termsAndConditions}`,
    component: TermsAndConditions
  },
  {
    exact: true,
    path: `/${routes.typeUser}/${routes.privacyAndPolicy}`,
    component: PrivacyAndPolicy
  }
];

// Transporter
const typeTransporterRoutes = [
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.loggedInHome}`,
    component: TransporterHome
  },
  {
    exact: true,
    path: `/:userType/${routes.notifications}`,
    component: Notifications
  },
  {
    exact: true,
    params: { hideBankAccount: false },
    path: `/${routes.typeTransporter}/${routes.profile}`,
    component: TransporterProfile
  },
  {
    exact: true,
    params: { hideBankAccount: false },
    path: `/${routes.typeUser}/${routes.profile}/:id`,
    component: CustomerProfile
  },
  {
    exact: true,
    params: { hideBankAccount: false },
    path: `/${routes.typeTransporter}/${routes.settings}`,
    component: TransporterSettings
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.promotions}`,
    component: Promotions
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.requests}`,
    component: Requests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.myRequests}`,
    component: MyRequests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.schedulePickup}`,
    component: SchedulePickup
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.mapView}`,
    component: MapView
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.myRequests}/:status`,
    component: MyRequests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.myDriversRequests}`,
    component: MyDriversRequests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.requests}/${routes.requestDetails}/:id`,
    component: RequestDetails
  },

  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.spaces}`,
    component: MySpaces
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.space}/:spaceId/:spaceStatus`,
    component: MyRequests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.spaces}/${routes.addSpaces}`,
    component: MySpacesAddContainer
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.spaces}/${routes.spacesDetails}/:id`,
    component: MySpacesUpdateContainer
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.vehicles}`,
    component: MyVehicles
  },

  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.vehicles}/${routes.addVehicles}`,
    component: MyVehiclesAddContainer
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.vehicles}/${routes.vehiclesDetails}/:id`,
    component: MyVehiclesUpdateContainer
  },
  {
    path: `/${routes.typeTransporter}/${routes.myDrivers}`,
    component: MyDrivers
  },
  {
    path: `/${routes.typeTransporter}/${routes.myEarnings}`,
    component: MyFinances
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.faq}`,
    component: FAQDashboard
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.prohibitedItems}`,
    component: ProhibitedItems
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.termsAndConditions}`,
    component: TermsAndConditions
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.privacyAndPolicy}`,
    component: PrivacyAndPolicy
  }
];

// Driver
const typeDriverRoutes = [
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.loggedInHome}`,
    component: TransporterHome
  },
  {
    exact: true,
    path: `/:userType/${routes.notifications}`,
    component: Notifications
  },
  {
    exact: true,
    params: { hideBankAccount: true },
    path: `/${routes.typeTransporter}/${routes.profile}`,
    component: TransporterProfile
  },
  {
    exact: true,
    params: { hideBankAccount: true },
    path: `/${routes.typeTransporter}/${routes.settings}`,
    component: TransporterSettings
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.requests}`,
    component: Requests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.myRequests}`,
    component: MyRequests
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.requests}/${routes.requestDetails}/:id`,
    component: RequestDetails
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.faq}`,
    component: FAQDashboard
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.prohibitedItems}`,
    component: ProhibitedItems
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.termsAndConditions}`,
    component: TermsAndConditions
  },
  {
    exact: true,
    path: `/${routes.typeTransporter}/${routes.privacyAndPolicy}`,
    component: PrivacyAndPolicy
  }
];

const TempComponent = () => {
  return null;
};

export const getRoutes = user => {
  switch (user.userType) {
    case userTypes.USER: {
      return typeUserRoutes;
    }
    case userTypes.TRANSPORTER: {
      if (user.isSubDriver) {
        return typeDriverRoutes;
      }
      return typeTransporterRoutes;
    }
    default:
      return [{ path: '', component: TempComponent }];
  }
};
