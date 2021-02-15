export interface CallbackNoParam<T = void> {
  (): T;
}

export interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}

export interface CallbackTwoParam<T1, T2, T3 = void> {
  (param1: T1, param2: T2): T3;
}
