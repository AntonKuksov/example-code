import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Page } from "../../../model/Page.ts";
import { Product, ProductFilter } from "../../../model/Product.ts";
import { getPagedProducts } from "../../../services/product.ts";
import FilterFieldComponent from "../../shared/FilterFieldComponent.tsx";
import NothingFound from "../../shared/NothingFound.tsx";
import Paginate from "../../shared/Paginate.tsx";
import TextPanel from "../../shared/TextPanel.tsx";
import ManageProducts from "../admin/ManageProducts.tsx";
import ProductCard from "../card/ProductCard.tsx";
import ProductCardSkeleton from "../card/ProductCardSkeleton.tsx";
import FilterProducts from "./FilterProducts.ts";

export default function Products() {
  const [t] = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState<ProductFilter>({
    name: searchParams.get("name") ?? "",
    categories: searchParams.get("types")?.split(",") ?? [],
    brands: searchParams.get("brands")?.split(",") ?? [],
    vegan: searchParams.get("vegan")
      ? searchParams.get("vegan") == "true"
      : false,
    crueltyFree: searchParams.get("crueltyFree")
      ? searchParams.get("crueltyFree") == "true"
      : false,
    ingredients: searchParams.get("ingredients")?.split(",") ?? [],
    ingredientTypes: searchParams.get("ingredientTypes")?.split(",") ?? []
  });

  function handleFilterChange(name: string, value: any) {
    setFilter((prevState: ProductFilter) => ({
      ...prevState,
      [name]: value
    }));
  }

  const filterElement = FilterProducts(filter).map(f =>
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
    if (filter.brands?.length > 0) params["brands"] = filter.brands;
    if (filter.vegan) params["vegan"] = filter.vegan;
    if (filter.crueltyFree) params["crueltyFree"] = filter.crueltyFree;
    if (filter.categories?.length > 0)
      params["types"] = filter.categories.join(",");
    if (filter.ingredientTypes?.length > 0)
      params["ingredientTypes"] = filter.ingredientTypes.join(",");

    if (pagination.currentPage > 1) params["page"] = pagination.currentPage;
    if (pagination.itemsPerPage != "12")
      params["itemsPerPage"] = pagination.itemsPerPage;

    setSearchParams(params);
  }, [filter, pagination.currentPage, pagination.itemsPerPage]);

  const [products, setProducts] = useState<Product[]>([]);
  // const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const header = t("translation:products");
  const content = t("translation:products_about");
  useEffect(() => {
    setIsLoading(true);
    const partialFilter: Partial<ProductFilter> = {
      name: filter.name,
      vegan: filter.vegan,
      crueltyFree: filter.crueltyFree
    };
    if (filter.categories?.length > 0)
      partialFilter["categories"] = filter.categories;
    if (filter.brands?.length > 0) partialFilter["brands"] = filter.brands;
    if (filter.ingredientTypes?.length > 0)
      partialFilter["ingredientTypes"] = filter.ingredientTypes;
    getPagedProducts(partialFilter, pagination).then(data => {
      setProducts(data.content);
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
        <ManageProducts />
      </div>
      <div className="product_grid">
        <div
          key="filter-products"
          className="flex flex-col product_filters gap-6 mt-4"
        >
          {filterElement}
        </div>
        <div className="flex w-full flex-col">
          <div
            key="show-products"
            className="flex flex-wrap flex-row product_cards"
          >
            {isLoading ? (
              [
                ...Array(
                  Math.max(12, parseInt(pagination.itemsPerPage as string))
                )
              ]
                .map((_, index) => index)
                .map(i => ProductCardSkeleton(i))
            ) : products.length == 0 ? (
              <NothingFound />
            ) : (
              products.map(product => (
                <div
                  key={"div-checkbox-" + product.id}
                  className="flex flex-col justify-around items-center"
                >
                  <ProductCard {...product} />
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
