import BigNumber from "bignumber.js";

export const converNumberToDecimal = (
  number: number | string,
  decimal: number
): string => {
  const power = new BigNumber(10).pow(decimal);
  return new BigNumber(number).dividedBy(power).toString();
};

export const converHexToDecimal = (hex: string, decimal: number): string => {
  const number = new BigNumber(hex).toNumber();
  return converNumberToDecimal(number, decimal).toString();
};

export const convertWeiToEther = (number: number | string) =>
  new BigNumber(converNumberToDecimal(number, 18)).toString();
