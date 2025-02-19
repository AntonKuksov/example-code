import { useEffect, useState } from "react";
import { BrandFilter, Country } from "../../../model/Brand.ts";
import { FilterField } from "../../../model/FilterField.ts";
import { getCountries } from "../../../services/country.ts";

export default function FilterBrands(
  filter: Partial<BrandFilter>
): FilterField[] {
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  useEffect(() => {
    getCountries().then(setCountryOptions);
  }, []);

  return [
    {
      type: "input",
      name: "name",
      label: "search",
      placeholder: "search",
      value: filter.name
    },
    {
      type: "multiple-select",
      name: "countries",
      label: "countries",
      placeholder: "all_countries",
      value: filter.countries,
      options: countryOptions.sort((a, b) => a.name.localeCompare(b.name))
    },
    {
      type: "checkbox",
      name: "crueltyFree",
      label: "cruelty_free",
      value: filter.crueltyFree
    },
    {
      type: "checkbox",
      name: "vegan",
      label: "vegan",
      value: filter.vegan
    }
  ];
}
