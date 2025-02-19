import { useTranslation } from "react-i18next";

export default function NothingFound() {
  const [t] = useTranslation();

  return (
    <h1 className="text-5xl font-semibold text-foreground-100">
      {t("translation:nothing_found")}
    </h1>
  );
}
