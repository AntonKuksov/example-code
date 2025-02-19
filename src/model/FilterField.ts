export interface FilterField {
  type:
    | "checkbox"
    | "multiple-select"
    | "multiple-select-filter"
    | "select"
    | "input"
    | "textarea";
  label: string;
  name: string;
  value: any;
  placeholder?: string;
  options?: any[];
}
