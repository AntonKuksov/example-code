import { Button, useDisclosure } from "@heroui/react";
import AddEntity from "../../../shared/admin/AddEntity.ts";
import AdminPanel from "../../../shared/admin/AdminPanel.tsx";
import AssignToParentModal from "../modal/AssignToParentModal.tsx";
import AssignToTypeModal from "../modal/AssignToTypeModal.tsx";
import MergeIngredientsModal from "../modal/MergeIngredientsModal.tsx";

export default function ManageIngredients({ selectedIngredients }: any) {
  const mergeModal = useDisclosure();
  const assignToTypeModal = useDisclosure();
  const assignToParentModal = useDisclosure();

  const isDisabled = selectedIngredients?.length == 0;

  return (
    <>
      <AdminPanel>
        <div className="flex flex-col gap-3">
          <Button
            className="bg-default-200"
            isDisabled={isDisabled}
            onPress={mergeModal.onOpen}
          >
            Merge
          </Button>
          <MergeIngredientsModal
            disclosure={mergeModal}
            toMerge={selectedIngredients}
          />

          <Button
            className="bg-default-200"
            isDisabled={isDisabled}
            onPress={assignToTypeModal.onOpen}
          >
            Assign to type
          </Button>
          <AssignToTypeModal
            disclosure={assignToTypeModal}
            toAdd={selectedIngredients}
          />

          <Button
            className="bg-default-200"
            isDisabled={isDisabled}
            onPress={assignToParentModal.onOpen}
          >
            Assign to parent
          </Button>
          <AssignToParentModal
            disclosure={assignToParentModal}
            toAdd={selectedIngredients}
          />
        </div>

        <div className="flex flex-col gap-3">
          <AddEntity name="ingredient-type" redirect={false} />
          <AddEntity name="composition" redirect={false} />
          <AddEntity name="ingredient" redirect={true} />
        </div>
      </AdminPanel>
    </>
  );
}
