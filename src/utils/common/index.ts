import { Static, TSchema } from "elysia";

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const Extract = <T extends TSchema>(
  obj: T
): {
  s: TSchema;
  t: Static<T>;
} => {
  return {
    s: obj,
    t: obj as Static<T>,
  };
};
