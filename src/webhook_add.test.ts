import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

// event 1 = new-order
// event 2 = cancel-order
// event 3 = new-store
// event 4 = new-menu
// event 5 = read-order
// event 6 = ready-order
// event 7 = order-refund

it('adicionar webhook', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.webhook_add({ store_id: 53808, event: 1, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })
  expect(api.isOk).toBe(true)
})
