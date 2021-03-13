export interface IBook {
  id?: number;
  title?: string;
  author?: string;
  year?: string;
  manyUserToOneBookLogin?: string;
  manyUserToOneBookId?: number;
}

export const defaultValue: Readonly<IBook> = {};
