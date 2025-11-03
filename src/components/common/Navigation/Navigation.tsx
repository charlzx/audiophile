import tailwindConfig from "@/../tailwind.config.js";
import CartButton from "@/components/common/Cart/CartButton/CartButton";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import desktopNavigationLinks from "@/data/navigationLinks.json";
import { useCallback, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation";
import MobileNavigation from "./MobileNavigation/MobileNavigation";
import MobileNavigationButton from "./MobileNavigation/MobileNavigationButton/MobileNavigationButton";

import { usePathname } from "next/navigation";
import Cart from "../Cart/Cart";

const fullConfig = resolveConfig(tailwindConfig);
const screens = fullConfig?.theme?.screens as { [key: string]: string };

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigationTransparent, setIsNavigationTransparent] = useState(true);
  const [navigationHeightInPixels, setNavigationHeightInPixels] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const calculateNavigationHeight = () => {
      const navigationHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--navigation-height",
        ),
      );
      setNavigationHeightInPixels(navigationHeight * 16 + 1);
    };

    if (typeof window !== "undefined") {
      calculateNavigationHeight();
    }
  }, []);

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
    handleCloseCart();
  };

  const handleCartButtonClick = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleEscapePressed = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleNavigationStyleChange = () => {
      if (!isHomePage) {
        setIsNavigationTransparent(false);
        return;
      }

      const hasScrolledPastNavigation =
        window.scrollY >= navigationHeightInPixels;

      setIsNavigationTransparent(!hasScrolledPastNavigation);
    };

    handleNavigationStyleChange();
    window.addEventListener("scroll", handleNavigationStyleChange);

    return () => {
      window.removeEventListener("scroll", handleNavigationStyleChange);
    };
  }, [isHomePage, navigationHeightInPixels]);

  useEffect(() => {
    const togglePageScrolling = () => {
      const html = document.querySelector("html");
      html?.classList.toggle("overflow-hidden", isMobileMenuOpen);
    };

    togglePageScrolling();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleViewportChange = () => {
      const windowWidthAsRem = window.innerWidth / 16;

      if (windowWidthAsRem >= parseInt(screens?.xl ?? "0")) {
        setIsMobileMenuOpen(false);
      }
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapePressed);

    return () => {
      document.removeEventListener("keydown", handleEscapePressed);
    };
  }, [handleEscapePressed]);

  return (
    <header
      className={twJoin(
        "fixed left-0 right-0 top-0 z-10",
        isHomePage && "transition duration-[250ms] ease-in-out",
        isMobileMenuOpen
          ? "bg-neutral-900"
          : isNavigationTransparent
          ? "bg-transparent"
          : "bg-neutral-900",
      )}
    >
      <Container>
        <div className="flex h-navigation-height items-center justify-between">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-grow basis-0 items-center justify-start xl:hidden">
              <MobileNavigationButton
                onClick={handleToggleMobileMenu}
                isMobileMenuOpen={isMobileMenuOpen}
              />
            </div>
            <div className="xl:flex xl:flex-grow xl:basis-0">
              <Logo
                onClick={() => {
                  handleCloseMobileMenu();
                  handleCloseCart();
                }}
              />
            </div>
            {isMobileMenuOpen ? (
              <MobileNavigation
                onCategoryClick={() => {
                  handleCloseMobileMenu();
                  handleCloseCart();
                }}
              />
            ) : (
              <DesktopNavigation
                handleCloseCart={handleCloseCart}
                navigationLinks={desktopNavigationLinks}
              />
            )}
            <div className="flex flex-grow basis-0 items-center justify-end">
              <CartButton handleCartButtonClick={handleCartButtonClick} />
              <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
            </div>
          </div>
        </div>
        <span className="absolute z-10 block h-[0.0625rem] bg-neutral-100/20 full-bleed sm:no-bleed"></span>
      </Container>
    </header>
  );
}
