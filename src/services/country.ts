import { Country } from "../model/Brand.ts";
import { getEntities } from "./general.ts";

const name = "countries";

export async function getCountries() {
  return getEntities<Country>(name);
}
