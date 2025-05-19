export const formatDateTime = (input: string): string => {
  const date = new Date(input);
  return date.toLocaleString();
};
