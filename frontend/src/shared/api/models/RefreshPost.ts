export class RefreshPost {
  public type: string
  constructor() {
    this.type = 'RefreshPost'
  }

  public getUrl(): string {
    return 'user/refresh'
  }
}
