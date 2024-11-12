import { Result } from 'true-myth'
import { auth_token, AuthTokenResponse } from './auth_token'

interface Params {
  base_url: string
  client_id: string
  client_secret: string
  client_authorization: string
  user_agent: string
  user_login: string
  user_pass: string
}

export class Aiqfome {

  private access_token: string
  private refresh_token: string

  constructor(private params: Params) {
    this.access_token = ''
    this.refresh_token = ''
  }

  async auth_token (): Promise<Result<AuthTokenResponse, any>> {
    const api = await auth_token(
      this.params.base_url, 
      this.params.user_agent, 
      this.params.client_authorization,
      this.params.client_id, 
      this.params.client_secret, 
      this.params.user_login, 
      this.params.user_pass
    )

    if (api.isErr) return Result.err(api.error)
    this.access_token = api.value.data.access_token
    this.refresh_token = api.value.data.refresh_token

    return Result.ok(api.value)
  }
}
