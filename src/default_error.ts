export interface AiqError {
  success: boolean
  data: {
    message: string
    track_id: string
    error_code: string
  }
}

export const DefaultAiqError: AiqError = {
  success: false,
  data: {
    error_code: '',
    message: 'url inacessivel',
    track_id: '',
  }
}