export type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  types: number[];
  sizes: number[];
};

export type TSearchPizzaParams = {
  sortBy: string;
  category: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}
