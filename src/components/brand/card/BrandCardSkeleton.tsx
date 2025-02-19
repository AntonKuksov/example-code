import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton
} from "@heroui/react";

export default function BrandCardSkeleton(id: number) {
  return (
    <div key={"link-" + id}>
      <div className="flex-grow-0 flex-shrink-0 basis-auto w-[22rem] h-60 p-4">
        <Card
          className="min-w-full min-h-full px-2"
          key={id}
          isHoverable
          isPressable
        >
          <CardHeader
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="min-h-16 flex flex-row gap-6 justify-between"
          >
            <Skeleton className="w-3/5 rounded-lg">
              <div className="text-sm text-left line-clamp-1">
                Which brand could this be?
              </div>
            </Skeleton>
          </CardHeader>
          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0 flex flex-col justify-between"
          >
            <div className="flex flex-row gap-6 justify-between pb-3">
              <Skeleton className="rounded-2xl">
                <Chip size="sm">First chip</Chip>
              </Skeleton>
              <Skeleton className="rounded-2xl">
                <Chip size="sm">Second chip</Chip>
              </Skeleton>
            </div>
          </CardBody>
          <CardFooter className="min-h-11">
            <Skeleton className="rounded-lg">
              <div className="text-xs text-left text-default-800 line-clamp-1">
                Where are they from?
              </div>
            </Skeleton>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
