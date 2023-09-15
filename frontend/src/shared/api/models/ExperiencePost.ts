export class ExperiencePost {
  public type: string
  constructor(public id: string, public formData: FormData) {
    this.type = 'ExperiencePost'
  }

  public getUrl(id?: string | null): string {
    return `profile/${id ?? this.id}/experience`
  }
}
