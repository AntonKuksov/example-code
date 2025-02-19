import AddEntity from "../../shared/admin/AddEntity.ts";
import AdminPanel from "../../shared/admin/AdminPanel.tsx";

export default function ManageProducts() {
  return (
    <>
      <AdminPanel>
        <div className="flex flex-col gap-3">
          <AddEntity name="brand" redirect={false} />
          <AddEntity name="product-type" redirect={false} />
          <AddEntity name="product" redirect={true} />
        </div>
      </AdminPanel>
    </>
  );
}
