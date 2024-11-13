import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('deve consultar pedidos aiq', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.orders_search({
    date_start: '2024-06-01',
    date_end: '2024-08-01',
  })
  expect(api.isOk).toBe(true)
})
