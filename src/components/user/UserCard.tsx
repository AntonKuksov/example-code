import { User as UserComponent } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { User } from "../../model/User.ts";

export default function UserCard({ user }: { user: User }) {
  const navigate = useNavigate();
  return (
    <>
      <UserComponent
        onClick={() => navigate("/profile")}
        avatarProps={{ radius: "lg", src: user.avatar }}
        description={user.email}
        name={user.username}
      >
        {user.email}
      </UserComponent>
    </>
  );
}
