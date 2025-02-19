import { useEffect, useState } from "react";
import { FilterField } from "../../../model/FilterField.ts";
import { IngredientFilter, IngredientType } from "../../../model/Ingredient.ts";
import { getIngredientActions } from "../../../services/ingredientAction.ts";
import { getIngredientTypes } from "../../../services/ingredientType.ts";

export default function FilterIngredients(
  filter: Partial<IngredientFilter>
): FilterField[] {
  const [typeOptions, setTypeOptions] = useState<IngredientType[]>([]);
  useEffect(() => {
    getIngredientTypes().then(setTypeOptions);
  }, []);

  const [actionOptions, setActionOptions] = useState<IngredientType[]>([]);
  useEffect(() => {
    getIngredientActions().then(setActionOptions);
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
      name: "actions",
      label: "Actions",
      placeholder: "all_actions",
      value: filter.actions,
      options: actionOptions
    },
    {
      type: "multiple-select",
      name: "types",
      label: "Types",
      placeholder: "all_types",
      value: filter.types,
      options: typeOptions
    }
  ];
}
