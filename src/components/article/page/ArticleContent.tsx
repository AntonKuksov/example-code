import { useTranslation } from "react-i18next";
import { Article } from "../../../model/Article.ts";
import ArticleSectionView from "./ArticleSectionView.tsx";

export default function ArticleContent(article: Article) {
  const [t] = useTranslation();

  return (
    <article key={article.slug}>
      <title>{t(article?.title.id.toString())}</title>
      <meta name="description" content={t(article?.summary.id.toString())} />
      <meta
        name="keywords"
        content={article?.tags?.map(tag => tag.name).join(", ")}
      />
      <link rel="canonical" href="https://example.com/seo-guide" />

      {article.sections?.length > 0 &&
        article.sections
          ?.sort(section => section.num)
          .map(section => <ArticleSectionView {...section} />)}
    </article>
  );
}
