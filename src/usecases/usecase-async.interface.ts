export interface IUseCaseAsync<TRequest, TResponse> {
  executeAsync: (request: TRequest) => Promise<TResponse>;
}
