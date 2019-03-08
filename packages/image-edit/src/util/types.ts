export type ExcludeKey<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, keyof Pick<T, K>>
>
