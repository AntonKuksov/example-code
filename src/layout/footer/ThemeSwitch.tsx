import { SwitchProps, useSwitch, VisuallyHidden } from "@heroui/react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

export default function ThemeSwitch(props: SwitchProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props);

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-10 h-10 mr-0",
            "flex items-center justify-center",
            "rounded-xl bg-primary/20"
          ]
        })}
      >
        {isSelected ? <IoMdMoon /> : <MdSunny />}
      </div>
    </Component>
  );
}
