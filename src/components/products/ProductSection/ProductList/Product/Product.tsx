import Button from "@/components/common/Button/Button";
import { Product as ProductType } from "@/types";
import { convertToCartProduct, getCartFromLocalStorage } from "@/utils/cart";
import { getProductList } from "@/utils/products";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

type ProductProps = {
  product: ProductType;
  reverseOrder?: boolean;
  className?: string;
  priority?: boolean;
  showAddToCart?: boolean;
};

type ProductImagesProps = {
  product: ProductType;
  priority?: boolean;
};

const ProductPreviewImages = ({ product, priority }: ProductImagesProps) => {
  return (
    <div className="relative order-1 overflow-hidden rounded-lg xl:w-1/2">
      <picture>
        <source
          media="(min-width: 1024px)"
          width={1080}
          height={1120}
          srcSet={product.categoryImage.desktop}
        />
        <source
          media="(min-width: 640px)"
          width={1378}
          height={704}
          srcSet={product.categoryImage.tablet}
        />
        <img
          width={654}
          height={704}
          className="object-cover"
          loading={priority ? "eager" : "lazy"}
          src={product.categoryImage.mobile}
          alt={product.name}
        />
      </picture>
    </div>
  );
};

const ProductDetailsImages = ({ product, priority }: ProductImagesProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg md:w-1/2">
      <picture>
        <source
          media="(min-width: 1024px)"
          width={1080}
          height={1120}
          srcSet={product.image.desktop}
        />
        <source
          media="(min-width: 640px)"
          width={562}
          height={960}
          srcSet={product.image.tablet}
        />
        <img
          width={654}
          height={654}
          className="object-cover"
          loading={priority ? "eager" : "lazy"}
          src={product.image.mobile}
          alt={product.name}
        />
      </picture>
    </div>
  );
};

export default function Product({
  product,
  reverseOrder,
  className,
  priority,
  showAddToCart,
}: ProductProps) {
  const [productQuantity, setProductQuantity] = useState(1);
  const pathname = usePathname();
  const dynamicRoute = useRouter().asPath;
  const productPriceFormatted = product.price.toLocaleString("en-US");

  const handleAddToCart = () => {
    const cartData = getCartFromLocalStorage();
    const products = getProductList();

    let updatedCart = cartData.slice();

    const existingProductIndex = updatedCart.findIndex(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += productQuantity;
    } else {
      const productToAdd = products.find((p) => p.id === product.id);
      if (productToAdd) {
        updatedCart.push(convertToCartProduct(productToAdd, productQuantity));
      }
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setProductQuantity(1);
  };

  const handleChangeQuantity = (value: number) => {
    if (productQuantity + value > 0) {
      setProductQuantity((prev) => prev + value);
    }
  };

  useEffect(() => setProductQuantity(1), [dynamicRoute]);

  return (
    <li
      className={twJoin(
        "flex flex-col items-center gap-[2rem] xl:gap-[7.8125rem]",
        showAddToCart
          ? "md:flex-row md:gap-[4.34rem]"
          : !showAddToCart && reverseOrder
          ? "xl:flex-row-reverse"
          : "xl:flex-row",
        !showAddToCart && "lg:gap-[3.25rem]",
        className,
      )}
    >
      {showAddToCart ? (
        <ProductDetailsImages product={product} priority={true} />
      ) : (
        <ProductPreviewImages product={product} priority={priority} />
      )}
      <div
        className={twJoin(
          "order-2 lg:max-w-[35.8125rem] xl:text-left",
          showAddToCart ? "md:w-1/2" : "text-center xl:w-1/2",
        )}
      >
        {product.new && (
          <span className="mb-[1.5rem] block text-sm uppercase leading-normal text-orange md:mb-[1rem] xl:mb-[1rem]">
            New product
          </span>
        )}
        <h2
          className={twJoin(
            "max-w-[15ch] text-2xl font-bold uppercase text-neutral-900 lg:text-4xl xl:mx-0",
            !showAddToCart && "mx-auto",
          )}
        >
          {product.name}
        </h2>
        <p className="mt-[1.5rem] text-base opacity-50 md:mt-[2rem]">
          {product.description}
        </p>
        {showAddToCart ? (
          <>
            <p className="mt-[1.5rem] text-lg text-neutral-900 md:mt-[2rem]">
              $ {productPriceFormatted}
            </p>
            <div className="mt-[1.94rem] flex flex-row flex-wrap items-center gap-[1rem] lg:mt-[2.94rem]">
              <div className="flex h-[3rem] w-[7.5rem] items-center justify-between bg-neutral-400 text-[0.8125rem] font-bold">
                <button
                  className="h-full basis-1/3 text-[1rem] text-neutral-900/25 transition duration-300 ease-in-out hover:text-orange"
                  onClick={() => handleChangeQuantity(-1)}
                >
                  -
                </button>
                <span className="text-neutral-900">{productQuantity}</span>
                <button
                  className="h-full basis-1/3 text-[1rem] text-neutral-900/25 transition duration-300 ease-in-out hover:text-orange"
                  onClick={() => handleChangeQuantity(+1)}
                >
                  +
                </button>
              </div>
              <Button onClick={handleAddToCart} intent="primary" className="">
                Add to cart
              </Button>
            </div>
          </>
        ) : (
          <Button
            href={`${pathname}/${product.slug}`}
            intent="primary"
            className="mt-[1.5rem] md:mt-[2.44rem] lg:mt-[2.5rem]"
          >
            See product
          </Button>
        )}
      </div>
    </li>
  );
}
