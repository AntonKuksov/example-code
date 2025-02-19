import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms.ts";
import UserCard from "../../components/user/UserCard.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import SmallSearch from "./SmallSearch.tsx";

type NavLink = {
  link: string;
  display: string;
};

const links: NavLink[] = [
  { link: "/ingredients", display: "translation:ingredients" },
  {
    link: "/products",
    display: "translation:products"
  },
  { link: "/brands", display: "translation:brands" }
];

export default function NavBar() {
  const [t] = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  function getItem(link: NavLink) {
    const isCurrentPage = location.pathname.startsWith(link.link);
    return (
      <NavbarItem
        className="my-1"
        key={"item-" + link.link}
        isActive={isCurrentPage}
      >
        <Link
          href={isCurrentPage ? "" : link.link}
          key={"item-link-" + link.link}
          className={
            isCurrentPage
              ? "text-primary-700 text-xl"
              : "text-default-900 text-xl"
          }
          color={isCurrentPage ? "primary" : "foreground"}
          aria-current="page"
        >
          {t(link.display)}
        </Link>
      </NavbarItem>
    );
  }

  function getMenuItem(link: NavLink) {
    const isCurrentPage = location.pathname.startsWith(link.link);
    return (
      <NavbarMenuItem
        className="my-1 text-default-900 text-center"
        key={"menuitem-" + link.link}
        isActive={isCurrentPage}
      >
        <Link
          href={isCurrentPage ? "" : link.link}
          key={"menuitem-link-" + link.link}
          color={isCurrentPage ? "primary" : "foreground"}
          aria-current="page"
          className="text-2xl"
        >
          {t(link.display)}
        </Link>
      </NavbarMenuItem>
    );
  }

  function logOut() {
    setUser(undefined);
    setToken("");
  }

  return (
    <>
      <Navbar
        shouldHideOnScroll={isMenuOpen}
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          item: ["wrapper:max-w-full"]
        }}
      >
        <NavbarContent key="brand">
          <NavbarBrand className="flex flex-row gap-6 justify-between">
            <Button
              color="primary"
              isIconOnly
              variant="flat"
              className="text-primary-700 lg:hidden"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <IoMdClose /> : <HiOutlineMenuAlt4 />}
            </Button>
            <NavbarMenu className="justify-center">
              {links.map(getMenuItem)}
              {location.pathname != "/" && <SmallSearch />}
              {user ? (
                <div className="flex flex-row gap-6 m-6 justify-around items-center">
                  <UserCard user={user} />
                  <Button
                    color="primary"
                    className="text-primary-700 text-3xl text-center leading-10 p-10"
                    onPress={logOut}
                    variant="flat"
                  >
                    <h3>{t("translation:log_out")}</h3>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-row gap-6 m-6 justify-around items-center">
                  {/*<Link*/}
                  {/*  href="/login"*/}
                  {/*  className="text-primary-700 text-3xl leading-10 py-10"*/}
                  {/*>*/}
                  {/*  <h3>{t("translation:log_in")}</h3>*/}
                  {/*</Link>*/}
                  {/*<Button*/}
                  {/*  as={Link}*/}
                  {/*  color="primary"*/}
                  {/*  href="/signup"*/}
                  {/*  className="text-primary-700 text-3xl text-center leading-10 p-10"*/}
                  {/*  variant="flat"*/}
                  {/*>*/}
                  {/*  <h3>{t("translation:sign_up")}</h3>*/}
                  {/*</Button>*/}
                </div>
              )}
            </NavbarMenu>
            <div className="flex flex-row gap-3">
              <Link href="/">
                <div className="text-2xl font-semibold text-primary-700">
                  KOOSTIS
                </div>
              </Link>
              <LanguageSelector />
            </div>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          key="links"
          justify="center"
          className="hidden gap-6 lg:flex"
        >
          {location.pathname != "/" && <SmallSearch />}
          {links.map(getItem)}
        </NavbarContent>
        <NavbarContent
          key="user"
          justify="end"
          className="hidden gap-6 md:flex"
        >
          {user ? (
            <div className="flex flex-row gap-6 m-6 justify-around items-center">
              <UserCard user={user} />
              <Button
                color="primary"
                className="text-primary-700 font-semibold"
                onPress={logOut}
                variant="flat"
              >
                {t("translation:log_out")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-row gap-6 m-6 justify-around items-center">
              {/*<Link href="/login" className="text-primary-700 text-xl">*/}
              {/*  {t("translation:log_in")}*/}
              {/*</Link>*/}
              {/*<Button*/}
              {/*  as={Link}*/}
              {/*  color="primary"*/}
              {/*  className="text-primary-700 font-semibold text-xl"*/}
              {/*  href="/signup"*/}
              {/*  variant="flat"*/}
              {/*>*/}
              {/*  {t("translation:sign_up")}*/}
              {/*</Button>*/}
            </div>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
