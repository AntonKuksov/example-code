import { IngredientType } from "../model/Ingredient.ts";
import { getEntities } from "./general.ts";

const name = "ingredientTypes";

export async function getIngredientTypes() {
  return getEntities<IngredientType>(name);
}
