export interface IMessageQueueConfiguration {
  getMessageQueueUser(): string;
  getMessageQueuePass(): string;
  getMessageQueueHost(): string;
  getMessageQueueAuthQueue(): string;
  getMessageQueueUrl(): string;
}
