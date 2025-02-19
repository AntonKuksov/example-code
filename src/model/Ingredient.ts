import { EntityWithName } from "./EntityWithName.ts";

export interface Ingredient extends EntityWithName {
  description: string;
  inciName: string;
  origin: string;
  molecularFormula: string;
  maxConcentration: number;
  cas: string;
  ec: string;
  euAllergen: boolean;
  notable: boolean;
  imageUrl: string;
  actions: IngredientAction[];
  parent?: Ingredient | null; // Optional, nullable field
  alternativeNames: IngredientAlternativeName[]; // Optional field
  types: IngredientType[]; // Optional field
  numberOfProducts: number;
  citations: Citation[]; // Optional field
}

export interface IngredientFilter {
  name: string;
  types: string[];
  actions: string[];
}

export enum IngredientOrderBy {
  name
}

export type Citation = EntityWithName;

export type IngredientType = EntityWithName;

export type IngredientAction = EntityWithName;

export interface IngredientAlternativeName extends EntityWithName {
  isHidden: boolean;
}
