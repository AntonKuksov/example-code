import { EntityWithName } from "./EntityWithName.ts";

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  roles: EntityWithName[];
}

export function hasModeratorRole(user: User | undefined): boolean {
  return user ? user.roles.map(r => r.name).includes("MODERATOR") : false;
}

export function hasAdminRole(user: User | undefined): boolean {
  return user ? user.roles.map(r => r.name).includes("ADMIN") : false;
}
