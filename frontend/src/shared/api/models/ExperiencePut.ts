export class ExperiencePut {
  public type: string
  constructor(public id: string, public experienceId: string, public formData: FormData) {
    this.type = 'ExperiencePut'
  }

  public getUrl(id?: string, experienceId?: string): string {
    return `profile/${id ?? this.id}/experience/${experienceId ?? this.experienceId}`
  }
}
