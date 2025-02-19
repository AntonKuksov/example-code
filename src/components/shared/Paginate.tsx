import { Pagination, Select, SelectItem } from "@heroui/react";
import { Page } from "../../model/Page.ts";

const perPage = ["12", "24", "48", "96"];

export default function Paginate(page: Page, setPage: any) {
  return (
    <>
      <div className="flex flex-wrap gap-6 items-center justify-around p-4">
        {page.totalPages > 0 && (
          <Pagination
            siblings={window.innerWidth > 400 ? 2 : 1}
            total={page.totalPages}
            defaultValue={page.currentPage}
            page={page.currentPage}
            onChange={e => setPage((p: Page) => ({ ...p, currentPage: e }))}
            size="lg"
            classNames={{
              cursor: "bg-primary-100"
            }}
          />
        )}
        <div className="flex flex-row items-center gap-3">
          <span>Items per page:</span>
          <Select
            selectedKeys={[page.itemsPerPage]}
            className="w-20"
            onChange={e =>
              setPage((p: Page) => ({ ...p, itemsPerPage: e.target.value }))
            }
          >
            {perPage.map(n => (
              <SelectItem key={n} textValue={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
