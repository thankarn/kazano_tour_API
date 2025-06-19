import { sortBy as sb, drop as d, difference } from "lodash";

declare global {
  interface Array<T> {
    sortBy: (keys: string[]) => T[];
    drop: (n: number) => T[];
    diff: (arr: T[]) => T[];
  }
}

Array.prototype.sortBy = function (keys: string[]) {
  return sb(this, keys);
};

Array.prototype.drop = function (n: number) {
  return d(this, n);
};

Array.prototype.diff = function (arr) {
  return difference(this, arr);
};
