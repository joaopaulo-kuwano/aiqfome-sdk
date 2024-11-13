import { Result } from 'true-myth'
import { auth_token, AuthTokenResponse } from './auth_token'
import { AppStorage } from './app_storage'
import { orders_search, OrdersSearchResponse } from './orders_search'
import { AiqError } from './default_error'
import { order_search, OrderSearchResponse } from './order_search'
import { store_list, StoreListResponse } from './store_list'

/**   
  private access_token: string
  private refresh_token: string
  private base_url: string
  private client_id: string
  private client_secret: string
  private client_authorization: string
  private user_agent: string
  private user_login: string
  private user_pass: string
 */

export class Aiqfome {

  constructor() { }

  async auth_token(params: {
    base_url: string
    client_id: string
    client_secret: string
    client_authorization: string
    user_agent: string
    user_login: string
    user_pass: string
  }): Promise<Result<AuthTokenResponse, AiqError>> {
    const api = await auth_token({
      url: params.base_url,
      agent: params.user_agent,
      authorization: params.client_authorization,
      id: params.client_id,
      secret: params.client_secret,
      user: params.user_login,
      pass: params.user_pass
    })

    if (api.isErr) return Result.err(api.error)

    AppStorage.setItem('access_token', api.value.data.access_token)
    AppStorage.setItem('refresh_token', api.value.data.refresh_token)
    AppStorage.setItem('base_url', params.base_url)
    AppStorage.setItem('client_id', params.client_id)
    AppStorage.setItem('client_secret', params.client_secret)
    AppStorage.setItem('client_authorization', params.client_authorization)
    AppStorage.setItem('user_agent', params.user_agent)
    AppStorage.setItem('user_login', params.user_login)
    AppStorage.setItem('user_pass', params.user_pass)

    return Result.ok(api.value)
  }

  async orders_search(props: {
    date_start?: string // YYYY-MM-DD
    date_end?: string // YYYY-MM-DD
    page?: string // num
    per_page?: string // num
    order_id?: string // id pedido indiv.
    order_ids?: string // separar por virgula => 1,2,3
    delivery_id?: string
    user_email?: string
    store_id?: string
  }): Promise<Result<OrdersSearchResponse, AiqError>> {
    return await orders_search({ ...props })
  }

  async order_search(props: { order_id: number }): Promise<Result<OrderSearchResponse, AiqError>> {
    return await order_search({ ...props })
  }

  async store_list(props: {
    page?: string
    per_page?: string
    id?: string
    name?: string
    city_ids?: string
  }): Promise<Result<StoreListResponse, AiqError>> {
    return await store_list({ ...props })
  }

  

}
