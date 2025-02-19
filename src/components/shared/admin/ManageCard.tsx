import { Alert, Card, CardBody, CardHeader } from "@heroui/react";

export default function ManageCard(
  header: string,
  body: any,
  modal: any,
  successMessage: string,
  errorMessage: string
) {
  return (
    <>
      <Card className="p-2">
        {successMessage && (
          <Alert color="success" title={successMessage} isClosable />
        )}
        {errorMessage && (
          <Alert color="danger" title={errorMessage} isClosable />
        )}

        <CardHeader className="font-semibold text-default-800">
          <h5>{header}</h5>
        </CardHeader>
        <CardBody className="flex flex-row items-center justify-between gap-3">
          {body}
        </CardBody>
      </Card>
      {modal}
    </>
  );
}
