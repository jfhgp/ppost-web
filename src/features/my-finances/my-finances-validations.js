/**
 *
 * Validation rules for my finances.
 */

export const validateSearch = data => {
  const errors = {};
  let isValid = true;

  if (
    !data.transporterIds.length &&
    !data.vehicles.length &&
    !data.startDate &&
    !data.endDate &&
    !data.pickup &&
    !data.dropoff &&
    !data.categoriesIds.length
  ) {
    isValid = false;
    errors.transporterIds = true;
    errors.vehicles = true;
    errors.startDate = true;
    errors.endDate = true;
    errors.dropoff = true;
    errors.pickup = true;
    errors.categoriesIds = true;
  }

  if (data.startDate && !data.endDate) {
    isValid = false;
    errors.endDate = true;
  }

  if (data.endDate && !data.startDate) {
    isValid = false;
    errors.startDate = true;
  }

  return { isValid, errors };
};
