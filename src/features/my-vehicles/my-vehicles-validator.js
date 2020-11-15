/**
 * Validator for My Vehicles
 */

export const validateAdd = data => {
  const errors = {};
  let isValid = true;

  if (!data.mode.value) {
    errors.mode = true;
    isValid = false;
  }

  switch (data.fieldsType) {
    case 'flightNumber': {
      if (!data.airline) {
        errors.airline = true;
        isValid = false;
      }

      if (!data.flightNumber) {
        errors.flightNumber = true;
        isValid = false;
      }
      break;
    }

    case 'information': {
      if (!data.information) {
        errors.information = true;
        isValid = false;
      }
      break;
    }

    case 'make': {
      if (!data.make) {
        errors.make = true;
        isValid = false;
      }

      if (!data.model) {
        errors.model = true;
        isValid = false;
      }

      if (!data.color) {
        errors.color = true;
        isValid = false;
      }

      if (!data.numberPlate) {
        errors.numberPlate = true;
        isValid = false;
      }
      break;
    }

    default: {
      return null;
    }
  }

  return { isValid, errors };
};
