import { atomWithStorage } from "jotai/utils";
import { User } from "./model/User.ts";

export const tokenAtom = atomWithStorage("token", "");
export const userAtom = atomWithStorage<User | undefined>("user", undefined);