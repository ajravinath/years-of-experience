import { LoginSignUpFormData } from '../auth'

export class LoginPost {
  public type: string
  constructor(public formData: LoginSignUpFormData) {
    this.type = 'LoginPost'
  }

  public getUrl(): string {
    return 'user/login'
  }
}
