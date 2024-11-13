import axios, { AxiosError } from "axios";
import { AppStorage } from "./app_storage";
import { AiqError, DefaultAiqError } from "./default_error";
import { Result } from "true-myth";

export interface NewOrderResponse {
  data: Daum[]
}

export interface Daum {
  id: number
  card_id: any
  store_id: number
  pickup_time: any
  created: string
}

interface Props {
  store_id: number
  user_email: string
  payment_method_id: number
  amount: number
  number_of_items: number
  number_of_additional_items: number
  number_of_mandatory_items: number
  number_of_sub_items: number
  status: number
  address: {
    nickname: string
    street_name: string
    number: string
    complement: string
    reference: string
    postal_code: string
    type: string
    phone: string
    neighborhood_name: string
    delivery_tax: number
  }
}

export async function new_order(props: Props): Promise<Result<NewOrderResponse, AiqError>> {
  try {
    const api = await axios({
      url: `${AppStorage.getItem('base_url')}/new-order`,
      method: 'POST',
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
      data: props
    })

    const data = api.data as NewOrderResponse
    return Result.ok(data)

  } catch (err: any) {
    const error: AxiosError<AiqError> = err
    if (error.response?.data) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }
}
