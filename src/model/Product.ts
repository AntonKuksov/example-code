import { Brand } from "./Brand.ts";
import { Entity, EntityWithName } from "./EntityWithName.ts";
import { Ingredient, IngredientType } from "./Ingredient.ts";
import { Problem } from "./Problem.ts";
import { User } from "./User.ts";

export type Locale = "en_US" | "et_EE" | "ru_Ru";

export interface Translation extends Entity, Record<Locale, string> {}

export interface Product extends Entity {
  name: Translation;
  shortDescription: Translation;
  description: Translation;
  images: ProductImage[];
  vegan?: boolean;
  crueltyFree?: boolean;
  alcoholFree?: boolean;
  siliconFree?: boolean;
  fragranceFree?: boolean;
  sulfateFree?: boolean;
  parabenFree?: boolean;
  oilFree?: boolean;
  ean: string;
  mpn: string;
  problems: Problem[];
  benefits: Benefit[];
  howToUse: Translation;
  whenToUse: Translation;
  timeOfUse: Translation;
  alternativeNames: ProductAlternativeName[];
  category: ProductCategory;
  brand: Brand;
  comments: Comment[];
  ingredientTypes: IngredientType[];
}

export type ProductAlternativeName = EntityWithName;

export type ProductCategory = EntityWithName;
export type Benefit = EntityWithName;

export interface Comment {
  id: number;
  author?: User | null;
  text: string;
  authorName?: string | null;
  origin: string;
  rating: number;
}

export interface ProductFilter {
  name: string;
  brands: number[] | string[];
  categories: number[] | string[];
  ingredients: number[] | string[];
  ingredientTypes: number[] | string[];
  vegan: boolean;
  crueltyFree: boolean;
}

export interface ProductImage extends Entity {
  url: string;
  num: number;
}

export interface ProductToIngredient extends Entity {
  id: number;
  product: Product;
  ingredient: Ingredient;
  number: number;
  percent?: number | null;
}
