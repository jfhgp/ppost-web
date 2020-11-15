/**
 * Validation rules for orders
 */

export const validateAddItem = data => {
  const errors = {};
  let isValid = true;

  if (!data.itemName) {
    errors.itemName = true;
    isValid = false;
  }

  if (!data.itemHeight) {
    errors.itemHeight = true;
    isValid = false;
  }

  if (!data.itemLength) {
    errors.itemLength = true;
    isValid = false;
  }

  if (!data.itemQuantity) {
    errors.itemQuantity = true;
    isValid = false;
  }

  if (!data.itemWidth) {
    errors.itemWidth = true;
    isValid = false;
  }

  if (!data.itemWeight) {
    errors.itemWeight = true;
    isValid = false;
  }

  if (!data.itemType._id) {
    errors.itemType = true;
    isValid = false;
  }

  if (!data.itemImages.length) {
    errors.itemImages = true;
    isValid = false;
  }

  return { isValid, errors };
};

export const validateAddItemOpen = data => {
  const errors = {};
  let isValid = true;

  if (!data.itemName) {
    errors.itemName = true;
    isValid = false;
  }

  if (!data.itemHeight) {
    errors.itemHeight = true;
    isValid = false;
  }

  if (!data.itemLength) {
    errors.itemLength = true;
    isValid = false;
  }

  if (!data.itemQuantity) {
    errors.itemQuantity = true;
    isValid = false;
  }

  if (!data.itemWidth) {
    errors.itemWidth = true;
    isValid = false;
  }

  if (!data.itemWeight) {
    errors.itemWeight = true;
    isValid = false;
  }

  if (!data.itemType._id) {
    errors.itemType = true;
    isValid = false;
  }

  return { isValid, errors };
};

export const validateSubmitOrder = data => {
  const errors = {};
  let isValid = true;

  if (!data.type.value) {
    errors.type = true;
    isValid = false;
  }

  if (!data.pickup.address) {
    errors.pickup = true;
    isValid = false;
  }

  if (!data.dropoff.address) {
    errors.dropoff = true;
    isValid = false;
  }

  if (!data.commodities.length) {
    errors.commodities = true;
    isValid = false;
  }

  if (!data.pickupDate) {
    errors.pickupDate = true;
    isValid = false;
  }

  if (!data.deliveryDate) {
    errors.deliveryDate = true;
    isValid = false;
  }

  if (!data.contactName) {
    errors.contactName = true;
    isValid = false;
  }

  if (!data.contactNumber) {
    errors.contactNumber = true;
    isValid = false;
  }

  if (!data.deliveryType.value) {
    errors.deliveryType = true;
    isValid = false;
  }

  if (!data.from && data.to) {
    errors.from = true;
    isValid = false;
  }

  if (!data.to && data.from) {
    errors.to = true;
    isValid = false;
  }

  if (!data.deliveryTimeFrom && data.deliveryTimeTo) {
    errors.deliveryTimeFrom = true;
    isValid = false;
  }

  if (!data.deliveryTimeTo && data.deliveryTimeFrom) {
    errors.deliveryTimeTo = true;
    isValid = false;
  }

  if (data.pickupDropOffMessage) {
    // errors.to = true;
    isValid = false;
  }

  return { isValid, errors };
};

export const validateSubmitOrderOpen = data => {
  const errors = {};
  let isValid = true;

  if (!data.pickup.address) {
    errors.pickup = true;
    isValid = false;
  }

  if (!data.dropoff.address) {
    errors.dropoff = true;
    isValid = false;
  }

  if (!data.commodities.length) {
    errors.commodities = true;
    isValid = false;
  }

  if (!data.deliveryType.value) {
    errors.deliveryType = true;
    isValid = false;
  }

  if (data.pickupDropOffMessage) {
    // errors.to = true;
    isValid = false;
  }

  return { isValid, errors };
};


export const validateSubmitLocation = data => {
  const errors = {};
  let isValid = true;

  if (!data.pickup.address) {
    errors.pickup = true;
    isValid = false;
  }

  if (!data.dropoff.address) {
    errors.dropoff = true;
    isValid = false;
  }

  return { isValid, errors };

}