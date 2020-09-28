import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any> {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResonse: AxiosResponse
    try {
      axiosResonse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResonse = error.response
    }
    return {
      statusCode: axiosResonse.status,
      body: axiosResonse.data
    }
  }

  async get(params: HttpGetParams): Promise<void> {
    await axios.get(params.url)
  }
}
