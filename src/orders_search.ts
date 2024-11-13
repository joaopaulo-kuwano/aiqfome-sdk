import axios, { AxiosError } from "axios"
import { Result } from "true-myth"
import { AiqError, DefaultAiqError } from "./default_error"
import { AppStorage } from "./app_storage"

export interface OrdersSearchResponse {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  order_id: number
  created_at: string
  is_ready: boolean
  is_read: boolean
  is_cancelled: boolean
  is_in_separation: boolean
  is_delivered: boolean
  user_name: string
  is_aiqentrega_delivery: boolean
  order_is_pickup: boolean
  is_scheduled: boolean
  store_id: number
  store_name: string
  order_delivery_time: string
}

export interface Links {
  first: string
  last: any
  prev: any
  next: string
}

export interface Meta {
  current_page: number
  from: number
  path: string
  per_page: number
  to: number
}

interface Props {
  date_start?: string // YYYY-MM-DD
  date_end?: string // YYYY-MM-DD
  page?: string // num
  per_page?: string // num
  order_id?: string // id pedido indiv.
  order_ids?: string // separar por virgula => 1,2,3
  delivery_id?: string
  user_email?: string
  store_id?: string
}

export async function orders_search(props: Props): Promise<Result<OrdersSearchResponse, AiqError>> {
  try {

    const params = {} as any
    if (props.date_start) params['filter[date_start]'] = props.date_start
    if (props.date_end) params['filter[date_end]'] = props.date_end
    if (props.page) params.page = props.page
    if (props.per_page) params.per_page = props.per_page
    if (props.order_id) params['filter[order_id]'] = props.order_id
    if (props.order_ids) params['filter[order_ids]'] = props.order_ids
    if (props.delivery_id) params['filter[delivery_id]'] = props.delivery_id
    if (props.user_email) params.user_email = props.user_email
    if (props.store_id) params.store_id = props.store_id
    
    const api = await axios({
      url: AppStorage.getItem('base_url') + '/orders/search',
      method: 'GET',
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
      params: params,
    })

    const data = api.data as OrdersSearchResponse
    return Result.ok(data)

  } catch (err: any) {
    const error: AxiosError<AiqError> = err
    if (error.response) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }

}
