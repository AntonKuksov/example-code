import { Link } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function SmallList(props: {
  name: string;
  cards: any[];
  lines?: number;
  hasHeader?: boolean;
}) {
  const { name, cards, lines = 1, hasHeader = true } = props;
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(0);

  const calculateVisibleItems = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const itemWidth = containerRef.current.children[0]?.clientWidth ?? 1;
      const itemCount = Math.floor(containerWidth / itemWidth) * lines;
      setVisibleCount(itemCount);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", calculateVisibleItems);
    calculateVisibleItems();
    return () => {
      window.removeEventListener("resize", calculateVisibleItems);
    };
  }, [cards]);

  return (
    <>
      <div className="flex flex-col">
        {hasHeader && (
          <Link style={{ alignSelf: "center" }} href={`/${name}`}>
            <h2 className="font-semibold text-center text-default-800">
              {t(`translation:${name}`)}
            </h2>
          </Link>
        )}
        <div
          key={name + "-cards"}
          className="flex justify-between flex-wrap"
          ref={containerRef}
        >
          {cards.slice(0, visibleCount)}
        </div>
        <Link
          key={name + "explore"}
          style={{ alignSelf: "end" }}
          className="text-primary-700"
          href={`/${name}?` + searchParams.toString()}
          size="lg"
        >
          {t("translation:explore_more")}
        </Link>
      </div>
    </>
  );
}
