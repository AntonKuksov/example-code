import { useEffect, useState } from "react";
import { Brand } from "../../../model/Brand.ts";
import { FilterField } from "../../../model/FilterField.ts";
import { IngredientType } from "../../../model/Ingredient.ts";
import { ProductCategory, ProductFilter } from "../../../model/Product.ts";
import { getBrands } from "../../../services/brand.ts";
import { getIngredientTypes } from "../../../services/ingredientType.ts";
import { getCategories } from "../../../services/productCategory.ts";

export default function FilterProducts(
  filter: Partial<ProductFilter>
): FilterField[] {
  const [categoryOptions, setCategoryOptions] = useState<ProductCategory[]>([]);
  const [brandOptions, setBrandOptions] = useState<Brand[]>([]);
  const [ingredientTypeOptions, setIngredientTypeOptions] = useState<
    IngredientType[]
  >([]);

  useEffect(() => {
    getBrands().then(setBrandOptions);
    getCategories().then(setCategoryOptions);
    getIngredientTypes().then(setIngredientTypeOptions);
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
      name: "categories",
      label: "Categories",
      placeholder: "all_categories",
      value: filter.categories,
      options: categoryOptions
    },
    {
      type: "multiple-select",
      name: "brands",
      label: "Brands",
      placeholder: "all_brands",
      value: filter.brands,
      options: brandOptions
    },
    {
      type: "multiple-select",
      name: "ingredientTypes",
      label: "ingredient_types",
      placeholder: "ingredient_types",
      value: filter.ingredientTypes,
      options: ingredientTypeOptions
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
    /*
     * {
     *   type: "multiple-select-filter",
     *   name: "ingredients",
     *   label: "Ingredients",
     *   placeholder: "Contains any ingredients",
     *   value: filter.ingredients,
     *   options: ingredientOptions
     * }
     */
  ];
}
