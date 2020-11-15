/**
 * Utils for units
 */

export const legend = {
  USD: 'US Dollar',
  EUR: 'Euro',
  kg: 'Kilogram (kg)',
  g: 'Gram (g)',
  oz: 'Ounce (oz)',
  lbs: 'Pounds (lbs)',
  m: 'Meter (m)',
  cm: 'Centimeter (cm)',
  ft: 'Feet (ft)',
  in: 'Inches (in)'
};

export const languages = [{ value: 'en', label: 'English' }];

export const currencyUnits = [
  { value: 'USD', label: 'US Dollar' },
  { value: 'EUR', label: 'Euro' }
];

export const weightUnits = [
  { label: 'Kilogram', value: 'kg' },
  { label: 'Gram', value: 'g' },
  { label: 'Ounce', value: 'oz' },
  { label: 'Pounds', value: 'lbs' }
];

export const measurementUnits = [
  { label: 'Meter', value: 'm' },
  { label: 'Centimeter', value: 'cm' },
  { label: 'Feet', value: 'feet' },
  { label: 'Inches', value: 'inch' }
];

const weightCalculation = {
  gkg: 0.001,
  glbs: 0.0022,
  goz: 0.035,
  kgg: 1000,
  kglbs: 2.2,
  kgoz: 35.27,
  lbsg: 453.59,
  lbskg: 0.453592,
  lbsoz: 16,
  ozg: 28.35,
  ozkg: 0.02835,
  ozlbs: 0.0625
};

const dimensionsCalculation = {
  mcm: 100,
  mft: 3.28084,
  min: 39.3701,
  cmm: 0.01,
  cmft: 0.033,
  cmin: 0.39,
  ftm: 0.3048,
  ftin: 12,
  ftcm: 30.48,
  inft: 0.0833333,
  incm: 2.54,
  inm: 0.02539998984
};

export function convertWeight(fromUnit, toUnit, fromWeight) {
  if (fromUnit === toUnit) return fromWeight;

  return (fromWeight * weightCalculation[fromUnit + toUnit]).toFixed(2);
}

export function convertMeasurement(fromUnit, toUnit, fromWeight) {
  if (fromUnit === toUnit) return fromWeight;

  return (fromWeight * dimensionsCalculation[fromUnit + toUnit]).toFixed(2);
}
