import axios from "axios";
import { Page } from "../model/Page.ts";
import {
  Product,
  ProductFilter,
  ProductToIngredient
} from "../model/Product.ts";
import { getEntity, getPagedEntities } from "./general.ts";
import { header } from "./header.ts";

const base = "api/products";
const name = "products";

export async function getProduct(id: string) {
  return getEntity<Product>(name, id);
}

export async function getPagedProducts(
  filter: Partial<ProductFilter>,
  page: Partial<Page>
) {
  return getPagedEntities(name, filter, page);
}

export async function addIngredientsToProduct(
  productId: string,
  ingredietnIds: string[]
) {
  const response = await axios.post(
    base + `/${productId}/add-ingredients`,
    ingredietnIds,
    header
  );
  return response.data as ProductToIngredient[];
}

export async function getIngredientsForProduct(productId: number) {
  const response = await axios.get(base + `/${productId}/ingredients`, header);
  return response.data as ProductToIngredient[];
}
