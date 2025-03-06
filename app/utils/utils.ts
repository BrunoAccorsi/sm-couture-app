export const stripHtmlTags = (htmlString: string): string => {
  return htmlString.replace(/<[^>]*>/g, '');
};
