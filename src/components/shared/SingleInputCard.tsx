import { Button, Input } from "@heroui/react";
import ManageCard from "./admin/ManageCard.tsx";

export default function SingleInputCard(
  name: string,
  successMessage: string,
  errorMessage: string,
  onClick: any,
  value: string,
  onChange: any
) {
  return ManageCard(
    `Add new ${name}`,
    <>
      <Input
        type="text"
        placeholder={`Enter ${name}`}
        className="max-w-80"
        value={value}
        onChange={onChange}
      />
      <Button className="bg-default-200" onPress={onClick}>
        Add
      </Button>
    </>,
    [],
    successMessage,
    errorMessage
  );
}
