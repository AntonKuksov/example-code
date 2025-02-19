import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure
} from "@heroui/react";
import { useState } from "react";
import { Ingredient } from "../../../../model/Ingredient.ts";
import { mergeIngredients } from "../../../../services/ingredient.ts";
import Message from "../../../shared/Message.tsx";

export interface MergeIngredientsModalProps {
  disclosure: any;
  toMerge: Ingredient[];
}

export default function MergeIngredientsModal({
  disclosure,
  toMerge
}: MergeIngredientsModalProps) {
  const [mergedEntity, setMergedEntity] = useState<Ingredient>();
  const [error, setError] = useState("");
  const [willStay, setWillStay] = useState(toMerge[0]?.id!.toString());

  const successModal = useDisclosure();

  async function merge() {
    toMerge.forEach(i => mergeIngredient(i.id!.toString()));
    if (!error) successModal.onOpen();
  }

  function mergeIngredient(willLeave: string) {
    if (willStay != willLeave) {
      mergeIngredients(willStay, willLeave)
        .then(result => {
          setMergedEntity(result.data as Ingredient);
          setError("");
          successModal.onOpen();
        })
        .catch(err => {
          setError(
            `Failed to merge entities: ${err.response.status}, ${err.response.data.message}`
          );
          setMergedEntity(undefined);
        });
    }
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
                Merging {toMerge.map(i => i.name).join(" and ")}
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  label="Which one will stay?"
                  color="primary"
                  value={willStay}
                  onValueChange={setWillStay}
                >
                  {toMerge.map(i => (
                    <Radio key={i.id!.toString()} value={i.id!.toString()}>
                      {i.name}
                    </Radio>
                  ))}
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={merge}>
                  Merge
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
                Merged {toMerge.map(i => i.name).join(" and ")}
              </ModalHeader>
              <ModalBody>
                <Message message={error} color="danger" />
                New ingredient:{" "}
                <pre>{JSON.stringify(mergedEntity, null, 2)}</pre>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() =>
                    (location.href = `/ingredient?id=${mergedEntity?.id}`)
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
