export const formatAED = (value: number) =>
  new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value);

export const titleCase = (value: string) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
