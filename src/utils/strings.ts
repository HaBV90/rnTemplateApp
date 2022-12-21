export const notEmpty = (str: string | undefined | null) => {
  return !!(str && str.length > 0);
};
