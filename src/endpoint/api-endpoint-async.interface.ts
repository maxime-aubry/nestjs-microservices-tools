export interface IApiEndpointAsync<TReturn> {
  executeAsync(...args: any[]): Promise<TReturn>;
}
