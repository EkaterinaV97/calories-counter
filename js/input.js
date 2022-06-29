const notZero = /^0+/;
const notNumbers = /[^\d]/g;


export const formatInput = (input) => {
  return input.value.replace(notNumbers, ``).replace(notZero, ``);
}