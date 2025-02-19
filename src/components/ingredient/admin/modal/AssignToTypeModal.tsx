import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Ingredient, IngredientType } from "../../../../model/Ingredient.ts";
import { updateIngredient } from "../../../../services/ingredient.ts";
import { getIngredientTypes } from "../../../../services/ingredientType.ts";
import Message from "../../../shared/Message.tsx";

export interface AssignToTypeModalProps {
  disclosure: any;
  toAdd: Ingredient[];
}

export default function AssignToTypeModal({
  disclosure,
  toAdd
}: AssignToTypeModalProps) {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<IngredientType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getIngredientTypes().then(setTypes);
  }, []);

  const successModal = useDisclosure();

  async function assign() {
    toAdd.forEach(i => assignIngredient(i));
    if (!error) successModal.onOpen();
  }

  function assignIngredient(ingredient: Ingredient) {
    ingredient.types.push(
      ...types.filter(t => selectedTypes.includes(t.id.toString()))
    );

    setMessage("");
    setError("");
    setLoading(true);
    updateIngredient(ingredient)
      .then(() => setMessage("Ingredient updated"))
      .catch(err =>
        setError(
          `Failed to update ingredient: ${err.response.status}, ${err.response.data.message}`
        )
      )
      .finally(() => setLoading(false));
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
                Merging {toAdd.map(i => i.name).join(" and ")}
              </ModalHeader>
              <ModalBody>
                <CheckboxGroup
                  label="Select types"
                  color="primary"
                  value={selectedTypes}
                  onValueChange={setSelectedTypes}
                >
                  {types.map(i => (
                    <Checkbox key={i.id.toString()} value={i.id.toString()}>
                      {i.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
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
                Added type to{" "}
              </ModalHeader>
              <ModalBody>
                <Message message={message} color="success" />
                <Message message={error} color="danger" />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => (location.href = "/ingredients")}
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
