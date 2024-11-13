import axios, { AxiosError } from "axios";
import { Result } from "true-myth";
import { AiqError, DefaultAiqError } from "./default_error";
import { AppStorage } from "./app_storage";

export interface WebhookDeleteResponse {  }

export async function webhook_delete(props: { store_id: number, hook_id: number }): Promise<Result<WebhookDeleteResponse, AiqError>> {
  try {
    const api = await axios({
      url: `${AppStorage.getItem('base_url')}/store/${props.store_id}/webhooks/${props.hook_id}`,
      headers: {
        'Aiq-User-Agent': AppStorage.getItem('user_agent'),
        'aiq-client-authorization': AppStorage.getItem('client_authorization'),
        'Authorization': 'Bearer ' + AppStorage.getItem('access_token'),
      },
      method: 'DELETE'
    })

    const data = api.data as WebhookDeleteResponse
    return Result.ok(data)

  } catch (err: any) {

    const error: AxiosError<AiqError> = err
    if (error.response?.data) return Result.err(error.response.data)
    return Result.err(DefaultAiqError)
  
  }
}
