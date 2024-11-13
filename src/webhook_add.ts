import axios, { AxiosError } from "axios";
import { AppStorage } from "./app_storage";
import { AiqError, DefaultAiqError } from "./default_error";
import { Result } from "true-myth";

export interface WebhookAddResponse {
  data: Daum[]
}

export interface Daum {
  id: number
  url: string
  status: number
  event_id: number
  event_name: string
}

export async function webhook_add (props: { store_id: number, event: number, url: string }): Promise<Result<WebhookAddResponse, AiqError>> {
  try {
    const api = await axios({
      url: `${AppStorage.getItem('base_url')}/store/${props.store_id}/webhooks/`,
      method: 'POST',
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
      data: {
        webhooks: [
          {
            secret_key: 'Basic YWlxZm9tZToxJFBoOEJJTzY0',
            webhook_event_id: props.event,
            url: props.url
          }
        ]
      }
    })

    const data = api.data as WebhookAddResponse
    return Result.ok(data)

  } catch (err: any) {
    const error: AxiosError<AiqError> = err
    if (error.response?.data) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  }
}
