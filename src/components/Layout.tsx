import Footer from "@/components/common/Footer/Footer";
import Navigation from "@/components/common/Navigation/Navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
