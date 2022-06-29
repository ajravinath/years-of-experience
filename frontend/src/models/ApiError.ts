class ApiError {
  constructor(
    public name: string,
    public message: string,
    public status = 400,
    public additional = '',
  ) {}
}

export default ApiError
