import { Card, CardBody, CardHeader } from "@heroui/react";
import { PropsWithChildren } from "react";
import AdminOnly from "./AdminOnly.tsx";

export default function AdminPanel(props: PropsWithChildren) {
  return (
    <AdminOnly>
      <Card
        isBlurred
        className="p-4 flex items-center justify-around mx-auto my-12 w-fit"
      >
        <CardHeader className="font-semibold text-default-800 flex">
          <h5>Admin panel</h5>
        </CardHeader>
        <CardBody className="flex gap-5 flex-row flex-wrap justify-around items-center">
          {props.children}
        </CardBody>
      </Card>
    </AdminOnly>
  );
}
