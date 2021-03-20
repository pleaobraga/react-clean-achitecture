import { RemoteAuthentication } from './remote-athentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    const HttpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, HttpClientSpy)
    await sut.auth()
    expect(HttpClientSpy.url).toBe(url)
  })
})
