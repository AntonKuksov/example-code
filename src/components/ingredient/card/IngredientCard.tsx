import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link
} from "@heroui/react";
import { Ingredient } from "../../../model/Ingredient.ts";
import {
  capitalizeFirstLetter,
  sortByLength,
  sortByNameLength
} from "../../shared/textUtils.ts";

export default function IngredientCard(ingredient: Ingredient) {
  const namesString = ingredient.alternativeNames
    .filter(i => !i.isHidden)
    .map(i => i.name)
    .sort(sortByLength)
    .join(", ");

  const actionsString = ingredient.actions
    .sort(sortByNameLength)
    .map(t => capitalizeFirstLetter(t.name))
    .filter(a => !ingredient.types.map(t => t.name).includes(a))
    .join(" | ");

  return (
    <div key={"link-" + ingredient.id}>
      <Link
        className="flex-grow-0 flex-shrink-0 basis-auto w-[22rem] h-56 p-4"
        href={`/ingredient?id=${ingredient.id}`}
      >
        <Card
          className="min-w-full min-h-full px-2"
          key={ingredient.id}
          isHoverable
          isPressable
          onPress={() => (location.href = `/ingredient?id=${ingredient.id}`)}
        >
          <CardHeader
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="min-h-16 flex flex-row gap-6 justify-between"
          >
            <div>
              <div className="text-sm text-left line-clamp-1">
                {ingredient.name.trim()}
              </div>
              <div className="text-sm text-default-600 text-left line-clamp-1">
                {namesString.trim()}
              </div>
            </div>
          </CardHeader>
          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0 flex flex-col justify-between"
          >
            <div className="text-default-800 text-left text-xs line-clamp-2">
              {ingredient.description}
            </div>
            <div className="flex flex-row gap-6 justify-between pb-3">
              <div className="flex flex-row gap-3">
                {ingredient.types.map(t => (
                  <Chip
                    variant="flat"
                    className="text-success-900"
                    color="success"
                    key={"chip-" + t.name}
                    size="sm"
                  >
                    {t.name}
                  </Chip>
                ))}
              </div>
              <div>
                <Chip
                  variant="flat"
                  color="default"
                  className="text-foreground"
                  key="chip"
                  size="sm"
                >
                  {ingredient.numberOfProducts}{" "}
                  {ingredient.numberOfProducts % 10 === 1 &&
                  ingredient.numberOfProducts % 100 !== 11
                    ? "product"
                    : "products"}
                </Chip>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="min-h-11">
            <div className="text-xs text-left text-default-800 line-clamp-1">
              {actionsString}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
