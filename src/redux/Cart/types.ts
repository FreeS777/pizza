export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  sum: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalCount: number;
}
