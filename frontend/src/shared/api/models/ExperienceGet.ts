export class ExperienceGet {
  public type: string
  constructor(public id: string) {
    this.type = 'ExperienceGet'
  }

  public getUrl(id?: string): string {
    return `profile/${id ?? this.id}/experience`
  }
}
