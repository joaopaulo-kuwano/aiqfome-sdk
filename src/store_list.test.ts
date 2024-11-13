import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('deve listar lojas do usuario', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.store_list({})
  expect(api.isOk).toBe(true)
})
