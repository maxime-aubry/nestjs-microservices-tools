export interface IApiEndpoint<TReturn> {
  execute(...args: any[]): TReturn;
}
