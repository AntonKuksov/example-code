import {
  Alert,
  Button,
  Chip,
  Input,
  Select,
  SelectedItems,
  SelectItem,
  Textarea
} from "@heroui/react";
import { useEffect, useState } from "react";
import {
  Ingredient,
  IngredientAlternativeName,
  IngredientType
} from "../../../../model/Ingredient.ts";
import { updateIngredient } from "../../../../services/ingredient.ts";
import { getIngredientTypes } from "../../../../services/ingredientType.ts";
import ManageCard from "../../../shared/admin/ManageCard.tsx";

export default function UpdateIngredient(props: { ingredient: Ingredient }) {
  let { ingredient } = props;

  const [ingredientTypes, setIngredientTypes] = useState<IngredientType[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    ingredient.types.map(t => t.id?.toString() ?? "-1")
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getIngredientTypes().then(setIngredientTypes);
  }, []);

  function update() {
    ingredient.types = ingredientTypes.filter(t =>
      selectedTypes.includes(t.id?.toString() ?? "-1")
    );

    setMessage("");
    setError("");
    setLoading(true);
    updateIngredient(ingredient)
      .then(data => {
        setMessage("Ingredient updated");
        ingredient = data;
      })
      .catch(err =>
        setError(
          `Failed to update ingredient: ${err.response.status}, ${err.response.data.message}`
        )
      )
      .finally(() => setLoading(false));
  }

  const body = (
    <>
      <div className="flex flex-col gap-3">
        <div className="max-w-80">
          {message && <Alert color="success" title={message} isClosable />}
          {error && <Alert color="danger" title={error} isClosable />}
        </div>
        <Input
          isDisabled
          type="text"
          label="ID"
          defaultValue={ingredient.id?.toString() ?? "0"}
          className="max-w-80"
        />
        <Input
          isDisabled
          type="text"
          label="Name"
          defaultValue={ingredient.name}
          className="max-w-80"
        />
        <Input
          type="text"
          label="Name"
          className="max-w-80"
          defaultValue={ingredient.name}
          onChange={e => (ingredient.name = e.target.value)}
        />
        <Input
          type="text"
          label="Formula"
          defaultValue={ingredient.molecularFormula}
          onChange={e => (ingredient.molecularFormula = e.target.value)}
          className="max-w-80"
        />
        <Input
          type="text"
          label="CAS"
          defaultValue={ingredient.cas}
          onChange={e => (ingredient.cas = e.target.value)}
          className="max-w-80"
        />

        <Input
          type="number"
          key="input-max-concentration"
          label="Concentration"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">%</span>
            </div>
          }
          defaultValue={ingredient.maxConcentration?.toString()}
          onChange={e =>
            (ingredient.maxConcentration = parseFloat(e.target.value))
          }
          className="max-w-80"
        />

        <Textarea
          label="Alternative names (comma separated)"
          defaultValue={ingredient.alternativeNames.map(i => i.name).join(", ")}
          onChange={e =>
            (ingredient.alternativeNames = e.target.value.split(", ").map(
              i =>
                ({
                  id: 0,
                  name: i
                }) as IngredientAlternativeName
            ))
          }
          className="max-w-80"
        />

        <Select
          isLoading={ingredientTypes.length == 0}
          aria-label="select-type"
          selectionMode="multiple"
          placeholder="Select type"
          selectedKeys={selectedTypes}
          renderValue={(items: SelectedItems<string[]>) => (
            <div className="flex flex-wrap gap-2 p-2">
              {items.map(item => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          )}
          isMultiline
          className="max-w-80"
          onChange={e =>
            setSelectedTypes(e.target.value.split(",").map(i => i.trim()))
          }
        >
          {ingredientTypes.map(type => (
            <SelectItem key={type.id ?? 0}>{type.name}</SelectItem>
          ))}
        </Select>

        <Textarea
          label="Description"
          defaultValue={ingredient.description}
          onChange={e => (ingredient.description = e.target.value)}
          className="max-w-80"
        />

        <Textarea
          label="Origin"
          defaultValue={ingredient.origin}
          onChange={e => (ingredient.origin = e.target.value)}
          className="max-w-80"
        />

        <div style={{ alignSelf: "end" }}>
          <Button
            isLoading={loading}
            className="bg-default-200 "
            onPress={update}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );

  return ManageCard("Update ingredient", body, <></>, "", "");
}
