import { useTranslation } from "react-i18next";
import TextPanel from "../../components/shared/TextPanel.tsx";
import SmallSearch from "../../layout/header/SmallSearch.tsx";

export default function Welcome() {
  const [t] = useTranslation();
  const header = t("translation:welcome");
  const text = t("translation:welcome_subtitle");
  return (
    <div className="welcome_screen">
      <div className="welcome_text">
        <TextPanel
          header={header}
          text={text}
          alignHeader={"left"}
          alignText={"left"}
        />
        <div className="welcome_search">
          <SmallSearch />
        </div>
      </div>
      <div className="welcome_image">
        <img
          src="womenAIlight.jpg"
          alt="Woman reading the ingredients of cosmetics"
          className="rounded-large object-cover"
        />
      </div>
    </div>
  );
}
