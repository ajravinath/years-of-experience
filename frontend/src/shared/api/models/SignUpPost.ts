import { LoginSignUpFormData } from '../auth'

export class SignUpPost {
  public type: string
  constructor(public formData: LoginSignUpFormData) {
    this.type = 'SignUpPost'
  }

  public getUrl(): string {
    return 'user/register'
  }
}
