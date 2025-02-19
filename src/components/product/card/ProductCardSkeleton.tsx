import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Skeleton
} from "@heroui/react";

export default function ProductCardSkeleton(id: number) {
  return (
    <div key={"card-" + id}>
      <Link
        className="flex-grow-0 flex-shrink-0 basis-auto w-[22rem] h-60 p-4"
        href={`/product?id=${id}`}
      >
        <Card
          className="min-w-full min-h-full px-2"
          key={id}
          isHoverable
          isPressable
        >
          <CardHeader
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="flex flex-row min-h-20 gap-6"
          >
            <Skeleton className="rounded-2xl">
              <Image
                width="80"
                alt="Product Image"
                className="max-h-14 max-w-14"
              />
            </Skeleton>
            <div>
              <div className="text-xs text-left line-clamp-1 mb-1">
                <Skeleton className="rounded-lg">
                  What is the name of this product?
                </Skeleton>
              </div>
              <div className="text-xs text-default-600 text-left line-clamp-1">
                <Skeleton className="rounded-lg">Brand?</Skeleton>
              </div>
            </div>
          </CardHeader>

          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0"
          >
            <Skeleton className="rounded-lg">
              <div className="text-sm text-left">
                <p>I would like to talk more about this product</p>
                <p>I would like to talk more about this product</p>
              </div>
            </Skeleton>
          </CardBody>
          <Divider />

          <CardFooter className="flex flex-row flex-wrap p-2 gap-y-3 justify-between min-h-11">
            <Skeleton className="rounded-lg">
              <div className="text-xs text-left text-default-800 line-clamp-1">
                What is category?
              </div>
            </Skeleton>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
