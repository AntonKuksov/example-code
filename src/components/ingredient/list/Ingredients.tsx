import { Checkbox } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Ingredient, IngredientFilter } from "../../../model/Ingredient.ts";
import { Page } from "../../../model/Page.ts";
import { getPagedIngredients } from "../../../services/ingredient.ts";
import AdminOnly from "../../shared/admin/AdminOnly.tsx";
import FilterFieldComponent from "../../shared/FilterFieldComponent.tsx";
import NothingFound from "../../shared/NothingFound.tsx";
import Paginate from "../../shared/Paginate.tsx";
import TextPanel from "../../shared/TextPanel.tsx";
import ManageIngredients from "../admin/input/ManageIngredients.tsx";
import IngredientCard from "../card/IngredientCard.tsx";
import IngredientCardSkeleton from "../card/IngredientCardSkeleton.tsx";
import FilterIngredients from "./FilterIngredients.ts";

export default function Ingredients() {
  const [t] = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState<IngredientFilter>({
    name: searchParams.get("name") ?? "",
    types: searchParams.get("types")?.split(",") ?? [],
    actions: searchParams.get("actions")?.split(",") ?? []
  });

  function handleFilterChange(name: string, value: any) {
    setFilter((prevState: IngredientFilter) => ({
      ...prevState,
      [name]: value
    }));
  }

  const filterElement = FilterIngredients(filter).map(f =>
    FilterFieldComponent(f, handleFilterChange)
  );

  const [pagination, setPagination] = useState<Page>({
    currentPage: parseInt(searchParams.get("page") ?? "1"),
    itemsPerPage: searchParams.get("itemsPerPage") ?? "12",
    totalPages: 100
  });

  const paginateElement = useMemo(
    () => Paginate(pagination, setPagination),
    [pagination]
  );

  useEffect(() => {
    const params: any = {};
    if (filter.name != "") params["name"] = filter.name;
    if (filter.types?.length > 0) params["types"] = filter.types.join(",");
    if (filter.actions?.length > 0)
      params["actions"] = filter.actions.join(",");

    if (pagination.currentPage > 1) params["page"] = pagination.currentPage;
    if (pagination.itemsPerPage != 12)
      params["itemsPerPage"] = pagination.itemsPerPage;

    setSearchParams(params);
  }, [filter, pagination.currentPage, pagination.itemsPerPage]);
  const header = t("translation:ingredients");
  const content = t("translation:ingredients_about");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  useEffect(() => {
    setIsLoading(true);

    const partialFilter: Partial<IngredientFilter> = { name: filter.name };
    if (filter.types?.filter(i => i.length > 0).length > 0) {
      partialFilter["types"] = filter.types;
    }
    if (filter.actions?.filter(i => i.length > 0).length > 0) {
      partialFilter["actions"] = filter.actions;
    }
    getPagedIngredients(partialFilter, pagination).then(data => {
      setIngredients(data.content);
      setPagination(pag => ({ ...pag, totalPages: data.totalPages }));

      if (data.number == 0 || data.numberOfElements == 0)
        setPagination(pag => ({ ...pag, currentPage: 1 }));
      setIsLoading(false);
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col p-6 justify-center max-sm:w-[80%]">
      <div className="flex flex-row justify-center">
        <TextPanel header={header} text={content} alignText={"center"} />
        <ManageIngredients selectedIngredients={selectedIngredients} />
      </div>
        <div className="ingredient_grid">
          <div
            key="filter_ingredients"
            className="flex flex-col ingredient_filters gap-6 mt-4"
          >
            {filterElement}
          </div>
          <div className="flex w-full flex-col">
            <div
              key="show_ingredient"
              className="flex flex-wrap flex-row ingredient_cards"
            >
              {isLoading ? (
                [...Array(Math.max(12, parseInt(pagination.itemsPerPage as string)))]
                  .map((_, index) => index)
                  .map(i => IngredientCardSkeleton(i))
              ) : ingredients.length == 0 ? (
                <NothingFound />
              ) : (
                ingredients.map(ingredient => (
                  <div
                    key={"div-checkbox-" + ingredient.id}
                    className="flex flex-col justify-around items-center"
                  >
                    <AdminOnly>
                      <Checkbox
                        size="lg"
                        key={"checkbox-" + ingredient.id}
                        isSelected={selectedIngredients.includes(ingredient)}
                        onValueChange={e =>
                          e
                            ? setSelectedIngredients([
                              ...selectedIngredients,
                              ingredient
                            ])
                            : setSelectedIngredients(
                              selectedIngredients.filter(i => i != ingredient)
                            )
                        }
                      />
                    </AdminOnly>

                    <IngredientCard {...ingredient} />
                  </div>
                ))
              )}
            </div>
            <div className="flex flex-row justify-center">{paginateElement}</div>
          </div>
        </div>
    </div>
  );
}
