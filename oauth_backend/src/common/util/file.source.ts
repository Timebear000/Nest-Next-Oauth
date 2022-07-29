export const fileSource = (filekey: string | string[]) => {
  if (Array.isArray(filekey)) {
    return filekey.map((item) => `${process.env.DOMAIN}/files/${item}`);
  }
  return `${process.env.DOMAIN}/files/${filekey}`;
};
export const fileDecomposition = (fileSource: string | string[]) => {
  if (Array.isArray(fileSource)) {
    return fileSource.map((item) => fileSourceDecomposition(item));
  }
  return fileSourceDecomposition(fileSource);
};

const fileSourceDecomposition = (fileSource: string) => {
  if (fileSource.includes(`${process.env.DOMAIN}/files/`))
    return fileSource.split(`${process.env.DOMAIN}/files/`)[1];
  return fileSource;
};
