import { NavigationLink as NavigationLinkType } from "@/types";
import DesktopNavigationLink from "./DesktopNavigationLink/DesktopNavigationLink";

type DesktopNavigationProps = {
  navigationLinks: NavigationLinkType[];
  handleCloseCart: () => void;
};

export default function DesktopNavigation({
  navigationLinks,
  handleCloseCart,
}: DesktopNavigationProps) {
  return (
    <nav className="hidden xl:flex">
      <ul className="flex gap-[2.12rem]">
        {navigationLinks.map(({ name, href }: NavigationLinkType) => (
          <li onClick={handleCloseCart} key={name}>
            <DesktopNavigationLink href={href}>{name}</DesktopNavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
