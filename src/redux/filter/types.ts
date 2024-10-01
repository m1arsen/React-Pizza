export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: TSort;
}
