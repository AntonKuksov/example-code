import {
  Button,
  Chip,
  Input,
  Select,
  SelectedItems,
  SelectItem,
  Textarea
} from "@heroui/react";
import { useEffect, useState } from "react";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Brand } from "../../../model/Brand.ts";
import { Problem } from "../../../model/Problem.ts";
import {
  Product,
  ProductAlternativeName,
  ProductCategory
} from "../../../model/Product.ts";
import { getBrands } from "../../../services/brand.ts";
import { updateEntity } from "../../../services/general.ts";
import { getProblems } from "../../../services/problem.ts";
import { getCategories } from "../../../services/productCategory.ts";
import ManageCard from "../../shared/admin/ManageCard.tsx";
import Message from "../../shared/Message.tsx";

export default function UpdateProduct({ product }: { product: Product }) {
  const [brands, setBrands] = useState<Brand[]>([]);

  const [types, setTypes] = useState<ProductCategory[]>([]);
  const [selectedType, setSelectedType] = useState(
    product.category?.id?.toString() ?? "-2"
  );

  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>(
    product.problems?.map(p => p.id.toString())
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then(setTypes);
    getProblems().then(setProblems);
    getBrands().then(setBrands);
  }, []);

  function update() {
    product.problems = problems.filter(p =>
      selectedProblems.includes(p.id.toString())
    );
    if (selectedType != null)
      product.category = types.find(t => t.id.toString() == selectedType)!;
    setMessage("");
    setError("");
    setLoading(true);
    updateEntity("product", product)
      .then(data => {
        setMessage("card updated");
        product = data;
      })
      .catch(err =>
        setError(
          `Failed to update product: ${err.response.status}, ${err.response.data.message}`
        )
      )
      .finally(() => setLoading(false));
  }

  const body = (
    <>
      <div className="flex flex-col gap-3">
        <div className="max-w-80">
          <Message message={message} color="success" />
          <Message message={error} color="danger" />
        </div>
        <Input
          isDisabled
          type="text"
          label="ID"
          defaultValue={product.id?.toString() ?? "0"}
          className="max-w-80"
        />

        <Input
          type="text"
          label="EAN"
          defaultValue={product.ean}
          onChange={e => (product.ean = e.target.value)}
          className="max-w-80"
        />
        <Input
          type="text"
          label="MPN"
          defaultValue={product.mpn}
          onChange={e => (product.mpn = e.target.value)}
          className="max-w-80"
        />

        <Textarea
          label="Alternative names (comma separated)"
          defaultValue={product.alternativeNames.map(i => i.name).join(", ")}
          onChange={e =>
            (product.alternativeNames = e.target.value.split(", ").map(
              i =>
                ({
                  id: 0,
                  name: i
                }) as ProductAlternativeName
            ))
          }
          className="max-w-80"
        />

        <Select
          isLoading={problems.length == 0}
          aria-label="select-problems"
          selectionMode="multiple"
          placeholder="Select problems"
          selectedKeys={selectedProblems}
          renderValue={(items: SelectedItems<string[]>) => (
            <div className="flex flex-wrap gap-2 p-2">
              {items.map(item => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          )}
          isMultiline
          className="max-w-80"
          onChange={e =>
            setSelectedProblems(e.target.value.split(",").map(i => i.trim()))
          }
        >
          {problems.map(type => (
            <SelectItem key={type.id ?? 0}>{type.name}</SelectItem>
          ))}
        </Select>

        <Select
          isLoading={types.length == 0}
          aria-label="select-types"
          placeholder="Select type"
          selectedKeys={selectedType}
          renderValue={(items: SelectedItems<string[]>) => (
            <div className="flex flex-wrap gap-2 p-2">
              {items.map(item => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          )}
          isMultiline
          className="max-w-80"
          onChange={e => setSelectedType(e.target.value.trim())}
        >
          {types.map(type => (
            <SelectItem key={type.id ?? 0}>{type.name}</SelectItem>
          ))}
        </Select>

        <Select
          isLoading={brands.length == 0}
          aria-label="select-brand"
          placeholder="Select brand"
          selectedKeys={product.brand?.id.toString()}
          renderValue={(items: SelectedItems<string[]>) => (
            <div className="flex flex-wrap gap-2 p-2">
              {items.map(item => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          )}
          isMultiline
          className="max-w-80"
          onChange={e =>
            (product.brand = brands.find(
              b => b.id.toString() == e.target.value.trim()
            )!)
          }
        >
          {brands.map(brand => (
            <SelectItem key={brand.id ?? 0}>{brand.name}</SelectItem>
          ))}
        </Select>

        <div className="flex flex-row gap-3 items-center">
          <TriStateCheckbox
            value={product.vegan}
            variant="filled"
            onChange={e => (product.vegan = e.value ?? undefined)}
          />
          Vegan
        </div>
        <div style={{ alignSelf: "end" }}>
          <Button
            isLoading={loading}
            className="bg-default-200 "
            onPress={update}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );

  return ManageCard("Update card", body, <></>, "", "");
}
