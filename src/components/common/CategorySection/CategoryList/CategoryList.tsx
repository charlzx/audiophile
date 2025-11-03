import categoryLinks from "@/data/categoryLinks.json";
import { Category as CategoryType } from "@/types";
import Category from "./Category/Category";

type CategoryListProps = {
  onCategoryClick?: () => void;
};

export default function CategoryList({ onCategoryClick }: CategoryListProps) {
  return (
    <ul
      className={
        "relative flex flex-col items-center justify-center gap-[3.75rem] lg:flex-row lg:gap-[1rem]"
      }
    >
      {categoryLinks.map(({ name, href, thumbnail }: CategoryType) => (
        <Category
          key={name}
          name={name}
          href={href}
          thumbnail={thumbnail}
          onClick={onCategoryClick}
        />
      ))}
    </ul>
  );
}
