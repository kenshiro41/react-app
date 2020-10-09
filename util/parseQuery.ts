export const parseQuery = (urlQuery: string | string[]) => {
  if (typeof urlQuery === 'string') {
    return urlQuery;
  } else {
    return JSON.stringify(urlQuery);
  }
};
