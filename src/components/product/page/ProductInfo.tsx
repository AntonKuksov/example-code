import { Chip, Image } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import {
  Product,
  ProductImage,
  ProductToIngredient
} from "../../../model/Product.ts";
import {
  getIngredientsForProduct,
  getProduct
} from "../../../services/product.ts";
import CommentCard from "../../comment/card/CommentCard.tsx";
import IngredientCard from "../../ingredient/card/IngredientCard.tsx";
import AddEntity from "../../shared/admin/AddEntity.ts";
import AdminPanel from "../../shared/admin/AdminPanel.tsx";
import RemoveEntity from "../../shared/admin/RemoveEntity.tsx";
import BreadcrumbNav from "../../shared/BreadcrumbNav.tsx";
import AddIngredientsToProduct from "../admin/AddIngredientsToProduct.tsx";
import UpdateProduct from "../admin/UpdateProduct.tsx";

function ethicChip(label: string) {
  return (
    <Chip
      size="lg"
      variant="flat"
      color="success"
      className="text-success-800"
      key={label}
    >
      {label}
    </Chip>
  );
}

function productChip(label: string) {
  return (
    <Chip size="lg" variant="flat" className="text-foreground" key={label}>
      {label}
    </Chip>
  );
}

export default function ProductInfo() {
  const [searchParams] = useSearchParams();

  const [t] = useTranslation();

  const [product, setProduct] = useState<Product>();
  const [ingredients, setIngredients] = useState<ProductToIngredient[]>();

  useEffect(() => {
    getProduct(searchParams.get("id") ?? "1").then(data => {
      setProduct(data);
      getIngredientsForProduct(data.id).then(ingredientsData =>
        setIngredients(ingredientsData)
      );
    });
  }, []);
  const crumbs = ["products", product];

  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: "991px",
      numVisible: 4
    },
    {
      breakpoint: "767px",
      numVisible: 3
    },
    {
      breakpoint: "575px",
      numVisible: 1
    }
  ];

  const itemTemplate = (item: ProductImage) => (
    <Image
      alt="NextUI hero Image"
      src={item.url}
      className="border-1 w-md max-w-full max-h-md"
    />
  );

  const thumbnailTemplate = (item: ProductImage) => (
    <Image
      className="border-1 max-w-20 max-h-20"
      alt="NextUI hero Image"
      src={item.url}
    />
  );

  return (
    product && (
      <div className="my-3 px-3">
        <div className="flex flex-wrap flex-row max-w-4xl mr-auto justify-center">
          <BreadcrumbNav crumbs={crumbs} />
        </div>

        <div className="flex flex-col gap-9 min-w-screen-sm m-auto">
          <h1 className="font-semibold text-default-800 text-center">
            {t(product.name?.id?.toString())}
          </h1>

          <AdminPanel>
            <UpdateProduct product={product} />
            <div className="flex gap-5 flex-col">
              <AddEntity name="brand" redirect={false} />
              <AddEntity name="product-type" redirect={false} />
              <AddEntity name="problem" redirect={false} />
              <RemoveEntity name="product" entity={product} />
              <AddIngredientsToProduct product={product} />
            </div>
          </AdminPanel>

          <div className="flex flex-row gap-9 flex-wrap justify-center">
            <div className="max-w-md">
              {product.images && (
                <Galleria
                  value={product.images.sort(i => i.num)}
                  responsiveOptions={responsiveOptions}
                  numVisible={5}
                  circular
                  className="max-w-sm"
                  showItemNavigators
                  showThumbnailNavigators={false}
                  changeItemOnIndicatorHover
                  item={itemTemplate}
                  thumbnail={thumbnailTemplate}
                />
              )}
            </div>

            <div className="flex flex-col gap-9 max-w-sm">
              {product.brand && (
                <div>
                  <div className="text-default-800">
                    {t("translation:brand")}:
                  </div>
                  <p className="mb-2 text-lg font-semibold text-default-900">
                    {product.brand.name}
                  </p>
                </div>
              )}
              {product.problems?.length > 0 && (
                <div>
                  <div className="mb-2 text-lg font-semibold text-default-900">
                    {t("translation:can_help_with")}:
                  </div>
                  <ul className="max-w-md space-y-1 text-default-800 list-disc list-inside">
                    {product.problems.map(i => (
                      <li key={"type-" + i.id}>{i.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.howToUse && (
                <div>
                  <div className="mb-2 text-lg font-semibold text-default-900">
                    {t("translation:how_to_use")}:
                  </div>
                  <p className="text-default-800 max-w-sm">
                    {t(product.howToUse?.id?.toString())}
                  </p>
                </div>
              )}

              {product.whenToUse && (
                <div>
                  <div className="mb-2 text-lg font-semibold text-default-900">
                    {t("translation:how_to_use")}:
                  </div>
                  <p className="text-default-800 max-w-sm">
                    {t(product.whenToUse?.id?.toString())}
                  </p>
                </div>
              )}
              {(product.vegan || product.crueltyFree) && (
                <div className="chips flex flex-row flex-wrap gap-3">
                  {product.vegan && ethicChip("Vegan")}
                  {product.crueltyFree && ethicChip("Cruelty free")}
                </div>
              )}

              <div className="chips flex flex-row flex-wrap gap-3">
                {product.sulfateFree && productChip("Sulfate free")}
                {product.oilFree && productChip("Oil free")}
                {product.alcoholFree && productChip("Alcohol free")}
                {product.parabenFree && productChip("Paraben free")}
                {product.siliconFree && productChip("Silicon free")}
                {product.fragranceFree && productChip("Fragrance free")}
                {ingredients?.every(n => n.ingredient.name != "Water") &&
                  productChip("Water free")}
              </div>
            </div>
            {product.comments && (
              <div className="flex flex-col gap-9 max-w-sm">
                {product.comments.map(comment => CommentCard(comment))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-9 min-w-sm">
            {product.description && (
              <span className="">
                <div className="mb-2 text-lg font-semibold text-default-900">
                  {t("translation:desctiption")}:
                </div>
                <p className="text-default-800 w-fit">
                  {t(product.description?.id?.toString())}
                </p>
              </span>
            )}
          </div>
        </div>

        {ingredients?.length && (
          <>
            <h2 className="text-center font-semibold text-default-800">
              {t("translation:ingredients")}
            </h2>
            <div
              key="show-ingredients"
              className="flex flex-wrap flex-row items-center justify-center my-4"
            >
              {ingredients.map(i => (
                <IngredientCard {...i.ingredient} />
              ))}
            </div>
          </>
        )}
        <div />
      </div>
    )
  );
}
