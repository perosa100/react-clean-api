import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResonse: AxiosResponse<any>
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
