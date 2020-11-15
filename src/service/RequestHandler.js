import {
  get,
  post,
  del,
  noECheckPost,
  independentRequest
} from './HttpProvider';

const SERVICE_URLS = {
  /** Misc. **/
  getProfile: 'users/myprofile',

  /** Users **/
  login: 'users/loginmobile',
  twoFactorLoginUser: 'users/login',
  changePasswordUser: 'users/changepassword',
  signup: 'users/signup',
  verifyLogin: 'users/verifylogin',
  verifyUOtp: 'users/verify',
  forgotUPassword: 'users/forgotpassword',
  confirmURecovery: 'users/confirmrecovery',
  resetUPassword: 'users/resetpassword',
  getUserById: 'users/profile',
  prevTransportersList: 'users/mytransporters',
  uploadUFile: 'users/upload',
  updateUserProfile: 'users/update',
  resendCodeUser: 'users/resendcode',
  initiateSupport: '/support/initiate',

  /** user dashboard stats **/
  userDashboardStats: 'users/stats',

  /** Transporters **/
  loginTransporter: 'transporters/loginmobile',
  twoFactorLoginTransporter: 'transporters/login',
  changePasswordTransporter: 'transporters/changepassword',
  verifyTLogin: 'transporters/verifylogin',
  verifyTOtp: 'transporters/verify',
  getTransporterProfileById: 'transporters/profile',
  signupTransporter: 'transporters/signup',
  addDriver: 'transporters/adddriver',
  getMyDrivers: 'transporters/drivers',
  deleteDriverById: 'transporters/driver/',
  forgotTPassword: 'transporters/forgotpassword',
  confirmTRecovery: 'transporters/confirmrecovery',
  resetTPassword: 'transporters/resetpassword',
  addServiceArea: 'transporters/addservicearea',
  updateTransporterProfile: 'transporters/update',
  updateTransporterDestination: 'transporters/updatedestination',
  addTransporterDestination: '/transporters/adddestination',
  deleteVehicleById: 'transporters/deletevehicle/',
  uploadTFile: 'transporters/upload',
  getAllServiceAreas: 'transporters/serviceareas',
  deleteServiceArea: 'transporters/deleteservicearea',
  blockDriver: 'transporters/block',
  resendCodeTransporter: 'transporters/resendcode',
  deleteJourney: 'transporters/deletejourney',
  getMySpaces: '/space/my',


  /** dashboard stats **/
  dashboardStats: 'transporters/stats',

  /** Orders **/
  getRequests: 'orders/new',
  getMyRequests: 'orders/my',
  getMyDriversRequests: 'orders/drivers',
  getUserRequests: 'orders/user',
  getOrderById: 'orders/get',
  getOrdersByDriver: 'orders/bydriver',
  addRequest: 'orders/add',
  editRequestByCustomer: 'orders/updatebycustomer',
  estimateOrderCost: 'orders/rates',
  getEstimation: 'orders/getestimation',
  rateOrder: 'orders/rate',
  getDriverOrderById: 'orders/bydriver',
  cancelOrder: 'orders/cancel',
  updateOrderStatus: 'orders/updatestatus',
  trackOrder: 'orders/track',
  searchMyOrders: 'orders/searchmyorders',
  searchByPlace: 'orders/searchbyplace',
  searchMyDriversOrders: 'orders/searchdriversorders',
  recentActivity: 'orders/my/accepted',
  reschedule: 'orders/reschedule',
  modificationLog: '/modificationlogs/get',
  acceptReschedule: '/modificationlogs/accept',
  getMySchedule: 'schedule/my',
  setSchedule: '/schedule/set',
  orderFilter: "/orders/filter",
  addExpenses: "/expenses/add",
  getExpenses: "/expenses/order",
  getOrderChangeLog: "orders/changelog",
  confirmUpdate: "orders/confirmupdate",

  /** Customers **/
  addCard: 'customers/add',
  getCards: 'customers/get',
  deleteCard: 'customers/delete',
  makeDefaultCard: 'customers/updatedefault',
  requestLocationChange: "/orders/changelocation",

  /** Vehicles **/
  getMyVehicles: 'vehicles/get',
  getVehicleById: '/vehicles/getbyid',
  addVehicle: 'vehicles/add',
  markVehicleAvailable: 'vehicles/toggle',
  assignDriver: 'vehicles/assigndriver',
  removeDriver: 'vehicles/removedriver',
  getCars: 'cars/get',

  /** Spaces **/
  addSpace: '/space/add',
  getOrderBySpace: '/orders/space',

  /** Categories **/
  getCategories: 'categories/get',
  addCategory: 'categories/add',
  // subcategory
  getSubCategories: 'categories/getbyparent',

  /** Bank **/
  addBankAccount: 'bank/add',
  getBankInfo: 'bank/get',
  updateDefaultCard: 'bank/default',

  /** Notifications **/
  getNotifications: 'notifications/received',
  markNotificationAsRead: 'notifications/read',

  /** Finance **/
  getFinanceByTransporter: 'finance/bytransporter',
  getFinanceReport: 'finance/report',

  /** Promotions **/
  getPromotions: 'promo/active',

  /** Misc. **/
  contactUs: 'complains/contactus',
  requestCallBack: '/complains/callback',

  /** stations **/
  getStations: "/stations/search",
};

/** Misc. **/
const getProfile = id => get(SERVICE_URLS.getProfile, { id });

/** Users **/
const login = data => post(SERVICE_URLS.login, data);
const twoFactorLoginUser = data => post(SERVICE_URLS.twoFactorLoginUser, data);
const changePasswordUser = data => post(SERVICE_URLS.changePasswordUser, data);
const signup = data => post(SERVICE_URLS.signup, data);
const verifyLogin = ({ smsCode, mobile }) =>
  post(SERVICE_URLS.verifyLogin, { smsCode, mobile });
const verifyUOtp = data => post(SERVICE_URLS.verifyUOtp, data);
const forgotUPassword = data => post(SERVICE_URLS.forgotUPassword, data);
const confirmURecovery = data => post(SERVICE_URLS.confirmURecovery, data);
const resetUPassword = data => post(SERVICE_URLS.resetUPassword, data);
const getUserById = id => get(SERVICE_URLS.getUserById, { id });
const prevTransportersList = () => get(SERVICE_URLS.prevTransportersList);
const uploadUFile = file => post(SERVICE_URLS.uploadUFile, { file });
const updateUserProfile = data => post(SERVICE_URLS.updateUserProfile, data);
const resendCodeUser = data => post(SERVICE_URLS.resendCodeUser, data);
const initiateSupport = data => post(SERVICE_URLS.initiateSupport, data);

/** user dashboard stats **/
const userDashboardStats = data => post(SERVICE_URLS.userDashboardStats, data);

/** Transporters **/
const loginTransporter = data => post(SERVICE_URLS.loginTransporter, data);
const twoFactorLoginTransporter = data =>
  post(SERVICE_URLS.twoFactorLoginTransporter, data);
const changePasswordTransporter = data =>
  post(SERVICE_URLS.changePasswordTransporter, data);
const verifyTLogin = ({ smsCode, mobile }) =>
  post(SERVICE_URLS.verifyTLogin, { smsCode, mobile });
const verifyTOtp = ({ mobile, smsCode, emailCode }) =>
  post(SERVICE_URLS.verifyTOtp, { mobile, smsCode, emailCode });
const getTransporterProfileById = ({ _id }) =>
  get(SERVICE_URLS.getTransporterProfileById, { _id });
const signupTransporter = data => post(SERVICE_URLS.signupTransporter, data);
const addDriver = data => post(SERVICE_URLS.addDriver, data);
const getMyDrivers = () => get(SERVICE_URLS.getMyDrivers);
const deleteDriverById = data => del(SERVICE_URLS.deleteDriverById + data);
const forgotTPassword = data => post(SERVICE_URLS.forgotTPassword, data);
const confirmTRecovery = data => post(SERVICE_URLS.confirmTRecovery, data);
const resetTPassword = data => post(SERVICE_URLS.resetTPassword, data);
const addServiceArea = data => post(SERVICE_URLS.addServiceArea, data);
const deleteVehicleById = data => del(SERVICE_URLS.deleteVehicleById + data);
const updateTransporterProfile = data =>
  post(SERVICE_URLS.updateTransporterProfile, data);
const updateTransporterDestination = data =>
  post(SERVICE_URLS.updateTransporterDestination, data);
const addTransporterDestination = data =>
  post(SERVICE_URLS.addTransporterDestination, data);
const uploadTFile = data => post(SERVICE_URLS.uploadTFile, data);
const getAllServiceAreas = data => get(SERVICE_URLS.getAllServiceAreas, data);
const deleteServiceArea = data => del(SERVICE_URLS.deleteServiceArea, data);
const blockDriver = data => post(SERVICE_URLS.blockDriver, data);
const resendCodeTransporter = data =>
  post(SERVICE_URLS.resendCodeTransporter, data);
const deleteJourney = data => del(SERVICE_URLS.deleteJourney, data);
const getMySpaces = () => get(SERVICE_URLS.getMySpaces);
const getOrderBySpace = ({ _id, status }) =>
  get(SERVICE_URLS.getOrderBySpace, { _id, status });

/** transporter dashboard stats **/
const dashboardStats = data => post(SERVICE_URLS.dashboardStats, data);

/** Orders **/
const getRequests = () => get(SERVICE_URLS.getRequests);
const getSchedule = () => get(SERVICE_URLS.getMySchedule);
const setSchedule = data => post(SERVICE_URLS.setSchedule, data);
const getRequestsByPageId = ({ _id }) => get(SERVICE_URLS.getRequests, { _id });
const getMyRequests = data => get(SERVICE_URLS.getMyRequests, data);
const getMyDriversRequests = data =>
  get(SERVICE_URLS.getMyDriversRequests, data);
const getUserRequests = data => get(SERVICE_URLS.getUserRequests, data);
const getOrderById = data => get(SERVICE_URLS.getOrderById, data);
const getOrdersByDriver = data => get(SERVICE_URLS.getOrdersByDriver, data);
const addRequest = data => post(SERVICE_URLS.addRequest, data);
const editRequestByCustomer = ({ type, data }) => {
  if (type === "duplicate") {
    return post(SERVICE_URLS.addRequest, data);
  }
  else {
    return post(SERVICE_URLS.editRequestByCustomer, data);
  }

}

const estimateOrderCost = data => post(SERVICE_URLS.estimateOrderCost, data);
const getEstimation = data => post(SERVICE_URLS.getEstimation, data);
const rateOrder = data => post(SERVICE_URLS.rateOrder, data);
const getDriverOrderById = data => get(SERVICE_URLS.getDriverOrderById, data);
const cancelOrder = data => post(SERVICE_URLS.cancelOrder, data);
const updateOrderStatus = data => post(SERVICE_URLS.updateOrderStatus, data);
const trackOrder = ({ _id }) => get(SERVICE_URLS.trackOrder, { _id });
const searchMyOrders = data => post(SERVICE_URLS.searchMyOrders, data);
const searchByPlace = data => post(SERVICE_URLS.searchByPlace, data);
const searchMyDriversOrders = data =>
  post(SERVICE_URLS.searchMyDriversOrders, data);
const recentActivity = data => get(SERVICE_URLS.recentActivity, data);
const requestReschedule = data => post(SERVICE_URLS.reschedule, data);
const requestLocationChange = data => post(SERVICE_URLS.requestLocationChange, data);
const modificationLog = ({ _id }) => get(SERVICE_URLS.modificationLog, { _id });
const acceptReschedule = data => post(SERVICE_URLS.acceptReschedule, data);
const orderFilter = data => post(SERVICE_URLS.orderFilter, data);
const addExpenses = data => post(SERVICE_URLS.addExpenses, data);
const getExpenses = ({ _id }) => get(SERVICE_URLS.getExpenses, { _id });
const getOrderChangeLog = ({ _id }) => get(SERVICE_URLS.getOrderChangeLog + "/" + _id + "/" + "pending");
const onConfirmUpdate = data => post(SERVICE_URLS.confirmUpdate, data);

/** Customers **/
const addCard = data => post(SERVICE_URLS.addCard, data);
const getCards = () => get(SERVICE_URLS.getCards);
const deleteCard = data => del(SERVICE_URLS.deleteCard, data);
const makeDefaultCard = data => post(SERVICE_URLS.makeDefaultCard, data);

/** Vehicles **/
const getMyVehicles = () => get(SERVICE_URLS.getMyVehicles);
const getVehicleById = ({ _id }) => get(SERVICE_URLS.getVehicleById, { _id });
const addVehicle = data => post(SERVICE_URLS.addVehicle, data);
const assignDriver = data => post(SERVICE_URLS.assignDriver, data);
const removeDriver = data => post(SERVICE_URLS.removeDriver, data);
const markVehicleAvailable = data =>
  post(SERVICE_URLS.markVehicleAvailable, data);
const getCars = () => get(SERVICE_URLS.getCars);

/** Spaces **/
const addSpace = data => post(SERVICE_URLS.addSpace, data);

/** Categories **/
const getCategories = data => get(SERVICE_URLS.getCategories, data);
const addCategories = data => post(SERVICE_URLS.addCategory, data);

const getSubCategories = data => get(SERVICE_URLS.getSubCategories, data);

/** Bank **/
const addBankAccount = data => post(SERVICE_URLS.addBankAccount, data);
const getBankInfo = () => get(SERVICE_URLS.getBankInfo);
const updateDefaultCard = data => post(SERVICE_URLS.updateDefaultCard, data);

/** Notifications **/
const getNotifications = () => get(SERVICE_URLS.getNotifications);
const markNotificationAsRead = ({ _id, flag }) =>
  noECheckPost(SERVICE_URLS.markNotificationAsRead, { _id, flag });

/** Stations **/
const getStations = data => post(SERVICE_URLS.getStations, data);

/** Promotions **/
const getPromotions = role => {
  if (role === 'transporter') {
    return get(SERVICE_URLS.getPromotions);
  } else {
    return get(SERVICE_URLS.getPromotions);
  }
};

/** Misc. **/
const sendContactUsMessage = data => post(SERVICE_URLS.contactUs, data);
const requestCallBack = data => post(SERVICE_URLS.requestCallBack, data);

/** Finance **/
const getFinanceByTransporter = _id =>
  get(SERVICE_URLS.getFinanceByTransporter, { _id });
const getFinanceReport = (_id, data) =>
  post(SERVICE_URLS.getFinanceReport, data, { params: { _id } });

/** Reverse Geocode **/
const reverseGeoCode = data => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.join(
    ','
  )}&key=AIzaSyAmfmux8vHgDjrOhYE5zPw_shsxnQq7DBY
  `;

  return independentRequest(url, 'get');
};

const createIdenfyToken = async data => {
  const { _id, firstName, lastName } = data;
  let params = {
    body: JSON.stringify({
      clientId: _id,
      firstName: firstName,
      lastName: lastName
    })
  };

  let fetchParams = {
    method: 'POST',
    headers: {
      Authorization: 'Basic NnNnTkJaNXM0YTg6RWN3bXRCZmlOSGFiQVdEbE1ZdGM='
    }
  };
  Object.assign(fetchParams, params || {});
  fetchParams.headers = Object.assign({}, fetchParams.headers || {}, {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  let url = 'https://ivs.idenfy.com/api/v2/token';

  try {
    let response = await fetch(url, fetchParams);
    let jsonObject = await response.json();

    if (jsonObject.scanRef) {
      await ApiCalls.updateTransporterProfile({
        idenfyScanRef: jsonObject.scanRef
      });

      let redirectUrl =
        'https://ivs.idenfy.com/api/v2/redirect?authToken=' +
        jsonObject.authToken;
      window.open(redirectUrl, '_blank');
    }
  } catch (error) {
    console.error('Exception: ', error.message);
  }
};

const ApiCalls = {
  getProfile,

  login,
  twoFactorLoginUser,
  changePasswordUser,
  signup,
  verifyLogin,
  verifyUOtp,
  forgotUPassword,
  resetUPassword,
  confirmURecovery,
  getUserById,
  prevTransportersList,
  uploadUFile,
  updateUserProfile,
  resendCodeUser,
  initiateSupport,

  userDashboardStats,

  loginTransporter,
  twoFactorLoginTransporter,
  changePasswordTransporter,
  verifyTLogin,
  verifyTOtp,
  getTransporterProfileById,
  signupTransporter,
  addDriver,
  getMyDrivers,
  deleteDriverById,
  forgotTPassword,
  resetTPassword,
  confirmTRecovery,
  addServiceArea,
  deleteVehicleById,
  updateTransporterProfile,
  updateTransporterDestination,
  addTransporterDestination,
  uploadTFile,
  getAllServiceAreas,
  deleteServiceArea,
  blockDriver,
  resendCodeTransporter,
  deleteJourney,

  dashboardStats,

  getRequests,
  getRequestsByPageId,
  getMyRequests,
  getMyDriversRequests,
  getUserRequests,
  getOrderById,
  getOrdersByDriver,
  addRequest,
  editRequestByCustomer,
  estimateOrderCost,
  getEstimation,
  getDriverOrderById,
  rateOrder,
  cancelOrder,
  updateOrderStatus,
  trackOrder,
  searchMyOrders,
  searchByPlace,
  searchMyDriversOrders,
  recentActivity,
  requestReschedule,
  modificationLog,
  acceptReschedule,
  getSchedule,
  setSchedule,
  orderFilter,
  addExpenses,
  getExpenses,
  requestLocationChange,
  getOrderChangeLog,
  onConfirmUpdate,

  addCard,
  getCards,
  deleteCard,
  makeDefaultCard,

  getMyVehicles,
  getVehicleById,
  addVehicle,
  assignDriver,
  removeDriver,
  markVehicleAvailable,
  getCars,

  getMySpaces,
  getOrderBySpace,
  addSpace,
  getCategories,
  addCategories,
  getSubCategories,

  addBankAccount,
  getBankInfo,
  updateDefaultCard,

  getNotifications,
  markNotificationAsRead,

  getFinanceByTransporter,
  getFinanceReport,

  reverseGeoCode,

  getPromotions,

  sendContactUsMessage,
  requestCallBack,

  createIdenfyToken,

  getStations
};

export default ApiCalls;
