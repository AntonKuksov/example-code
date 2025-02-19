import { ProductCategory } from "../model/Product.ts";
import { getEntities } from "./general.ts";

const name = "productCategories";

export function getCategories() {
  return getEntities<ProductCategory>(name);
}
