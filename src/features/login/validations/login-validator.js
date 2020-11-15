/**
 * Validator for Login
 */

export const validateLogin = data => {
  const errors = {};
  let isValid = true;

  if (!data.mobile) {
    errors.mobile = true;
    isValid = false;
  }

  if (data.showPassword && !data.password) {
    errors.password = true;
    isValid = false;
  }

  return { errors, isValid };
};
