/**
 * Misc. functions
 */

import React, { Component } from 'react';

import moment from 'moment';
import firebaseConfig from './firebase';
import orderConfig from '../utils/orderconfig';
import ApiCalls from '../service/RequestHandler';

// first letter capitalize
export const capitalize = str => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return ' ';
};

// get primary colors
export const getPrimaryColors = type => {
  switch (type) {
    case 'primary': {
      return '#152972';
    }
    case 'font-color': {
      return '#afc0ff';
    }
    case 'secondary': {
      return '#fa7816';
    }
    case 'error': {
      return '#f44336';
    }
    default: {
      return null;
    }
  }
};

// get status colors
export const getColor = type => {
  switch (type) {
    case 'pending': {
      return '#ffc107';
    }
    case 'delivered': {
      return '#28a745';
    }
    case 'accepted': {
      return '#6c757d';
    }
    case 'picked': {
      return '#6c757d';
    }
    // case 'onmyway': {
    //   return '#17a2b8';
    // }
    case 'cancelled': {
      return '#dc3545';
    }
    case 'inprogress': {
      return '#3eb9ce';
    }
    default: {
      return null;
    }
  }
};

export const getFinancesColors = type => {
  switch (type) {
    case 'pending': {
      return '#ea7627';
    }
    case 'pending-bg': {
      return 'rgb(255,183,128,0.2)';
    }
    case 'paid': {
      return '#0fb614f2';
    }
    case 'paid-bg': {
      return 'rgb(0,189,57,0.2)';
    }
    default: {
      return '';
    }
  }
};

// deep clone an object
export const deepClone = obj => {
  var copy;

  if (obj == null || typeof obj != 'object') {
    return obj;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepClone(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

// check if object is empty
export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

// async load component
export const asyncComponent = importComponent => {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({ component });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
};

// async load firebase
export const importFirebase = async () => {
  const firebase = await import(
    /* webpackChunkName: 'firebase' */ 'firebase/app'
  );
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  await import(/* webpackChunkName: 'auth' */ 'firebase/auth');
  await import(/* webpackChunkName: 'database' */ 'firebase/database');

  return { auth: firebase.auth, database: firebase.database };
};

// read image as base64
export const readImageAsBase64 = (file, cb) => {
  const reader = new FileReader();

  reader.onloadend = function() {
    cb(reader.result);
  };
  reader.readAsDataURL(file);
};

export const readImageAsBase64Promise = file => {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = function() {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

// upload file
export const uploadFile = async file => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await ApiCalls.uploadTFile(formData);
    return response.data.path;
  } catch (error) {
    throw error;
  }
};

// get classNames
export const classNames = data => {
  const classes = [];
  data.forEach(item => {
    if (typeof item === 'string') {
      classes.push(item);
    }

    if (item instanceof Array) {
      if (item[1]) {
        classes.push(item[0]);
      }
    }
  });

  return classes.join(' ');
};

// get center LatLng
export const getCenterLatLng = latLngs => {
  if (latLngs.length) {
    let lat = 0;
    let lng = 0;

    latLngs.forEach(item => {
      lat += item[1];
      lng += item[0];
    });

    lat = lat / latLngs.length;
    lng = lng / latLngs.length;

    return { lat, lng };
  }
  return { lat: 0.0, lng: 0.0 };
};

// get latitude delta and longitude delta
export const getRegionForCoordinates = points => {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.forEach(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
};

// generate order number
export const generateOrderNumber = data => {
  try {
    let orderNumber = '';
    let itemType = '';
    let itemTypeCode = '';

    orderNumber +=
      orderConfig.parcelType[`${data.type.value}_${data.deliveryType.value}`];
    orderNumber += orderConfig.countryCodes[`${data.pickup.country}`];

    data.commodities.forEach(item => {
      if (!itemTypeCode || !itemType) {
        itemType = item.itemType._id;
        itemTypeCode = item.itemType.code;
      }
      if (itemType !== item.itemType._id) {
        itemTypeCode = 86;
      }
    });

    orderNumber += itemTypeCode;
    orderNumber += moment(data.pickupDate).format('YYMMDD');

    return orderNumber.length === 12 ? orderNumber : false;
  } catch (error) {
    return false;
  }
};

// call function after debounce
export const callAfterDebounceTime = (waitFor = 800) => {
  let timeout = null;

  return function(func, options) {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (options.clear) {
      return;
    }

    timeout = setTimeout(() => func(), waitFor);
  };
};

// get discounted price
export const getDiscountedPrice = (price, discount) => {
  return price - (price / 100) * discount;
};

// get sorting function
export function getSortingFunction(sortBy) {
  switch (sortBy) {
    case 'orderNumber':
    case 'price': {
      return (a, b) => {
        return a - b;
      };
    }
    case 'pickupDate': {
      return (a, b) => {
        return moment(a).valueOf() - moment(b).valueOf();
      };
    }

    case 'status': {
      return (a, b) => {
        // eslint-disable-next-line no-console
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      };
    }

    case 'address': {
      return (a, b) => {
        // eslint-disable-next-line no-console
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      };
    }

    case 'deliveryType': {
      return (a, b) => {
        // eslint-disable-next-line no-console
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      };
    }

    default: {
      return () => null;
    }
  }
}

// get nested value from object
export function getNestedValue(obj, arrayOfKeys) {
  let current = obj;
  try {
    arrayOfKeys.forEach(key => {
      current = current[key];
    });
  } catch (error) {
    return null;
  }

  return current;
}
