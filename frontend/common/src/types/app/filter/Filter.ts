export type Filter<A = {}> = A & {
  pagination?: {
    limit: number;
    offset: number;
  };
  query?: string;
  reset?: boolean;
};
