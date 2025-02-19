import { Input } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandCard from "../components/brand/card/BrandCard.tsx";
import IngredientCard from "../components/ingredient/card/IngredientCard.tsx";
import ProductCard from "../components/product/card/ProductCard.tsx";
import SmallList from "../components/shared/SmallList.tsx";
import { Brand } from "../model/Brand.ts";
import { Ingredient } from "../model/Ingredient.ts";
import { Page } from "../model/Page.ts";
import { Product } from "../model/Product.ts";
import { getPagedBrands } from "../services/brand.ts";
import { getPagedIngredients } from "../services/ingredient.ts";
import { getPagedProducts } from "../services/product.ts";

export default function Search() {
  const [t] = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState<string>(searchParams.get("name") || "");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const page: Partial<Page> = {
    currentPage: 1,
    itemsPerPage: name == "" ? 5 : 15
  };

  useEffect(() => {
    setSearchParams({ name });
    if (name !== "") {
      getPagedIngredients({ name }, page).then(data =>
        setIngredients(data.content)
      );
      getPagedProducts({ name }, page).then(data => setProducts(data.content));
      getPagedBrands({ name }, page).then(data => setBrands(data.content));
    }
  }, [name, setSearchParams]); // Срабатывает, когда name изменяется

  return (
    <>
      <Input
        type="text"
        placeholder={t("translation:search")}
        className="py-8 max-w-[1024px]"
        size="lg"
        startContent={<CiSearch />}
        value={name}
        onValueChange={setName}
      />
      {ingredients.length > 0 && (
        <SmallList
          name={"ingredient"}
          lines={3}
          cards={ingredients.map(entity => (
            <div key={"ingredient" + entity.id}>{IngredientCard(entity)}</div>
          ))}
        />
      )}
      {products.length > 0 && (
        <SmallList
          name={"product"}
          lines={3}
          cards={products.map(entity => (
            <div key={"product" + entity.id}>
              <ProductCard {...entity} />
            </div>
          ))}
        />
      )}
      {brands.length > 0 && (
        <SmallList
          name={"brand"}
          lines={3}
          cards={brands.map(entity => (
            <div key={"brand" + entity.id}>
              <BrandCard {...entity} />
            </div>
          ))}
        />
      )}
    </>
  );
}
