export interface IPresenter<TInput, TOutput> {
  getOutput(input: TInput): TOutput;
}
