import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@heroui/react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en_US", name: "ENG" },
  { code: "et_EE", name: "EST" },
  { code: "ru_RU", name: "RUS" }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <>
      <Dropdown
        classNames={{
          content: "min-w-10"
        }}
      >
        <DropdownTrigger>
          <Button variant="flat" className="min-w-10">
            {languages.find(l => l.code == i18n.language)?.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Choose language"
          onAction={key => i18n.changeLanguage(key.toString())}
        >
          {languages
            .filter(l => l.code != i18n.language)
            .map(l => (
              <DropdownItem key={l.code}>{l.name}</DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
