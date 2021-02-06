export interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}
