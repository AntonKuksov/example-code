import { EntityWithName, Filter } from "./EntityWithName.ts";
import { Translation } from "./Product.ts";
import { User } from "./User.ts";

export interface ArticleTag extends EntityWithName {}

export interface ArticleSection extends EntityWithName {
  title: Translation;
  content: Translation;
  article: Article;
  num: number;
}

export interface Article extends EntityWithName {
  title: Translation;
  summary: Translation;
  slug: string;
  author: User;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  isHidden: boolean;
  tags: ArticleTag[];
  sections: ArticleSection[];
  popularity: number;
}

export interface ArticleFilter extends Filter {}
