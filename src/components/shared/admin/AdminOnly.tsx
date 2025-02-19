import { PropsWithChildren } from "react";
import { useAtomValue } from "jotai/index";
import { userAtom } from "../../../atoms.ts";
import { hasAdminRole, hasModeratorRole } from "../../../model/User.ts";

export default function AdminOnly(props: PropsWithChildren) {
  const user = useAtomValue(userAtom);

  return (hasAdminRole(user) || hasModeratorRole(user)) && props.children;
}
