export const requestLifecycle = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const createTypes = (prefix, name, suffixes) =>
  suffixes.reduce(
    (result, suffix) => ({
      ...result,
      [suffix]: `${prefix}/${name}_${suffix}`
    }),
    { name: `${prefix}/${name}` }
  );
