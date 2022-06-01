export type CommonResponse<T> = {
  status: number;
  userMessage: string;
  systemMessage: string;
  stackTrace: string;
  generatedAtUtc: string;
  data: T;
  totalReturned?: number;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Require<Type, Fields extends keyof Type> = Required<Pick<Type, Fields>> & Omit<Type, Fields>;
export type Optional<Type, Fields extends keyof Type> = Partial<Pick<Type, Fields>> & Omit<Type, Fields>;
