import axios, { AxiosError } from 'axios'
import { Result } from "true-myth";
import { AiqError, DefaultAiqError } from './default_error';

export interface AuthTokenResponse {
  data: {
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    token_type: string
  }
}

interface Props {
  url: string
  agent: string
  authorization: string
  id: string
  secret: string
  user: string
  pass: string
}

export async function auth_token(props: Props): Promise<Result<AuthTokenResponse, AiqError>> {
  try {

    const api = await axios({
      url: props.url + '/auth/token',
      method: 'POST',
      headers: {
        'Aiq-User-Agent': props.agent,
        'aiq-client-authorization': props.authorization,
        'Authorization': 'Basic ' + Buffer.from(`${props.id}:${props.secret}`).toString('base64'),
      },
      data: {
        username: props.user,
        password: props.pass,
      }
    })

    const data = api.data as AuthTokenResponse
    return Result.ok(data)

  } catch (err: any) {
    const error = err as AxiosError<AiqError>
    if (error.response) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }

}
