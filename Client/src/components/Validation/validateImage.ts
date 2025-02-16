export const isValidImageUrl = (url: string): boolean => {
  return /^https?:\/\/.+/.test(url);
};