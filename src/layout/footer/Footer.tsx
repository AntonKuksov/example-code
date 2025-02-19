/* eslint-disable max-len */
import { Link } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { useTranslation } from "react-i18next";
import ThemeSwitch from "./ThemeSwitch.tsx";


const links = [
  { href: "/", label: "translation:home" },
  { href: "/about", label: "translation:about_title" },
  {
    href: "/contact",
    label: "translation:contact"
  },
  { href: "#", label: "translation:privacy_policy" },
  { href: "#", label: "translation:terms_of_service" }
];

export default function Footer() {
  const [t] = useTranslation();
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <>
      <footer className="flex w-full flex-col" style={{ padding: "1rem" }}>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
          <div className="flex items-center justify-center gap-6">
            <span className="text-medium font-medium text-default-900">
              KOOSTIS
            </span>
            <ThemeSwitch
              className=""
              defaultSelected={theme == "dark"}
              size="md"
              onChange={toggleTheme}
            />
          </div>
          <span
            aria-hidden="true"
            className="w-px h-px block"
            style={{ marginLeft: "0.25rem", marginTop: "1rem" }}
          ></span>
          <div
            className="flex flex-wrap justify-center gap-y-1"
            style={{ columnGap: "1rem" }}
          >
            {links.map((link, index) => (
              <Link key={index} className="text-primary-700" href={link.href}>
                {t(link.label)}
              </Link>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="w-px h-px block"
            style={{ marginLeft: "0.25rem", marginTop: "1.5rem" }}
          ></span>
          <div className="flex justify-center" style={{ columnGap: "1rem" }}>
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-foreground"
              tabIndex={0}
              role="link"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-5 iconify iconify--fontisto"
                width="0.5em"
                height="1em"
                viewBox="0 0 12 24"
              >
                <path
                  fill="currentColor"
                  d="M12.462.173v3.808h-2.265a2.11 2.11 0 0 0-1.675.521l.002-.002a2.368 2.368 0 0 0-.432 1.566v-.008v2.726h4.229l-.56 4.27H8.098V24H3.681V13.053H.001V8.784h3.68V5.639a5.56 5.56 0 0 1 1.502-4.162l-.003.003A5.418 5.418 0 0 1 9.185.002h-.013a24.124 24.124 0 0 1 3.406.185l-.117-.012z"
                ></path>
              </svg>
            </a>
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-foreground"
              tabIndex={0}
              role="link"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-5 iconify iconify--fontisto"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16 12a4 4 0 1 0-1.172 2.829A3.843 3.843 0 0 0 16 12.06l-.001-.063zm2.16 0a6.135 6.135 0 1 1-1.797-4.359a5.922 5.922 0 0 1 1.798 4.256l-.001.109zm1.687-6.406v.002a1.44 1.44 0 1 1-.422-1.018c.256.251.415.601.415.988v.029v-.001zm-7.84-3.44l-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014a4.117 4.117 0 0 0-2.272 2.254l-.01.027a5.975 5.975 0 0 0-.284 1.083l-.005.037a11.76 11.76 0 0 0-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649t.008 1.195t-.008 1.195t0 1.649t.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043a4.117 4.117 0 0 0 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024l1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014a4.117 4.117 0 0 0 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649t-.008-1.195t.008-1.195t0-1.649t-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073a6.254 6.254 0 0 0-.303-1.163l.014.043a4.117 4.117 0 0 0-2.254-2.272l-.027-.01a5.975 5.975 0 0 0-1.083-.284l-.037-.005a11.76 11.76 0 0 0-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zM24 12q0 3.578-.08 4.953a6.64 6.64 0 0 1-6.985 6.968l.016.001q-1.375.08-4.953.08t-4.953-.08a6.64 6.64 0 0 1-6.968-6.985l-.001.016q-.08-1.375-.08-4.953t.08-4.953A6.64 6.64 0 0 1 7.061.079L7.045.078q1.375-.08 4.953-.08t4.953.08a6.64 6.64 0 0 1 6.968 6.985l.001-.016Q24 8.421 24 12"
                ></path>
              </svg>
            </a>
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-foreground"
              tabIndex={0}
              role="link"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">Tiktok</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M16 21.75A5.75 5.75 0 0 0 21.75 16V8A5.75 5.75 0 0 0 16 2.25H8A5.75 5.75 0 0 0 2.25 8v8A5.75 5.75 0 0 0 8 21.75zM13.711 5.763A.75.75 0 0 0 12.25 6v9A2.25 2.25 0 1 1 10 12.75a.75.75 0 0 0 0-1.5A3.75 3.75 0 1 0 13.75 15V8.458c.767.712 1.847 1.292 3.25 1.292a.75.75 0 0 0 0-1.5c-.972 0-1.711-.4-2.259-.919c-.56-.532-.898-1.173-1.03-1.568"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-foreground"
              tabIndex={0}
              role="link"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.3m"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.72 4H5.37A1.31 1.31 0 0 0 4 5.25v13.38A1.41 1.41 0 0 0 5.37 20h13.35A1.34 1.34 0 0 0 20 18.63V5.25A1.23 1.23 0 0 0 18.72 4M9 17.34H6.67v-7.13H9ZM7.89 9.13A1.18 1.18 0 0 1 6.67 7.9a1.18 1.18 0 0 1 1.24-1.23A1.18 1.18 0 0 1 9.13 7.9a1.18 1.18 0 0 1-1.24 1.23m9.45 8.21H15v-3.9c0-.93-.33-1.57-1.16-1.57a1.25 1.25 0 0 0-1.17.84a1.4 1.4 0 0 0-.08.57v4.06h-2.3v-7.13h2.3v1a2.32 2.32 0 0 1 2.1-1.21c1.51 0 2.65 1 2.65 3.13Z"
                />
              </svg>
            </a>
          </div>
          <span
            aria-hidden="true"
            className="w-px h-px block"
            style={{ marginLeft: "0.25rem", marginTop: "1.5rem" }}
          ></span>
          <p className="mt-1 text-center text-small text-default-900">
            © 2025 Koostis. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
