import { Button, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
import { Ingredient } from "../../../model/Ingredient.ts";
import { Product, ProductToIngredient } from "../../../model/Product.ts";
import { findIngredient } from "../../../services/ingredient.ts";
import { addIngredientsToProduct } from "../../../services/product.ts";
import ManageCard from "../../shared/admin/ManageCard.tsx";
import IngredientTable from "./IngredientTable.tsx";

export default function AddIngredientsToProduct(props: { product: Product }) {
  const { product } = props;
  const [productsToIngedients, setProductsToIngedients] = useState<
    ProductToIngredient[]
  >([]);
  const [ingredientNames, setIngredientNames] = useState<string>("");
  const [ingredients, setIngredients] = useState<Partial<Ingredient>[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    new Set(productsToIngedients.map(i => i.ingredient.name))
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function findIngredients() {
    if (ingredientNames == "") return;
    const foundIngredients: Partial<Ingredient>[] = [];

    const names = [ingredientNames.split(","), ingredientNames.split("•")].sort(
      a => -a.length
    );

    const promises = names[0].map(ingredientName =>
      findIngredient(
        ingredientName
          .split("/")[0]
          .replace("/\\s*\\(.*?\\)\\s*/g", "")
          .trim()
          .toLowerCase()
      )
        .then(data => {
          foundIngredients.push(data);
        })
        .catch(() => {
          foundIngredients.push({ name: ingredientName });
        })
    );

    await Promise.all(promises).then(() => {
      const ingMap = productsToIngedients.map(i => i.ingredient);
      const ing = [
        ...new Map(
          [...ingMap, ...foundIngredients].map(item => [item.name, item])
        ).values()
      ].sort(
        (a, b) =>
          ingredientNames.indexOf(a.name!) - ingredientNames.indexOf(b.name!)
      );
      setIngredients(ing);
    });
  }

  useEffect(() => {
    findIngredients();
  }, [ingredientNames]);

  function addIngredients() {
    const ingredientIds = ingredients
      .filter(
        // @ts-expect-error stupid nextui
        i => selectedIngredients == "all" || selectedIngredients.has(i.name!)
      )
      .sort(
        (a, b) =>
          ingredientNames.indexOf(a.name!) - ingredientNames.indexOf(b.name!)
      )
      .map(i => i.id!.toString());

    addIngredientsToProduct(product.id.toString(), ingredientIds)
      .then(data => {
        setProductsToIngedients(data);
        setErrorMessage("");
        setSuccessMessage(`Added ${selectedIngredients.size} ingredients`);
      })
      .catch(err => {
        setSuccessMessage("");
        setErrorMessage(
          `Failed to add ingredients: ${err.response.status}, ${err.response.data.message}`
        );
      });
  }

  const body = (
    <div className="flex flex-col gap-3 items-end min-w-full">
      <Textarea
        maxRows={40}
        label="Ingredients to add"
        onChange={e => setIngredientNames(e.target.value)}
        className="min-w-80"
      />
      {ingredients.filter(i => i.name != null && i.name !== "").length > 0 &&
        ingredientNames.length > 0 && (
        <div>
          <IngredientTable
            ingredients={ingredients}
            update={findIngredients}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
        </div>
      )}
      <Button
        className="bg-default-200"
        isDisabled={selectedIngredients.size == 0}
        onPress={addIngredients}
      >
        Add
      </Button>
    </div>
  );

  return ManageCard(
    "Add ingredients to card",
    body,
    [],
    successMessage,
    errorMessage
  );
}
