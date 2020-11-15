/**
 *
 * Utility functions for request detail
 */

export const getActions = (details, user, status) => {
  switch (status) {
    case 'delivered': {
      if (!details.customerRating && user.userType === "transporter") {
        return {
          feedback: true,
          message: true,
          contact: true
        };
      }
      else if (!details.rating && user.userType === "user") {
        return {
          feedback: true,
          message: true,
          contact: true
        };
      }
      else {
        return { message: true, contact: true };
      }
    }
    case 'pending': {
      return {
        accept: true,
        cancel: false,
        message: true,
        contact: true,
        reschedule: true,
        canSendMessage: true
      };
    }
    case 'accepted': {
      return {
        cancel: true,
        message: true,
        contact: true,
        canSendMessage: true,
        reschedule: true,
        showTransporterOnMap: true,
        addExpenses: true,
        viewExpenses: true
      };
    }
    case 'picked': {
      return {
        cancel: true,
        message: true,
        contact: true,
        canSendMessage: true,
        showTransporterOnMap: true
      };
    }
    default: {
      return { message: true, contact: true };
    }
  }
};

export const getPrice = (price, userType) => {
  if (userType === 'user') {
    return price.toFixed(2);
  }
  return (price * 0.8).toFixed(2);
};

export const getContactDetails = details => {

  if (!details.user) {
    return {
      pickup: { name: '', number: '' },
      deliver: { name: '', number: '' }
    };
  }
  const user = details.user || {};
  if (user.firstName) {
    if (details.type === 'deliver' || details.type === 'Deliver') {
      return {
        pickup: {
          name: `${user.firstName} ${user.lastName}`,
          number: user.mobile
        },
        deliver: { name: details.contact.name, number: details.contact.number }
      };
    }
    return {
      pickup: { name: details.contact.name, number: details.contact.number },
      deliver: {
        name: `${user.firstName} ${user.lastName}`,
        number: user.mobile
      }
    };
  }
};

export const getVehicleData = vehicle => {
  switch (vehicle.mode) {
    case 'train':
    // fall through
    case 'sea':
    // fall through
    case 'bus': {
      return { mode: vehicle.mode, information: vehicle.information };
    }
    case 'air': {
      return {
        mode: vehicle.mode,
        information: `${vehicle.airline} - ${vehicle.flightNumber}`
      };
    }
    default:
      return {
        'Vehicle Type': vehicle.mode,
        'Vehicle Model': `${vehicle.make} ${vehicle.model}`,
        'Vehicle Number': vehicle.numberPlate
      };
  }
};

export const getPickupDropoffDetails = details => {
  if (details._id) {
    if (details.status === 'pending') {
      const splitPickup = details.pickup.address.split(',');
      const splitDropoff = details.dropoff.address.split(',');

      return {
        pickup: splitPickup[splitPickup.length - 1],
        dropoff: splitDropoff[splitDropoff.length - 1]
      };
    }

    if (details.status !== 'pending') {
      return {
        pickup: details.pickup.address,
        dropoff: details.dropoff.address
      };
    }
  }

  return { pickup: '-', dropoff: '-' };
};

export const requestInActive = ['cancel', 'delivered'];
