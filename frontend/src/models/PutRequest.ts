class PutRequest {
  url: string
  formData: FormData
  constructor(url: string, formData: FormData) {
    this.url = url
    this.formData = formData
  }
}

export default PutRequest
