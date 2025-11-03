export type NavigationLink = {
  name: string;
  href: string;
};

export type Category = {
  name: string;
  href: string;
  thumbnail: string;
};

export type IconProps = {
  className?: string;
};

export type Products = Product[];

export interface ImageUrls {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: ImageUrls;
  category: string;
  categoryImage: ImageUrls;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
  gallery: {
    first: ImageUrls;
    second: ImageUrls;
    third: ImageUrls;
  };
  others: {
    slug: string;
    name: string;
    image: ImageUrls;
  }[];
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export type Cart = CartProduct[];

export type LocalStorageCart = {
  id: number;
  quantity: number;
};
