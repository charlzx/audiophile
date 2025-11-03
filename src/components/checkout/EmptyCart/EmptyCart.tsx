import Button from '@/components/common/Button/Button';
import CategorySection from '@/components/common/CategorySection/CategorySection';
import Container from '@/components/common/Container';

export function EmptyCart() {
  return (
    <main className="pb-[7.5rem] pt-[calc(6.875rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(8rem+var(--navigation-height))]">
      <Container className="text-center">
        <h1 className="text-xl font-bold uppercase lg:text-4xl">Your cart is empty!</h1>
        <p className="mt-[2rem] text-base opacity-50">
          Before proceeding to checkout you must add a product to your cart.
        </p>
        <Button className="mt-[2rem]" href="/" intent="primary">
          Return to home
        </Button>
      </Container>
      <CategorySection className="pt-[8rem]" />
    </main>
  )
} 