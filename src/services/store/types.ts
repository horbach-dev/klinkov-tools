export type TStoreType<T> = {
  readonly state: T
  setState(value: Partial<T>): void
  mergeOntoState: ((value: Partial<T> | ((prevState: T) => T)) => void)
  reset(): void
  subscribe: (fn: any) => () => void
}
