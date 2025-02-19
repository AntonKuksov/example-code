import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Article } from "../../../model/Article.ts";
import { Page } from "../../../model/Page.ts";
import { getPagedArticles } from "../../../services/article.ts";
import Paginate from "../../shared/Paginate.tsx";
import TextPanel from "../../shared/TextPanel.tsx";
import ArticleCard from "../card/ArticleCard.tsx";

export default function Articles() {
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();

  const [pagination, setPagination] = useState<Page>({
    currentPage: parseInt(searchParams.get("page") ?? "1"),
    itemsPerPage: searchParams.get("itemsPerPage") ?? "12",
    totalPages: 100
  });

  const paginateElement = useMemo(
    () => Paginate(pagination, setPagination),
    [pagination]
  );

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getPagedArticles({}, pagination).then(data => setArticles(data.content));
  }, [pagination.currentPage, pagination.itemsPerPage]);

  const header = t("translation:learn");
  const content = t("translation:learn_description");

  return (
    <>
      <div className="w-[80%]">
        <TextPanel header={header} text={content} alignText={"center"} />
      </div>
      <div
        key="show-articles"
        className="flex flex-wrap flex-row items-center justify-center my-4"
      >
        {articles.map(article => (
          <div
            key={"div-checkbox-" + article.id}
            className="flex flex-col justify-around items-center"
          >
            <ArticleCard {...article} />
          </div>
        ))}
      </div>

      {paginateElement}
    </>
  );
}
