export interface IHashService {
  hashAsync(value: string): Promise<string>;
  compareAsync(value: string, hashValue: string): Promise<boolean>;
}
