export const getTotalPages = (
  count: number,
  recordsPerPage: number
): number => {
  return Math.floor(count / recordsPerPage);
};
