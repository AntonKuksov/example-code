import { Button, Textarea, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { Ingredient } from "../../../../model/Ingredient.ts";
import ManageCard from "../../../shared/admin/ManageCard.tsx";
import SplitIngredientsModal from "../modal/SplitIngredientModal.tsx";

export default function SplitIngredient(props: { ingredient: Ingredient }) {
  const { ingredient } = props;
  const [toSplit, setToSplit] = useState<string[]>(
    ingredient.name.split(",").map(i => i.trim())
  );
  const splitModal = useDisclosure();

  const body = (
    <>
      <Textarea
        type="text"
        label="Add commas for splitting"
        className="max-w-80"
        defaultValue={ingredient.name}
        onChange={e => setToSplit(e.target.value.split(",").map(s => s.trim()))}
      />

      <Button
        className="bg-default-200"
        isDisabled={toSplit?.length == 0}
        onPress={splitModal.onOpen}
      >
        Submit
      </Button>
    </>
  );

  const modal = (
    <SplitIngredientsModal
      disclosure={splitModal}
      ingredient={ingredient}
      toSplit={toSplit}
    />
  );

  return ManageCard("Split", body, modal, "", "");
}
