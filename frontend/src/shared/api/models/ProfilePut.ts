export class ProfilePut {
  public type: string
  constructor(public id: string, public formData: FormData) {
    this.type = 'ProfilePut'
  }

  public getUrl(id?: string): string {
    return `profile/${id ?? this.id}`
  }
}
