import Container from "@/components/common/Container";
import { useEffect } from "react";
import CategoryList from "../../CategorySection/CategoryList/CategoryList";

type MobileNavigationProps = {
  onCategoryClick: () => void;
};

export default function MobileNavigation({
  onCategoryClick,
}: MobileNavigationProps) {
  useEffect(() => {
    const handleResize = () => {
      const vhInPixels = window.innerHeight * 0.01;
      const vhInRem = `${vhInPixels / 16}rem`;

      document.documentElement.style.setProperty("--nav-vh", vhInRem);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className="absolute left-0 right-0 top-[calc(var(--navigation-height)+1px)] z-10 block overflow-y-auto overflow-x-hidden"
      onClick={onCategoryClick}
    >
      <div className="fixed inset-0 top-navigation-height h-full w-full bg-neutral-900 opacity-50 xl:hidden"></div>
      <div
        onClick={(event) => event.stopPropagation()}
        className={
          "relative max-h-[calc(var(--nav-vh,1vh)*100-var(--navigation-height))] overflow-y-auto rounded-b-lg bg-neutral-100 py-[2.1875rem] slim-scrollbar"
        }
      >
        <Container className="mt-9">
          <CategoryList onCategoryClick={onCategoryClick} />
        </Container>
      </div>
    </nav>
  );
}
