import axios from "axios";
import { Entity, EntityWithName, Filter } from "../model/EntityWithName.ts";
import { Page } from "../model/Page.ts";
import { header } from "./header.ts";
import { PageableResponse } from "./model/PageableResponse.ts";

const base = "api/";

export async function getMostPopularEntities(name: string, num = 5) {
  const response = await axios.get(base + name + `/some/${num}`);
  return response.data;
}

export async function getEntity<T extends Entity>(name: string, id: string) {
  const response = await axios.get(base + name + `/${id}`);
  return response.data as T;
}

export async function getEntities<T extends Entity>(name: string) {
  const response = await axios.get(base + name);
  return response.data.content as T[];
}

export async function addEntity(name: string, entity: Partial<EntityWithName>) {
  const response = await axios.post(base + name, entity, header);
  return response.data as EntityWithName;
}

export async function updateEntity<T extends Entity>(
  name: string,
  entity: Partial<T>
) {
  return (await axios.put(base + name, entity, header)) as T;
}

export async function deleteEntity(name: string, id: any) {
  return await axios.delete(base + name + "/" + id);
}

export async function getPagedEntities(
  name: string,
  filter: Partial<Filter>,
  page: Partial<Page>
) {
  page.currentPage = (page.currentPage ?? 1 > 0) ? page.currentPage : 1;
  const response = await axios.post(
    base +
      `${name}/filter?page=${page.currentPage! - 1}&size=${page.itemsPerPage}`,
    { filter },
    header
  );
  return response.data as PageableResponse;
}
