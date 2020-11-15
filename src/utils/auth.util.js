import localStore from './localstore.util';
import { updateHeaders } from '../service';

export const getToken = () => localStore.get_data('token');

export const setToken = token => localStore.store_data('token', token);

export const getCurrentLocation = () => localStore.get_data('location');

export const setCurrentLocation = location => localStore.store_data('location', location);

export const getRatesData = () => localStore.get_data('rates');

export const setRatesData = rates => localStore.store_data('rates', rates);

export const removeRatesData = async () => await localStore.remove_data('rates');

export const getUser = () => localStore.get_data('user');

export const setUser = user => localStore.store_data('user', user);

export const removeUser = async () => await localStore.remove_data('user');

const logout = async () => {
  await removeUser();
  await updateHeaders();
  return true;
};


export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
  // return Promise.resolve(response);
};

const INITIAL_USER_DATA = {
  _id: null,
  config: {},
  token: null,
  email: null,
  mobile: null,
  picture: null,
  userType: null,
  lastName: null,
  firstName: null,
  available: false,
  isSubDriver: false,
  notifications: false,
  twoFactorLogin: false
};

class Auth {
  constructor() {
    this.user = INITIAL_USER_DATA;
  }

  async setUserFromLocal() {
    try {
      const user = await getUser();
      this.user._id = user._id;
      this.user.token = user.token;
      this.user.userType = user.userType;
      this.user.config = user.config;
      // ================================
      this.user.email = user.email;
      this.user.mobile = user.mobile;
      this.user.lastName = user.lastName;
      this.user.firstName = user.firstName;
      this.user.picture = user.picture || '';
      this.user.notifications = user.notifications;
      this.user.twoFactorLogin = user.twoFactorLogin;
      // ======================
    } catch (error) {
      this.user = INITIAL_USER_DATA;
    }
  }

  get getUser() {
    return this.user;
  }

  async setUser(user) {
    const userType = user.license ? 'transporter' : 'user';

    const userDataToSave = {
      userType,
      _id: user._id,
      email: user.email,
      config: user.config,
      mobile: user.mobile,
      lastName: user.lastName,
      firstName: user.firstName,
      picture: user.picture || '',
      notifications: user.notifications,
      twoFactorLogin: user.twoFactorLogin,
      token: user.token || this.user.token,
      ...(userType === 'transporter'
        ? { available: user.available, isSubDriver: user.isSubDriver }
        : {})
    };

    this.user = userDataToSave;
    await setUser({
      userType,
      _id: user._id,
      token: user.token || this.user.token,
      config: user.config || this.user.config,
      // ========================================
      email: user.email || this.user.email,
      mobile: user.mobile || this.user.mobile,
      lastName: user.lastName || this.user.lastName,
      firstName: user.firstName || this.user.firstName,
      picture: user.picture || this.user.picture,
      notifications: user.notifications || this.user.notifications,
      twoFactorLogin: user.twoFactorLogin || this.user.twoFactorLogin
      //==============================================
    });
  }

  async logout() {
    this.user = {};
    await logout();
  }

  async setUserOnUpdate(user) {
    const userType = user.license ? 'transporter' : 'user';
    const userDataToSave = {
      userType,
      _id: user._id,
      email: user.email,
      config: user.config,
      mobile: user.mobile,
      lastName: user.lastName,
      firstName: user.firstName,
      picture: user.picture || '',
      notifications: user.notifications,
      twoFactorLogin: user.twoFactorLogin,
      token: user.token || this.user.token,
      ...(userType === 'transporter'
        ? { available: user.available, isSubDriver: user.isSubDriver }
        : {})
    };

    this.user = userDataToSave;
    await setUser({
      userType,
      _id: user._id,
      token: user.token || this.user.token,
      config: user.config || this.user.config,
      //==========================================
      email: user.email || this.user.email,
      mobile: user.mobile || this.user.mobile,
      lastName: user.lastName || this.user.lastName,
      firstName: user.firstName || this.user.firstName,
      picture: user.picture || this.user.picture,
      notifications: user.notifications || this.user.notifications,
      twoFactorLogin: user.twoFactorLogin || this.user.twoFactorLogin
      //=======================================
    });
  }
}

export const authClass = new Auth();
