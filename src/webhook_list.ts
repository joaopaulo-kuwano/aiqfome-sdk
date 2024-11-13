import axios, { AxiosError } from "axios";
import { AppStorage } from "./app_storage";
import { AiqError, DefaultAiqError } from "./default_error";
import { Result } from "true-myth";

export interface WebhookListResponse {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  url: string
  status: number
  event_id: number
  event_name: string
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


export async function webhook_list(props: { store_id: string }): Promise<Result<WebhookListResponse, AiqError>> {
  try {
    const api = await axios({
      url: `${AppStorage.getItem('base_url')}/store/${props.store_id}/webhooks`,
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
      method: 'GET'
    })

    const data = api.data as WebhookListResponse
    console.log(data)
    return Result.ok(data)

  } catch (err: any) {
    const error: AxiosError<AiqError> = err
    if (error.response?.data) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }
}
