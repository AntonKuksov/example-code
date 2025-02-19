import { ArticleFilter } from "../model/Article.ts";
import { Page } from "../model/Page.ts";
import { getPagedEntities } from "./general.ts";

const name = "articles";

export async function getPagedArticles(
  filter: Partial<ArticleFilter>,
  page: Partial<Page>
) {
  return getPagedEntities(name, filter, page);
}
