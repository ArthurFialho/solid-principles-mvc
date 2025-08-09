export interface Api {
  start(port: number): Promise<void>;
}
