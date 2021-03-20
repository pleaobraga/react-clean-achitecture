import { RemoteAuthentication } from './remote-athentication'
import { HttpPostClient } from '../../protocols/http/http-post-client'

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
      }
    }
    const url = 'any_url'
    const HttpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, HttpClientSpy)
    await sut.auth()
    expect(HttpClientSpy.url).toBe(url)
  })
})
