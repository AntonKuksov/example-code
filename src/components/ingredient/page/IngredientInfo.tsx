import { Chip, Divider, Image } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ingredient } from "../../../model/Ingredient.ts";
import { Page } from "../../../model/Page.ts";
import { Product } from "../../../model/Product.ts";
import { getEntity } from "../../../services/general.ts";
import { getIngredientChildren } from "../../../services/ingredient.ts";
import { getPagedProducts } from "../../../services/product.ts";
import AddEntity from "../../shared/admin/AddEntity.ts";
import AdminPanel from "../../shared/admin/AdminPanel.tsx";
import RemoveEntity from "../../shared/admin/RemoveEntity.tsx";
import BreadcrumbNav from "../../shared/BreadcrumbNav.tsx";
import { capitalizeFirstLetter } from "../../shared/textUtils.ts";
import MergeIngredients from "../admin/input/MergeIngredients.tsx";
import SplitIngredient from "../admin/input/SplitIngredients.tsx";
import UpdateIngredient from "../admin/input/UpdateIngredient.tsx";
import IngredientCard from "../card/IngredientCard.tsx";
import ProductsList from "./ProductsList.tsx";

export default function IngredientInfo() {
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();

  const [ingredient, setIngredient] = useState<Ingredient>();
  const [children, setChildren] = useState<Ingredient[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const page: Partial<Page> = {
    currentPage: 1,
    itemsPerPage: 24
  };

  useEffect(() => {
    getEntity<Ingredient>("ingredients", searchParams.get("id") ?? "1").then(
      foundIngredient => {
        setIngredient(foundIngredient);
        getIngredientChildren(foundIngredient.id).then(setChildren);

        getPagedProducts({ ingredients: [foundIngredient.id] }, page).then(
          data => {
            setProducts(data.content as Product[]);
          }
        );
      }
    );
  }, []);
  const crumbs = ["ingredients", ingredient];

  return ingredient ? (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col mt-2">
          <div className="flex flex-wrap flex-row">
            <BreadcrumbNav crumbs={crumbs} />
          </div>
          <h1 className="font-semibold text-default-800">{ingredient.name}</h1>
        </div>
      </div>
      <div className="flex flex-row gap-9">
        <div className="flex flex-col max-w-lg">
          <AdminPanel>
            <UpdateIngredient ingredient={ingredient} />
            <div className="flex gap-5 flex-col">
              <MergeIngredients ingredient={ingredient} />
              <SplitIngredient ingredient={ingredient} />
              <AddEntity name="ingredient-type" redirect={false} />
              <AddEntity name="ingredient-action" redirect={false} />
              <RemoveEntity name="ingredient" entity={ingredient} />
            </div>
          </AdminPanel>
          <div className="flex flex-row gap-3 flex-wrap ">
            <div className="flex flex-col gap-2">
              {ingredient.actions.length > 0 && (
                <span className="flex flex-row flex-wrap items-center mb-2">
                  <div className="pr-2 font-semibold text-default-900">
                    {t("translation:acts_as")}:
                  </div>
                  {ingredient.actions.map(i => (
                    <Chip
                      variant="flat"
                      color="default"
                      className="text-foreground my-1 mr-2"
                      key={"chip-" + i.id}
                      size="sm"
                    >
                      {capitalizeFirstLetter(i.name)}
                    </Chip>
                  ))}
                </span>
              )}
              {ingredient.imageUrl && (
                <Image
                  width="530"
                  height="530"
                  alt="Image of molecular formula "
                  src={ingredient.imageUrl}
                  className="border-1"
                />
              )}
              <div className="flex flex-col text-default-800">
                <div className="flex justify-between gap-3 mb-3">
                  {ingredient.cas && <span>CAS: {ingredient.cas}</span>}
                  {ingredient.ec && <span>EC: {ingredient.ec}</span>}
                  {ingredient.molecularFormula && (
                    <div className="text-default-800" key="formula">
                      {ingredient.molecularFormula.split(", ").map((i, id) => (
                        <div key={"formula-" + id}>
                          {!!id && " or "}
                          <div className="font-semibold">
                            {i
                              .split(/(\d+)/)
                              .map((token, idx) =>
                                idx % 2 ? <sub key={idx}>{token}</sub> : token
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Divider />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between my-3">
            <div className="flex flex-col">
              {ingredient.alternativeNames.filter(n => !n.isHidden).length >
                0 && (
                <div>
                  <div className="mb-2 text-lg font-semibold text-default-900">
                    {t("translation:also_known_as")}:
                  </div>
                  <ul className="max-w-md space-y-1 text-default-800 list-disc list-inside">
                    {ingredient.alternativeNames
                      .filter(n => !n.isHidden)
                      .map(i => (
                        <li key={"ingredient-" + i.id}>{i.name}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              {ingredient.origin && (
                <div className="flex mb-2 flex-row items-center">
                  <div className="text-lg mr-2 font-semibold text-default-900">
                    {t("translation:origin")}:
                  </div>
                  <p className="text-default-800">{ingredient.origin}</p>
                </div>
              )}
              <div className="flex flex-row gap-3">
                {ingredient.maxConcentration &&
                  ingredient.maxConcentration > 0 && (
                  <Chip
                    className="bg-default-100 text-foreground"
                    color="default"
                  >
                    Maximum concentration is: {ingredient.maxConcentration}%
                  </Chip>
                )}
              </div>
            </div>
          </div>
          {ingredient.description && (
            <span className="">
              <div className="mb-2 text-lg font-semibold text-default-900">
                {t("translation:desctiption")}:
              </div>
              <p className="text-default-800">{ingredient.description}</p>
            </span>
          )}
          {children.length > 0 && (
            <div>
              <h3>{t("translation:this_ingredient_is_a_group")}</h3>
              <div className="flex flex-wrap flex-row items-center justify-center my-4">
                {children.map(ingredient => (
                  <div
                    key={"div-checkbox-" + ingredient.id}
                    className="flex flex-col justify-around items-center"
                  >
                    <IngredientCard {...ingredient} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col max-w-lg gap-3">
          {products.length > 0 && (
            <>
              <div className="mb-2 flex flex-row items-center">
                <div className="text-large mr-2 font-semibold text-default-900">
                  {ingredient.numberOfProducts}{" "}
                  {t("translation:products_with_ingredient")}
                </div>
              </div>
              <ProductsList items={products} />
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
