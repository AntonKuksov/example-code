import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";

interface BreadcrumbNavProps {
  crumbs: any[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ crumbs }) => {
  const [t] = useTranslation();
  const capitalizeFirstLetter = (val: string): string =>
    val.charAt(0).toUpperCase() + val.slice(1);
  const viewfirst = (crumbs: any) => {
    switch (crumbs[0]) {
      case "products":
        return (
          <BreadcrumbItem>
            <Link to={"/products"}>{t("translation:products")}</Link>
          </BreadcrumbItem>
        );
      case "ingredients":
        return (
          <BreadcrumbItem>
            <Link to={"/ingredients"}>{t("translation:ingredients")}</Link>
          </BreadcrumbItem>
        );
      default:
        return "foo";
    }
  };
  const viewsecond = (crumbs: any) => {
    switch (crumbs[0]) {
      case "products":
        return (
          <BreadcrumbItem>
            <Link to={"/products?types=" + crumbs[1].category.id}>
              {crumbs[1].category.name}
            </Link>
          </BreadcrumbItem>
        );
      case "ingredients":
        return (
          <BreadcrumbItem>
            <Link to={"/ingredients"}>
              {capitalizeFirstLetter(crumbs[1].origin)}
            </Link>
          </BreadcrumbItem>
        );
      default:
        return "foo";
    }
  };

  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link to={"/"}>
          <img src={"/koostis_icon.svg"} width={16} height={16} alt={""} />
        </Link>
      </BreadcrumbItem>
      {viewfirst(crumbs)}
      {viewsecond(crumbs)}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
