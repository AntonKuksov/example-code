import { IngredientAction } from "../model/Ingredient.ts";
import { getEntities } from "./general.ts";

const name = "ingredientActions";

export async function getIngredientActions() {
  return getEntities<IngredientAction>(name);
}
