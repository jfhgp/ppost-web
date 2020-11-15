/**
 * Validators for profile
 */

export const validatePersonalInformation = data => {
  const errors = {};
  let isValid = true;

  if (!data.firstName) {
    errors.firstName = true;
    isValid = false;
  }

  if (!data.lastName) {
    errors.lastName = true;
    isValid = false;
  }

  if (!data.email) {
    errors.email = true;
    isValid = false;
  }

  if (!data.mobile) {
    errors.mobile = true;
    isValid = false;
  }

  return { errors, isValid };
};
