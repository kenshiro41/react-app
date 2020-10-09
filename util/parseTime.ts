export const parseTime = (time: string) => {
  const unix = Date.parse(time);
  const d = new Date(unix);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  return `${year}/${month}/${day} ${hour}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};
