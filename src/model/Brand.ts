import { EntityWithName, Filter } from "./EntityWithName.ts";

export function getDefaultBrand(id: number): Brand {
  return {
    id: id,
    name: "",
    vegan: false,
    crueltyFree: false,
    numberOfProducts: 0
  } as Brand;
}

export interface Brand extends EntityWithName {
  numberOfProducts: number;
  crueltyFree: boolean;
  vegan: boolean;
  country?: Country;
}

export interface BrandFilter extends Filter {
  vegan: boolean;
  crueltyFree: boolean;
  countries: string[];
}

export interface Country extends EntityWithName {}
