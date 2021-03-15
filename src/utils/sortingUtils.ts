export const sortByOrder = <T extends { order: number }>(
  a: T,
  b: T
): number => {
  return a.order - b.order;
};

export const sortByName = <T extends { name: string }>(a: T, b: T): number => {
  return a.name.localeCompare(b.name);
};
