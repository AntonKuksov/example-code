import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import { Key, useCallback, useEffect } from "react";
import { Ingredient } from "../../../model/Ingredient.ts";
import { addEntity } from "../../../services/general.ts";

const columns = [
  { key: "name", label: "NAME" },
  { key: "action", label: "ACTION" }
];

export default function IngredientTable(props: {
  ingredients: Partial<Ingredient>[];
  update: () => void;
  selectedIngredients: Set<string>;
  setSelectedIngredients: any;
}) {
  const { ingredients, update, selectedIngredients, setSelectedIngredients } =
    props;
  useEffect(() => {
    update();
  }, []);

  function addIngredient(ingredient: Partial<Ingredient>) {
    if (ingredient.name) {
      ingredient.name =
        ingredient.name.charAt(0).toUpperCase() +
        ingredient.name.slice(1).toLowerCase();
    }
    addEntity("ingredient", ingredient).then(() => update());
  }

  const renderCell = useCallback(
    (ingredient: Partial<Ingredient>, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return (
            <div style={{ whiteSpace: "unset", wordBreak: "break-word" }}>
              {ingredient.name}
            </div>
          );
        case "action":
          return ingredient.id ? (
            <Button
              size="md"
              as={Link}
              href={`/ingredient?id=${ingredient.id}`}
              className="bg-success-100 text-foreground"
              color="success"
              key={"present-" + ingredient.id}
            >
              View
            </Button>
          ) : (
            <Button
              size="md"
              className="bg-danger-100 text-foreground"
              color="danger"
              onPress={() => addIngredient(ingredient)}
              key={"not-present-" + ingredient.name}
            >
              Add
            </Button>
          );
        default:
          return ingredient[columnKey as keyof Ingredient];
      }
    },
    []
  );

  return (
    <>
      <Table
        removeWrapper
        color="default"
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
        selectedKeys={selectedIngredients}
        className="min-w-80"
        disabledKeys={
          new Set(ingredients.filter(i => i.id == null).map(i => i.name!))
        }
        onSelectionChange={setSelectedIngredients}
      >
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody
          items={ingredients.filter(i => i.name != null && i.name !== "")}
        >
          {item => (
            <TableRow key={item.name!.toString()}>
              {(
                columnKey // @ts-expect-error stupid nextui
              ) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
