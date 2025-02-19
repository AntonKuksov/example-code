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
import { useState } from "react";
import { Ingredient } from "../../../../model/Ingredient.ts";
import {
  copyIngredient,
  deleteIngredient
} from "../../../../services/ingredient.ts";
import Message from "../../../shared/Message.tsx";

export interface SplitIngredientsModalProps {
  disclosure: any;
  toSplit: string[];
  ingredient: Ingredient;
}

export default function SplitIngredientsModal({
  disclosure,
  toSplit,
  ingredient
}: SplitIngredientsModalProps) {
  const [splitEntities, setSplitEntities] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] =
    useState<string[]>(toSplit);
  const [error, setError] = useState("");

  const successModal = useDisclosure();

  async function split() {
    const copyPromises = selectedIngredients.map(i => splitIngredient(i));
    await Promise.all(copyPromises)
      .then(() => {
        if (!error) {
          deleteIngredient(ingredient.id)
            .then(successModal.onOpen)
            .catch(err => {
              setSplitEntities([]);
              setError(
                error +
                  ` Failed to split entity: ${err.response.status}, ${err.response.data.message}`
              );
              successModal.onOpen();
            });
        } else successModal.onOpen();
      })
      .catch(successModal.onOpen);
  }

  function splitIngredient(newName: string) {
    setError("");

    return copyIngredient(ingredient.id, newName)
      .then(result => {
        setSplitEntities(prevSplitEntities => [...prevSplitEntities, result]);
        setError("");
      })
      .catch(err => {
        setError(
          `Failed to split entity: ${err.response.status}, ${err.response.data.message}`
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
                Splitting {toSplit.join(" and ")}
              </ModalHeader>
              <ModalBody>
                Select ingredients to be created:
                <CheckboxGroup
                  className="m-8"
                  color="primary"
                  value={selectedIngredients}
                  onValueChange={setSelectedIngredients}
                >
                  {toSplit.map(i => (
                    <Checkbox key={i} value={i}>
                      {i}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                After {ingredient.name} is deleted.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={split}>
                  Split
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
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Split {toSplit.join(" and ")}
              </ModalHeader>
              <ModalBody>
                <Message message={error} color="danger" />
                New ingredients:{" "}
                <pre>{JSON.stringify(splitEntities, null, 2)}</pre>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() =>
                    error
                      ? onClose()
                      : (location.href = `/ingredient?id=${splitEntities[0].id}`)
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
