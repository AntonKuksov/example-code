import {
  Checkbox,
  Chip,
  Input,
  Select,
  SelectedItems,
  SelectItem
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { Key, Suspense } from "react";
import { MultiSelect } from "primereact/multiselect";
import { FilterField } from "../../model/FilterField.ts";

export default function FilterFieldComponent(
  filter: FilterField,
  onChange: any
) {
  return (
    <Suspense key={"field-" + filter.name} fallback={<div>Loading...</div>}>
      {GetField(filter, onChange)}
    </Suspense>
  );
}

export function GetField(filter: FilterField, onChange: any) {
  const [t] = useTranslation();

  switch (filter.type) {
    case "checkbox":
      return (
        <Checkbox
          defaultSelected={filter.value}
          key={"checkbox-" + filter.name}
          onValueChange={e => onChange(filter.name, e)}
        >
          {t("translation:" + filter.label)}
        </Checkbox>
      );
    case "multiple-select-filter":
      return (
        <MultiSelect
          value={filter.value}
          key={"multiselect-" + filter.name}
          onChange={e => onChange(filter.name, e.value)}
          options={filter.options}
          optionLabel={"name"}
          display="chip"
          filter
          placeholder={t("translation:" + (filter.placeholder ?? ""))}
        />
      );
    case "multiple-select":
      return (
        <Select
          showScrollIndicators={false}
          scrollShadowProps={{
            isEnabled: false
          }}
          key={"select-" + filter.name}
          placeholder={t("translation:" + (filter.placeholder ?? ""))}
          size="lg"
          selectionMode="multiple"
          aria-label="select"
          className="max-w-60"
          isMultiline
          selectedKeys={filter.options?.length ? filter.value : []}
          onChange={e => onChange(filter.name, e.target.value.split(","))}
          renderValue={(items: SelectedItems<string[]>) => (
            <div className="flex flex-wrap gap-2">
              {items.map(item => (
                <Chip
                  key={"chip-" + item.textValue}
                  onClose={() =>
                    onChange(
                      filter.name,
                      filter.value.filter(
                        (i: Key | undefined) => i !== item.key
                      )
                    )
                  }
                >
                  {filter.options!.find(t => t.name == item.textValue)?.name}
                </Chip>
              ))}
            </div>
          )}
        >
          {filter.options!.map(option => (
            <SelectItem key={option.id.toString()}>{option.name}</SelectItem>
          ))}
        </Select>
      );
    case "input":
      return (
        <Input
          type="search"
          key={"input-" + filter.name}
          placeholder={t("translation:" + (filter.placeholder ?? ""))}
          labelPlacement="inside"
          className="max-w-60"
          size="lg"
          value={filter.value}
          onChange={e => onChange(filter.name, e.target.value)}
          startContent={
            <CiSearch className="text-2xl text-default pointer-events-none flex-shrink-0" />
          }
        />
      );
    default:
      return <></>;
  }
}
