import axios, { AxiosError } from "axios"
import { Result } from "true-myth"
import { AiqError, DefaultAiqError } from "./default_error"
import { AppStorage } from "./app_storage"

export interface OrderSearchResponse {
  data: Data
}

export interface Data {
  id: number
  delivery_time: string
  created_at: string
  is_ready: boolean
  is_read: boolean
  is_cancelled: boolean
  is_in_separation: boolean
  is_delivered: boolean
  order_observations: string
  is_aiqentrega_delivery: boolean
  is_pickup: boolean
  pickup_at: any
  coupon_hash: any
  user_rating_value: any
  is_scheduled: boolean
  scheduled_dates: any
  items: Item[]
  cancelled_items: any[]
  replaced_items: any[]
  user: User
  payment_method: PaymentMethod
  store: Store
  timeline: Timeline
  aiqentrega: Aiqentrega
}

export interface Item {
  id: any
  order_item_id: number
  name: string
  replacement_type: number
  status: number
  sku: any
  category_name: string
  size: string
  unit_value: number
  promotional_value: any
  quantity: number
  discount_tax: any
  description: string
  observations: string
  unit_packing_fee: string
  order_mandatory_items: OrderMandatoryItem[]
  order_additional_items: OrderAdditionalItem[]
  order_item_subitems: OrderItemSubitem[]
}

export interface OrderMandatoryItem {
  id: number
  group: string
  name: string
  value: number
  sku: string
  quantity: number
}

export interface OrderAdditionalItem {
  id: number
  name: string
  value: number
  sku: string
}

export interface OrderItemSubitem {
  id: string
  name: string
  nome: string
  description: string
  sku: string
}

export interface User {
  uuid: string
  name: string
  surname: string
  mobile_phone: string
  phone_number: string
  email: string
  order_count: number
  document_receipt: any
  address: Address
}

export interface Address {
  street_name: string
  number: string
  complement: string
  reference: any
  phone: any
  mobile_phone: any
  neighborhood_name: any
  city_name: string
  state_uf: string
  ibge_code: string
  zip_code: any
  latitude: any
  longitude: any
}

export interface PaymentMethod {
  id: number
  name: string
  subtotal: string
  delivery_tax: string
  total_packing_fee: number
  change: number
  coupon_value: string
  pre_paid: boolean
  service_fee: ServiceFee
  total_cancelled_replaced: number
  original_subtotal: number
  total: number
  taxable_total: number
}

export interface ServiceFee {
  store: number
  aiq: number
  total: number
}

export interface Store {
  id: number
  name: string
  phones: string
  preparation_time: number
}

export interface Timeline {
  created_at: string
  read_at: any
  cancelled_at: any
  ready_at: any
  timezone: string
}

export interface Aiqentrega {
  ride_id: any
  call_at: any
  current_status: any
  delivered_at: any
  last_status: any
  last_status_at: any
  driver_name: any
  driver_phone: any
}

interface Props {
  order_id: number
}

export async function order_search(props: Props): Promise<Result<OrderSearchResponse, AiqError>> {
  try {
    
    const api = await axios({
      url: AppStorage.getItem('base_url') + '/orders/' + props.order_id,
      method: 'GET',
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
    })

    const data = api.data as OrderSearchResponse
    return Result.ok(data)

  } catch (err: any) {
    const error: AxiosError<AiqError> = err
    if (error.response) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }

}
