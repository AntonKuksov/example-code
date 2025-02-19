import { EntityWithName } from "../../model/EntityWithName.ts";

export function sortByLength(a: string, b: string) {
  return a.length - b.length;
}

export function sortByNameLength(a: EntityWithName, b: EntityWithName) {
  return a.name.length - b.name.length;
}

export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
