import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Link
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Brand } from "../../../model/Brand.ts";

export default function BrandCard(brand: Brand) {
  const [t] = useTranslation();

  return (
    <div key={"link-" + brand.id}>
      <Link
        className="flex-grow-0 flex-shrink-0 basis-auto w-[22rem] h-60 p-4"
        href={`/brand?id=${brand.id}`}
      >
        <Card
          className="min-w-full min-h-full px-2"
          key={brand.id}
          isHoverable
          isPressable
          onPress={() => (location.href = `/brand?id=${brand.id}`)}
        >
          <CardHeader
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="min-h-16 flex flex-row gap-6 justify-between"
          >
            <div className="text-sm text-left line-clamp-1">
              {brand.name.trim()}
            </div>
          </CardHeader>
          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0 flex flex-col justify-between"
          >
            <div className="flex flex-row gap-6 justify-between pb-3">
              <div className="flex flex-row gap-3">
                {brand.vegan && (
                  <Chip
                    variant="flat"
                    className="text-success-900"
                    color="success"
                    key={"vegan-chip-" + brand.name}
                    size="sm"
                  >
                    {t("translation:vegan")}
                  </Chip>
                )}
                {brand.crueltyFree && (
                  <Chip
                    variant="flat"
                    className="text-success-900"
                    color="success"
                    key={"cruelty-free-chip-" + brand.name}
                    size="sm"
                  >
                    {t("translation:cruelty_free")}
                  </Chip>
                )}
              </div>
              <div>
                <Chip
                  variant="flat"
                  color="default"
                  className="text-foreground"
                  key="chip"
                  size="sm"
                >
                  {brand.numberOfProducts}{" "}
                  {brand.numberOfProducts % 10 === 1 &&
                  brand.numberOfProducts % 100 !== 11
                    ? "product"
                    : "products"}
                </Chip>
              </div>
            </div>
          </CardBody>
          <CardFooter className="min-h-11">
            <div className="text-xs text-left text-default-800 line-clamp-1">
              {brand.country && "from " + brand.country.name}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
