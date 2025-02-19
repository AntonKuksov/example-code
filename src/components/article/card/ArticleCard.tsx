import { Card, CardBody, CardFooter, CardHeader, Link } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Article } from "../../../model/Article.ts";

export default function ArticleCard(article: Article) {
  const [t] = useTranslation();

  return (
    <div key={"link-" + article.id}>
      <Link
        className="flex-grow-0 flex-shrink-0 basis-auto w-[35rem] h-60 p-4"
        href={`/article?id=${article.id}`}
      >
        <Card
          className="min-w-full min-h-full px-2"
          key={article.id}
          isHoverable
          isPressable
          onPress={() => (location.href = `/article?id=${article.id}`)}
        >
          <CardHeader
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="min-h-16 flex flex-row gap-6 justify-between"
          >
            <div className="text-md text-left line-clamp-1">
              {t(article.title.id.toString())}
            </div>
          </CardHeader>
          <CardBody
            style={{ whiteSpace: "unset", wordBreak: "break-word" }}
            className="py-0 flex flex-col justify-between text-sm"
          >
            {t(article.summary.id.toString())}
          </CardBody>
          <CardFooter className="min-h-11"></CardFooter>
        </Card>
      </Link>
    </div>
  );
}
