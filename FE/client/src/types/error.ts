export interface IError {
  title: string;
  status: number;
  errors?: string[];
  detail?: string;
}
