import { HeroUIProvider } from "@heroui/react";
import { Outlet } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Footer from "./footer/Footer.tsx";
import NavBar from "./header/NavBar.tsx";

export default function Layout() {
  return (
    <>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col gap-3 min-h-[100vh] max-w-[100vw] items-center">
            <NavBar />
            <Outlet />
            <Footer />
          </div>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}
