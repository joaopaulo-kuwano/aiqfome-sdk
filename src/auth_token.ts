import fetch from "node-fetch";
import { Result } from "true-myth";

export interface AuthTokenResponse {
  "data": {
    "access_token": string
    "expires_in": number
    "refresh_expires_in": number
    "refresh_token": string
    "token_type": string
  }
}

export async function auth_token (
  url: string, 
  agent: string, 
  authorization: string, 
  id: string, 
  secret: string, 
  user: string, 
  pass: string
): Promise<Result<AuthTokenResponse, any>> {
  try {
    
    const api = await fetch(url + '/auth/token', {
      method: 'POST',
      headers: {
        'Aiq-User-Agent': agent,
        'aiq-client-authorization': authorization,
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64')
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      })
    })
    const json = await api.json() as AuthTokenResponse

    return Result.ok(json)

  }catch(err: any){
    return Result.err(err)
  }

}
