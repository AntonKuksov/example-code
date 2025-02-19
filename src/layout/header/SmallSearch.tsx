import { Button, Divider, Input } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Page } from "../../model/Page.ts";
import { Locale } from "../../model/Product.ts";
import { getPagedBrands } from "../../services/brand.ts";
import { getPagedIngredients } from "../../services/ingredient.ts";
import { getPagedProducts } from "../../services/product.ts";
import useDebounce from "../../services/useDebounce.ts";

interface SuggestionGroups {
  products: string[];
  ingredients: string[];
  brands: string[];
}

export default function SmallSearch() {
  const [t, i18n] = useTranslation();
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionGroups>({
    products: [],
    ingredients: [],
    brands: []
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const page: Partial<Page> = {
    currentPage: 1,
    itemsPerPage: name === "" ? 5 : 15
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedFetchSuggestions = useDebounce(async(name: string) => {
    try {
      const [productData, ingredientData, brandData] = await Promise.all([
        getPagedProducts({ name }, page),
        getPagedIngredients({ name }, page),
        getPagedBrands({ name }, page)
      ]);

      setSuggestions({
        products: productData.content
          .map(
            entity =>
              entity["name"][i18n.language as Locale] ||
              entity["name"]["en_US"] ||
              entity["name"]["et_EE"]
          )
          .slice(0, 5),
        ingredients: ingredientData.content
          .map(entity => entity["name"])
          .slice(0, 5),
        brands: brandData.content.map(entity => entity["name"]).slice(0, 5)
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions({ products: [], ingredients: [], brands: [] });
    }
  }, 300);

  useEffect(() => {
    if (name.length > 1) {
      debouncedFetchSuggestions(name);
      setShowSuggestions(true);
    } else {
      setSuggestions({ products: [], ingredients: [], brands: [] });
      setShowSuggestions(false);
    }
  }, [name, debouncedFetchSuggestions]);

  function search(e: React.FormEvent) {
    e.preventDefault();
    navigate("/search?name=" + name);
  }

  function selectSuggestion(suggestion: string) {
    setName(suggestion);
    setShowSuggestions(false);
    navigate("/search?name=" + suggestion);
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={search} className="input">
        <Input
          type="text"
          placeholder={t("translation:search")}
          className="py-4 text-xl"
          value={name}
          onValueChange={value => {
            setName(value);
            setShowSuggestions(true);
          }}
          size="lg"
          startContent={
            <CiSearch className="text-2xl text-default pointer-events-none flex-shrink-0" />
          }
          endContent={
            <Button
              type="submit"
              isIconOnly
              color="default"
              variant="light"
              onKeyDown={e =>
                e.key === "Enter" && name !== "" ? search(e) : null
              }
            >
              <FaArrowRight />
            </Button>
          }
        />
      </form>
      {showSuggestions && (
        <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.products.length > 0 && (
            <div>
              <div className="p-2 font-bold">Products</div>
              <Divider />
              <ul>
                {suggestions.products.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 ml-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {suggestions.ingredients.length > 0 && (
            <div>
              <div className="p-2 font-bold">Ingredients</div>
              <Divider />
              <ul>
                {suggestions.ingredients.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 ml-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {suggestions.brands.length > 0 && (
            <div>
              <div className="p-2 font-bold">Brands</div>
              <Divider />
              <ul>
                {suggestions.brands.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 ml-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
