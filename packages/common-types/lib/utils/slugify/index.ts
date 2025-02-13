export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/^\s+|\s+$/g, '') // trim
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  // .replace(/ /g, "-")
};
