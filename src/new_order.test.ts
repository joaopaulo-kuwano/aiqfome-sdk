import { it, expect } from 'vitest'
import { Aiqfome } from '.'
import env from 'dotenv'
env.config()

it('gera novo pedido (apenas homologacao)', async () => {
  const sdk = new Aiqfome()
  const api = await sdk.new_order({
    "store_id": 53808,
    "user_email": "joao23@gmail.com",
    "payment_method_id": 181,
    "amount": 1,
    "number_of_items": 2,
    "number_of_additional_items": 2,
    "number_of_mandatory_items": 2,
    "number_of_sub_items": 1,
    "status": 1,
      "address": {
       "nickname": "Casa Telemaco",
       "street_name": "Rua Mina de Carvao",
       "number": "58",
       "complement": "",
       "reference": "Posto Vitoria II",
       "postal_code": "84267-420",
       "type": "1",
       "phone": "+5599999999999",
       "neighborhood_name": "Area 2",
       "delivery_tax": 5
     }
   })
  expect(api.isOk).toBe(true)
})
