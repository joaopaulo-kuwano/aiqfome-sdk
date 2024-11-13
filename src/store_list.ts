import axios, { AxiosError } from "axios"
import { Result } from "true-myth"
import { AiqError, DefaultAiqError } from "./default_error"
import { AppStorage } from "./app_storage"

export interface StoreListResponse {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  name: string
  phones: string
  virtual_avatar: any
  status: string
  aiqentrega_active: boolean
  aiqentrega_auto_call_motoboy: boolean
  aiqentrega_max_orders_per_ride: number
  address: Address
}

export interface Address {
  street_name: string
  number: string
  city_name: string
  state_uf: string
}

export interface Links {
  first: string
  last: string
  prev: any
  next: any
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  active: boolean
}


interface Props {
  page?: string
  per_page?: string
  id?: string
  name?: string
  city_ids?: string // 1,2,3
}

export async function store_list(props: Props): Promise<Result<StoreListResponse, AiqError>> {
  try {

    const params = {} as any
    if (props.page) params.page = props.page
    if (props.per_page) params.per_page = props.per_page
    if (props.id) params['filter[id]'] = props.id
    if (props.name) params['filter[name]'] = props.name
    if (props.city_ids) params['filter[city_ids]'] = props.city_ids
    
    const api = await axios({
      url: AppStorage.getItem('base_url') + '/store',
      method: 'GET',
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
      params: params,
    })

    const data = api.data as StoreListResponse
    return Result.ok(data)

  } catch (err: any) {
    const error: AxiosError<AiqError> = err
    if (error.response?.data) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }

}
