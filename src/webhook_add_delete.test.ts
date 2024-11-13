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
  const api2 = await sdk.webhook_add({ store_id: 53808, event: 2, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })
  const api3 = await sdk.webhook_add({ store_id: 53808, event: 3, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })
  const api4 = await sdk.webhook_add({ store_id: 53808, event: 4, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })
  const api5 = await sdk.webhook_add({ store_id: 53808, event: 5, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })
  const api6 = await sdk.webhook_add({ store_id: 53808, event: 6, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })
  const api7 = await sdk.webhook_add({ store_id: 53808, event: 7, url: 'https://webhook.site/972496c2-6473-4836-91f6-dd68e5723a14' })

  expect(api.isOk).toBe(true)
  expect(api2.isOk).toBe(true)
  expect(api3.isOk).toBe(true)
  expect(api4.isOk).toBe(true)
  expect(api5.isOk).toBe(true)
  expect(api6.isOk).toBe(true)
  expect(api7.isOk).toBe(true)

  if (api.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api.value.data[0].id })).isOk).toBe(true)
  if (api2.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api2.value.data[0].id })).isOk).toBe(true)
  if (api3.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api3.value.data[0].id })).isOk).toBe(true)
  if (api4.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api4.value.data[0].id })).isOk).toBe(true)
  if (api5.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api5.value.data[0].id })).isOk).toBe(true)
  if (api6.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api6.value.data[0].id })).isOk).toBe(true)
  if (api7.isOk) expect((await sdk.webhook_delete({ store_id: 53808, hook_id: api7.value.data[0].id })).isOk).toBe(true)
})
