import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "../../../model/Article.ts";
import { getEntity } from "../../../services/general.ts";
import TextPanel from "../../shared/TextPanel.tsx";
import ArticleContent from "./ArticleContent.tsx";

export default function ArticleView() {
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [t] = useTranslation();

  useEffect(() => {
    getEntity<Article>("articles", searchParams.get("id") ?? "1").then(d =>
      setArticle(d)
    );
  }, [searchParams]);

  return (
    <div key={article?.slug} className="max-w-5xl">
      {article && (
        <TextPanel
          header={
            <div className="text-primary-700">
              {t(article?.title.id.toString())}
            </div>
          }
          alignHeader={"center"}
          alignText={"left"}
          text={<ArticleContent {...article} />}
        />
      )}
    </div>
  );
}
