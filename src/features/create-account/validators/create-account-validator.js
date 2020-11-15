/**
 * validation rules for create account
 */

const keys = [
  'firstName',
  'lastName',
  'email',
  'mobile',
  'password',
  'agreeToTerms'
];

export const validateCreateAccount = data => {
  const errors = {};
  let isValid = true;

  for (const key in data) {
    if (keys.indexOf(key) !== -1 && !data[key]) {
      errors[key] = true;
      isValid = false;
    }
  }

  return { isValid, errors };
};
