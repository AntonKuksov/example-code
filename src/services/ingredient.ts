import axios from "axios";
import { Ingredient, IngredientFilter } from "../model/Ingredient.ts";
import { Page } from "../model/Page.ts";
import { getEntities, getPagedEntities } from "./general.ts";
import { header } from "./header.ts";

const name = "ingredients";
const base = "api/ingredients";

export async function getIngredientChildren(id: string | number) {
  const response = await axios.get(base + "/" + id + "/children");
  return response.data as Ingredient[];
}

export async function getIngredients() {
  return getEntities<Ingredient>(name);
}

export async function getPagedIngredients(
  filter: Partial<IngredientFilter>,
  page: Partial<Page>
) {
  return getPagedEntities(name, filter, page);
}

export async function mergeIngredients(id1: any, id2: any) {
  return await axios.post(base + `/${id1}/merge/${id2}`);
}

export async function updateIngredient(ingredient: Ingredient) {
  return (await axios.put(base + "/update", ingredient, header)) as Ingredient;
}

export async function copyIngredient(id: any, newName: string) {
  const response = await axios.post(
    base + `/copy?id=${id}&name=${newName}`,
    {},
    header
  );
  return response.data as Ingredient;
}

export async function deleteIngredient(id: any) {
  return await axios.delete(base + "/" + id);
}

export async function findIngredient(name: string): Promise<Ingredient> {
  const response = await axios.get(base + "/findByName?name=" + name);
  return response.data as Ingredient;
}
