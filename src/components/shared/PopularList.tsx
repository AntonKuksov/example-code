import { Link } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Entity } from "../../model/EntityWithName.ts";
import { getMostPopularEntities } from "../../services/general.ts";
import SmallList from "./SmallList.tsx";

export default function PopularList<T extends Entity>(props: {
  name: string;
  card: (entity: T) => any;
}) {
  const [t] = useTranslation();
  const { name, card } = props;
  const [entities, setEntities] = useState<T[]>([]);
  useEffect(() => {
    getMostPopularEntities(name).then(data => setEntities(data));
  }, [name]);

  return (
    <div className="flex flex-col">
      <Link style={{ alignSelf: "center" }} href={`/${name}s`}>
        <h2 className="font-semibold text-center text-default-800">
          {t("translation:popular_ingredients")}
        </h2>
      </Link>
      <SmallList
        name={name}
        hasHeader={false}
        cards={entities.map((entity: T) => (
          <div key={name + entity.id}>{card(entity)}</div>
        ))}
      />
    </div>
  );
}
