export const truncateText = (text: string, count: number = 30) =>
  text.length > count ? `${text.slice(0, count)}...` : text;
