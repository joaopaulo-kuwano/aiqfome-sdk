import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('deve gerar token de acesso aiq', async () => {
  const sdk = new Aiqfome({
    base_url: process.env.AIQ_URL || '',
    client_authorization: process.env.AIQ_CLIENT_AUTH || '',
    client_id: process.env.AIQ_CLIENT_ID || '',
    client_secret: process.env.AIQ_CLIENT_SECRET || '',
    user_agent: process.env.AIQ_USER_AGENT || '',
    user_login: process.env.AIQ_USER_LOGIN || '',
    user_pass: process.env.AIQ_USER_PASS || ''
  })
  
  const api = await sdk.auth_token()
  expect(api.isOk).toBe(true)
})
