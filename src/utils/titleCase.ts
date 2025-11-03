export const titleCase = (string: string) => {
  return string.replace(/\b\w/g, (match) => match.toUpperCase());
};
