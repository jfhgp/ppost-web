/**
 * validation rules for reset password
 */

export const validateResetPassword = data => {
  const errors = {};
  let isValid = true;

  for (const key in data) {
    if (!data[key]) {
      errors[key] = true;
      isValid = false;
    }
  }

  if (data.password !== data.confirm) {
    errors.confirm = 'The passwords do not match.';
    isValid = false;
  }

  return { isValid, errors };
};
