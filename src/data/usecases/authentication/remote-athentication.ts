import { AuthenticationParams } from '@/domain/usecases/autentication'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.HttpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
