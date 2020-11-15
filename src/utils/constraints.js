export const emailConstraint = {
  presence: { allowEmpty: false },
  email: true,
  exclusion: {
    message: "Please enter a valid email"
  }
};

export const passwordConstraint = {
  presence: true,
  length: {
    minimum: 6,
    message: "must be at least 6 characters"
  }
};

export const nameConstraint = {
  presence: { allowEmpty: false },
  exclusion: {
    message: "Please enter your name"
  }
};

export const phoneConstraint = {
  presence: { allowEmpty: false }
};

export const verifyConstraint = {
  presence: true,
  length: {
    minimum: 4,
    message: "code required"
  }
};

export const instituteConstraint = {
  presence: { allowEmpty: false }
};
