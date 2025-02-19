import { Problem } from "../model/Problem.ts";
import { getEntities } from "./general.ts";

const name = "problems";

export async function getProblems() {
  return getEntities<Problem>(name);
}
