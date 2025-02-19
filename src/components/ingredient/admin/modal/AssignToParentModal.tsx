import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Ingredient } from "../../../../model/Ingredient.ts";
import {
  getIngredients,
  updateIngredient
} from "../../../../services/ingredient.ts";
import Message from "../../../shared/Message.tsx";

export interface AssignToParentModalProps {
  disclosure: any;
  toAdd: Ingredient[];
}

export default function AssignToParentModal({
  disclosure,
  toAdd
}: AssignToParentModalProps) {
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState<Ingredient[]>([]);
  const [selectedParent, setSelectedParent] = useState<Ingredient>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getIngredients().then(data => {
      data.sort((a, b) => (a.name > b.name ? 1 : -1));
      setParents(data.filter(i => !toAdd.includes(i)));
    });
  }, []);

  const successModal = useDisclosure();

  async function assign() {
    const promises = toAdd.map(i => assignIngredient(i));
    await Promise.all(promises)
      .then(() => {
        setLoading(false);
        successModal.onOpen();
      })
      .catch(successModal.onOpen);
  }

  function assignIngredient(ingredient: Ingredient) {
    ingredient.parent = selectedParent!;

    setMessage("");
    setError("");
    setLoading(true);
    return updateIngredient(ingredient)
      .then(() => setMessage("Ingredient updated"))
      .catch(err =>
        setError(
          `Failed to update ingredient: ${err.response.status}, ${err.response.data.message}`
        )
      );
  }

  return (
    <>
      <Modal
        isOpen={disclosure.isOpen}
        onOpenChange={disclosure.onOpenChange}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Merging {toAdd.map(i => i.name).join(" and ")}
              </ModalHeader>
              <ModalBody>
                <Dropdown
                  value={selectedParent}
                  onChange={e => setSelectedParent(e.value)}
                  options={parents}
                  optionLabel="name"
                  autoFocus
                  filter
                  placeholder="Select ingredient for parent"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" isLoading={loading} onPress={assign}>
                  Assign
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={successModal.isOpen}
        onOpenChange={successModal.onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Added parent to{" "}
              </ModalHeader>
              <ModalBody>
                <Message message={message} color="success" />
                <Message message={error} color="danger" />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() =>
                    (location.href = `/ingredient?id=${selectedParent?.id}`)
                  }
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
