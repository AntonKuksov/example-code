import { Accordion, AccordionItem, Chip } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../model/Product.ts";

export interface MultiSelectAccordionProps {
  items: Product[];
}

export default function ProductsList({ items }: MultiSelectAccordionProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleToggle = useCallback(
    (productId: number) => {
      setActiveProduct(prevProduct =>
        prevProduct?.id === productId
          ? null
          : items.find(item => item.id === productId) || null
      );
    },
    [items]
  );

  useEffect(() => {
    if (activeProduct) {
      navigate(`/product?id=${activeProduct.id}`);
    }
  }, [activeProduct]);

  return (
    <div
      style={{
        maxHeight: items.length > 1 ? "700px" : "auto",
        overflowY: items.length > 1 ? "auto" : "visible",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "8px"
      }}
    >
      <Accordion isCompact>
        {items.map(item => {
          const sortedImages = item.images?.sort(
            (a, b) => (a.num || 0) - (b.num || 0)
          );
          const imageUrl = sortedImages?.[0]?.url || "/fallback-image.jpg";

          return (
            <AccordionItem
              key={item.id}
              startContent={
                <img
                  alt={t(item.name?.id?.toString())}
                  src={imageUrl}
                  className=" w-20"
                />
              }
              subtitle={
                <div>
                  <div className="text-default-600">{item.brand?.name}</div>
                  <div>
                    <Chip
                      className="text-default-800"
                      radius="sm"
                      color="default"
                      variant="bordered"
                    >
                      {item.category.name}
                    </Chip>
                  </div>
                </div>
              }
              onPress={() => handleToggle(item.id)}
              title={<span>{t(item.name?.id?.toString())}</span>}
            ></AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
