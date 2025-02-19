import { Button, Checkbox, Link } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../atoms.ts";
import { Brand, BrandFilter } from "../../../model/Brand.ts";
import { Page } from "../../../model/Page.ts";
import { getPagedBrands } from "../../../services/brand.ts";
import FilterFieldComponent from "../../shared/FilterFieldComponent.tsx";
import NothingFound from "../../shared/NothingFound.tsx";
import Paginate from "../../shared/Paginate.tsx";
import TextPanel from "../../shared/TextPanel.tsx";
import BrandCard from "../card/BrandCard.tsx";
import BrandCardSkeleton from "../card/BrandCardSkeleton.tsx";
import FilterBrands from "./FilterBrands.ts";

export default function Brands() {
  const user = useAtomValue(userAtom);

  const [t] = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<BrandFilter>({
    name: searchParams.get("name") ?? "",
    vegan: searchParams.get("vegan")
      ? searchParams.get("vegan") == "true"
      : false,
    crueltyFree: searchParams.get("crueltyFree")
      ? searchParams.get("crueltyFree") == "true"
      : false,
    countries: searchParams.get("countries")?.split(",") ?? []
  });

  function handleFilterChange(name: string, value: any) {
    setFilter((prevState: BrandFilter) => ({ ...prevState, [name]: value }));
  }

  const filterElement = FilterBrands(filter).map(f =>
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
    if (filter.vegan) params["vegan"] = filter.vegan;
    if (filter.crueltyFree) params["crueltyFree"] = filter.crueltyFree;
    if (filter.countries.length > 0)
      params["countries"] = filter.countries.join(",");

    if (pagination.currentPage > 1) params["page"] = pagination.currentPage;
    if (pagination.itemsPerPage != "12")
      params["itemsPerPage"] = pagination.itemsPerPage;

    setSearchParams(params);
  }, [filter, pagination.currentPage, pagination.itemsPerPage]);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const header = t("translation:brands");
  const content = t("translation:brands_about");

  useEffect(() => {
    setIsLoading(true);
    const partialFilter: Partial<BrandFilter> = {
      name: filter.name,
      vegan: filter.vegan,
      crueltyFree: filter.crueltyFree,
      countries: filter.countries
    };
    getPagedBrands(partialFilter, pagination).then(data => {
      setBrands(data.content);
      setPagination(pag => ({ ...pag, totalPages: data.totalPages }));

      if (data.number == 0 || data.numberOfElements == 0)
        setPagination(pag => ({ ...pag, currentPage: 1 }));

      setIsLoading(false);
    });
  }, [searchParams]);

  return (
    <>
      <div className="w-[80%]">
        <TextPanel header={header} text={content} alignText={"center"} />
      </div>
      {/*<ManageBrands selectedBrands={selectedBrands} />*/}

      <div
        key="filter-brands"
        className="flex flex-row flex-wrap gap-9 justify-center m-4"
      >
        {filterElement}
        {pagination.totalPages == 1 && (
          <Button
            as={Link}
            color="primary"
            className="text-primary-700 text-large"
            href={`products?brands=${brands.map(b => b.id).join(",")}`}
            variant="flat"
          >
            {t("translation:products_of_these_brands")}
          </Button>
        )}
      </div>

      <div
        key="show-brands"
        className="flex flex-wrap flex-row items-center justify-center my-4"
      >
        {isLoading ? (
          [...Array(Math.max(12, parseInt(pagination.itemsPerPage as string)))]
            .map((_, index) => index)
            .map(i => BrandCardSkeleton(i))
        ) : brands.length == 0 ? (
          <NothingFound />
        ) : (
          brands.map(brand => (
            <div
              key={"div-checkbox-" + brand.id}
              className="flex flex-col justify-around items-center"
            >
              {user?.roles.some(e => e.name in ["ADMIN", "MODERATOR"]) && (
                <Checkbox
                  size="lg"
                  key={"checkbox-" + brand.id}
                  isSelected={selectedBrands.includes(brand)}
                  onValueChange={e =>
                    e
                      ? setSelectedBrands([...selectedBrands, brand])
                      : setSelectedBrands(
                        selectedBrands.filter(i => i != brand)
                      )
                  }
                />
              )}
              <BrandCard {...brand} />
            </div>
          ))
        )}
      </div>

      {paginateElement}
    </>
  );
}
