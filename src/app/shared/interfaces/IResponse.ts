export interface IResponse {
  code: number;
  status: boolean;
  message: string;
  data ?: [] | object
}