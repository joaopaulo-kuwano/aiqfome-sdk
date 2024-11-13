import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('deve listar os webhooks de cada loja', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.webhook_list({ store_id: '53808' })
  expect(api.isOk).toBe(true)
})
