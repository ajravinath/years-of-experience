export class ProfileGet {
  public type: string
  constructor(public id: string) {
    this.type = 'ProfileGet'
  }

  public getUrl(id?: string): string {
    return `profile/${id ?? this.id}`
  }
}
