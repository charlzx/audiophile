import CategoryList from "@/components/common/CategorySection/CategoryList/CategoryList";
import Container from "@/components/common/Container";

type CategorySectionProps = {
  className?: string;
};

export default function CategorySection({ className }: CategorySectionProps) {
  return (
    <section className={className}>
      <Container>
        <CategoryList />
      </Container>
    </section>
  );
}
