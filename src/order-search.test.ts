import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('deve retornar todos os dados de um unico pedido', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.order_search({
    order_id: 24338119
  })
  expect(api.isOk).toBe(true)
})
