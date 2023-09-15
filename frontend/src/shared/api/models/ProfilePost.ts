export class ProfilePost {
  public type: string
  public formData: FormData
  constructor(formData: FormData) {
    this.formData = formData
    this.type = 'ProfilePost'
  }

  public getUrl(): string {
    return 'profile'
  }
}
