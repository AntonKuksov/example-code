import { Image } from "@heroui/react";
import { useTranslation } from "react-i18next";
import TextPanel from "../components/shared/TextPanel.tsx";

export default function About() {
  const [t] = useTranslation();
  const text = {
    about: {
      header: t("translation:about_title"),
      content: t("translation:about_us")
    },
    mission: {
      header: t("translation:mission_title"),
      content: t("translation:mission")
    },
    vision: {
      header: t("translation:vision_title"),
      content: t("translation:vision")
    },
    team: t("translation:ourteam_title"),
    anzelika_speech: t("translation:anzelika_speech"),
    ksenia_speech: t("translation:ksenia_speech"),
    anton_speech: t("translation:anton_speech")
  };
  return (
    <div className="max-w-3xl">
      <TextPanel
        header={<div className="text-primary-700">{text.about.header}</div>}
        alignHeader={"center"}
        alignText={"left"}
        text={text.about.content}
      />
      <TextPanel
        header={<div className="text-primary-700">{text.mission.header}</div>}
        alignHeader={"center"}
        alignText={"left"}
        text={text.mission.content}
      />
      <TextPanel
        header={<div className="text-primary-700">{text.vision.header}</div>}
        alignHeader={"center"}
        alignText={"left"}
        text={text.vision.content}
      />
      <TextPanel header={<div className="text-primary-700">{text.team}</div>} />
      <div className="flex flex-row gap-9">
        <Image
          alt="Photo of person"
          src="https://media.licdn.com/dms/image/v2/D4D03AQGH5RmjJ2IXNg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1678095338065?e=1743638400&v=beta&t=ipzweOROUTiJQWpAWtHp_eIODGWD05T0xug9aDNZHCo"
          className="max-w-32 mt-2 border-1"
        />
        <TextPanel
          alignHeader={"center"}
          alignText={"left"}
          text={text.anzelika_speech}
        />
      </div>
      <div className="flex flex-row gap-9">
        <Image
          alt="Photo of person"
          src="/ksenja.jpg"
          className="max-w-32 mt-2 border-1"
        />
        <TextPanel
          alignHeader={"center"}
          alignText={"left"}
          text={text.ksenia_speech}
        />
      </div>
      <div className="flex flex-row gap-9">
        <Image
          alt="Photo of person"
          src="https://media.licdn.com/dms/image/v2/D4D03AQET1TKY1hGqmg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720436070615?e=2147483647&v=beta&t=yk0WRfIWD2rliGoTxo8DjMQwVhJkhrYjMuVYmMEIy6s"
          className="max-w-32 mt-2 border-1"
        />
        <TextPanel
          alignHeader={"center"}
          alignText={"left"}
          text={text.anton_speech}
        />
      </div>
    </div>
  );
}
