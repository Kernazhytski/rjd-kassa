export class HttpTransferException {
  constructor(public readonly errors: Record<string, any>) {}
}
