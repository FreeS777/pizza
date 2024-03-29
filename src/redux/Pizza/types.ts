export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPropertyParam = {
  categoryParam: string;
  sortBy: string;
  orderParam: string;
  search: string;
  currentPage: string;
};
export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
