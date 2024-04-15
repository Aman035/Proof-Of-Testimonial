import { config } from '../config'

export const submitPassport = async (address: string): Promise<Response> => {
  const headers = new Headers({
    'X-API-KEY': config.gitcoinAPIKey,
    'Content-Type': 'application/json',
  })

  const body = JSON.stringify({
    address: address,
    scorer_id: config.gitcoinScorerId,
  })

  const response = await fetch(config.gitcoinURL, {
    method: 'POST',
    headers: headers,
    body: body,
  })
  return response
}
