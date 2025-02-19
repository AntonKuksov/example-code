import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Skeleton
} from "@heroui/react";

export default function IngredientCardSkeleton(id: number) {
  return (
    <div key={"link-" + id}>
      <div className="flex-grow-0 flex-shrink-0 basis-auto w-[22rem] h-56 p-4">
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
            <Skeleton className="rounded-lg">
              <div className="text-sm text-left">
                <p>What is ingredient name?</p>
                <p>...and middle name?</p>
              </div>
            </Skeleton>
          </CardHeader>
          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0 flex flex-col justify-between"
          >
            <div className="text-left text-xs line-clamp-2">
              <Skeleton className="rounded-lg">
                <p>I would like to talk more about this ingredient</p>
                <p>I would like to talk more about this ingredient</p>
              </Skeleton>
            </div>
            <div className="flex flex-row gap-6 justify-between pb-3">
              <Skeleton className="rounded-2xl">
                <Chip size="sm">Is it good?</Chip>
              </Skeleton>
              <Skeleton className="rounded-2xl">
                <Chip size="sm">Is it popular?</Chip>
              </Skeleton>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="min-h-11">
            <Skeleton className="rounded-lg">
              <div className="text-xs text-left text-default-800 line-clamp-1">
                What it does? What? What?
              </div>
            </Skeleton>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
