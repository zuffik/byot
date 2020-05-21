export interface DataResponse<T, E extends Error = Error> {
  data?: T;
  errors?: E[];
  success: boolean;
}
