import { useRouter } from "next/router";

type GoBackButtonProps = {
  children: React.ReactNode;
};

export default function GoBackButton({ children }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <button
      className="text-base text-neutral-900/50 hover:text-orange focus:text-orange"
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </button>
  );
}
