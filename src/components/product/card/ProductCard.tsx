import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Product } from "../../../model/Product.ts";

export default function ProductCard(product: Product) {
  const [t] = useTranslation();
  return (
    <div key={"card-" + product.id}>
      <Link
        className="flex-grow-0 flex-shrink-0 basis-auto w-[22rem] h-60 p-4"
        href={`/product?id=${product.id}`}
      >
        <Card
          className="min-w-full min-h-full px-2"
          key={product.id}
          isHoverable
          isPressable
          onPress={() => (location.href = `/product?id=${product.id}`)}
        >
          <CardHeader
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="flex flex-row min-h-20 gap-6"
          >
            <Image
              width="80"
              alt="Product Image"
              src={product.images.sort((a, b) => a.num - b.num)[0]?.url}
              className="max-h-14 max-w-14"
            />
            <div>
              <div className="text-sm text-left line-clamp-1">
                {t(product.name?.id?.toString())}
              </div>
              <div className="text-xs text-default-600 text-left line-clamp-1">
                {product.brand?.name.trim()}
              </div>
            </div>
          </CardHeader>

          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0"
          >
            {product?.shortDescription ? (
              <div className="text-default-800 text-left text-xs line-clamp-3">
                {t(product.shortDescription?.id?.toString())}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {product.ingredientTypes.map(type => (
                  <Chip
                    variant="flat"
                    className="text-success-900"
                    color="success"
                    key={"chip-" + type.name}
                    size="sm"
                  >
                    {type.name}
                  </Chip>
                ))}
              </div>
            )}
          </CardBody>
          <Divider />

          <CardFooter className="flex flex-row flex-wrap p-2 gap-y-3 justify-between min-h-11">
            <div className="text-xs text-left text-default-800 line-clamp-1">
              {product.category?.name}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
