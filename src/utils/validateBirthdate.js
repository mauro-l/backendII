import { isBefore, isAfter, subYears } from "date-fns";

export const validateBirthdate = (birthdate) => {
  const today = new Date();
  const minAge = subYears(today, 18);
  const maxAge = subYears(today, 120);

  return isBefore(birthdate, minAge) && isAfter(birthdate, maxAge);
};
