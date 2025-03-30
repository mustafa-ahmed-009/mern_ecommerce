export interface CartModel {
  _id: string;
  cartItems: CartItem[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  title: string;
  price: number;
  image: string;
  _id: string;
}
