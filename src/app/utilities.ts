export const assertUnreachable = (value: never): never => {
  throw Error(`Reached unreachable value: ${value}`);
};
