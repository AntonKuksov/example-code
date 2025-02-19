import { Button, useDisclosure } from "@heroui/react";
import ManageCard from "./ManageCard.tsx";
import RemoveModal from "./RemoveModal.tsx";

export default function RemoveEntity(props: { name: string; entity: any }) {
  const { name, entity } = props;

  const removeModal = useDisclosure();

  const body = (
    <>
      <span>Remove this {name}?</span>
      <Button color="danger" onPress={removeModal.onOpen}>
        Submit
      </Button>
    </>
  );

  const modal = RemoveModal(removeModal, name, entity);

  return ManageCard("Remove", body, modal, "", "");
}
