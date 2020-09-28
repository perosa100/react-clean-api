import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any> {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResonse: AxiosResponse
    try {
      httpResonse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResonse = error.response
    }
    return {
      statusCode: httpResonse.status,
      body: httpResonse.data
    }
  }
}
