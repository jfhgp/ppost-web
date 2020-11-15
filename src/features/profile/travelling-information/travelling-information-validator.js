/**
 * Validation rules for travelling information
 */

export const validateAddInformation = data => {
  const errors = {};
  let isValid = true;

  if (!data.origin.name) {
    errors.origin = true;
    isValid = false;
  }

  if (!data.dates) {
    errors.dates = true;
    isValid = false;
  }

  if (!data.frequency.value) {
    errors.frequency = true;
    isValid = false;
  }

  if (!data.mode.value) {
    errors.mode = true;
    isValid = false;
  }

  if (!data.destination.name) {
    errors.destination = true;
    isValid = false;
  }

  if (data.return === 'true' && !data.returnDates) {
    errors.returnDates = true;
    isValid = false;
  }

  if (!data.return) {
    errors.return = true;
    isValid = false;
  }

  if (data.stopOvers.length) {
    data.stopOvers.forEach(stop => {
      const key = `stopOver-${stop + 1}`;
      if (!data[`${key}-location`].name) {
        errors[`${key}-location`] = true;
        isValid = false;
      }

      if (!data[`${key}-date`]) {
        errors[`${key}-date`] = true;
        isValid = false;
      }
    });
  }

  if (data.originDestinationMessage) {
    isValid = false;
    // errors.originDestinationMessage = true;
  }

  return { isValid, errors };
};

export const validateUpdateInformation = data => {
  const errors = {};
  let isValid = true;

  if (!data.date) {
    errors.date = true;
    isValid = false;
  }

  if (!data.origin.name) {
    errors.origin = true;
    isValid = false;
  }

  if (!data.destination.name) {
    errors.destination = true;
    isValid = false;
  }

  if (data.return === 'true' && !data.returnDate) {
    errors.returnDate = true;
    isValid = false;
  }

  if (!data.mode.value) {
    errors.mode = true;
    isValid = false;
  }

  if (!data.return) {
    errors.return = true;
    isValid = false;
  }

  return { isValid, errors };
};
