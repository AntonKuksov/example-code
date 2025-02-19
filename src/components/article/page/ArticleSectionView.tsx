import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import { ArticleSection } from "../../../model/Article.ts";

export default function ArticleSectionView(section: ArticleSection) {
  const [t] = useTranslation();
  const sanitizedHTML = DOMPurify.sanitize(t(section.content.id.toString()));

  return (
    <section id={section.name} key={section.name}>
      <h2>
        {section.num}. {t(section.title.id.toString())}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
    </section>
  );
}
