import { Brand, BrandFilter } from "../model/Brand.ts";
import { Page } from "../model/Page.ts";
import { getEntities, getPagedEntities } from "./general.ts";

const name = "brands";

export async function getBrands() {
  return getEntities<Brand>(name);
}

export async function getPagedBrands(
  filter: Partial<BrandFilter>,
  page: Partial<Page>
) {
  return getPagedEntities(name, filter, page);
}
