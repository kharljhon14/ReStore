import { IPagination } from './pagination';

export interface IFilterParams extends IPagination {
  OrderBy?: string;
  SearchTerm?: string;
  Brands?: string[];
  Types?: string[];
}
