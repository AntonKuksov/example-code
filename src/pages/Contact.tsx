import { useTranslation } from "react-i18next";
import TextPanel from "../components/shared/TextPanel.tsx";

export default function Contact() {
  const [t] = useTranslation();
  const text = {
    header: t("translation:contact"),
    content: t("translation:contact_text"),
    content_b2b: t("translation:contact_b2b")
  };
  return (
    <div className="max-w-3xl mt-6">
      <TextPanel
        header={<div className="text-primary-700">{text.header}</div>}
        alignHeader={"center"}
        alignText={"center"}
        text={text.content}
      />

      <TextPanel
        text={
          <b>
            <a href="mailto:anzelikabykova24@gmail.com">
              anzelikabykova24@gmail.com
            </a>
          </b>
        }
      />
      <br />
      <TextPanel text={text.content_b2b + ":"} />
      <TextPanel
        text={
          <b>
            <a href="mailto:anzelikabykova24@gmail.com">
              anzelikabykova24@gmail.com
            </a>
          </b>
        }
      />
    </div>
  );
}
