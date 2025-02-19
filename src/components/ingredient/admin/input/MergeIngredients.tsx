import { Button, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Ingredient } from "../../../../model/Ingredient.ts";
import { getIngredients } from "../../../../services/ingredient.ts";
import ManageCard from "../../../shared/admin/ManageCard.tsx";
import MergeIngredientsModal from "../modal/MergeIngredientsModal.tsx";

export interface MergeIngredientProps {
  ingredient: Ingredient;
}

export default function MergeIngredient({ ingredient }: MergeIngredientProps) {
  const [toMerge, setToMerge] = useState<Ingredient[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const mergeModal = useDisclosure();

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  const body = (
    <>
      <MultiSelect
        value={toMerge}
        onChange={e => setToMerge(e.value)}
        options={ingredients.filter(i => i.id != ingredient.id)}
        optionLabel="name"
        display="chip"
        filter
        placeholder="Select ingredients"
      />
      <Button
        className="bg-default-200"
        isDisabled={toMerge?.length == 0}
        onPress={mergeModal.onOpen}
      >
        Submit
      </Button>
    </>
  );

  const modal = (
    <MergeIngredientsModal
      disclosure={mergeModal}
      toMerge={[
        ...new Set(
          ingredients.filter(i => toMerge.includes(i) || i.id == ingredient.id)
        )
      ]}
    />
  );

  return ManageCard("Merge", body, modal, "", "");
}
