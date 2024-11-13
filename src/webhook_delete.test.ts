import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('deletar webhook', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.webhook_delete({ store_id: 53808, hook_id: 339 })
  expect(api.isOk).toBe(true)
})