import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@heroui/react";
import { useState } from "react";
import { deleteEntity } from "../../../services/general.ts";

export default function RemoveModal(
  disclosure: any,
  name: string,
  toRemove: any
) {
  const [error, setError] = useState("");

  async function remove() {
    deleteEntity(name, toRemove.id)
      .then(() => (location.href = `/${name}s`))
      .catch(err => {
        setError(
          error +
            ` Failed to merge entities: ${err.response.status}, ${err.response.data.message}`
        );
      });
  }

  return (
    <>
      <Modal
        isOpen={disclosure.isOpen}
        onOpenChange={disclosure.onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Remove {toRemove.name}
              </ModalHeader>
              <ModalBody>
                Remove {toRemove.name} and all it's data forever?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={remove}>
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
