import { RemoteAuthentication } from './remote-athentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

type SutTypes = {
  sut: RemoteAuthentication
  HttpClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const HttpClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, HttpClientSpy)
  return {
    sut,
    HttpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    const url = 'other_url'
    const {
      sut,
      HttpClientSpy
    } = makeSut()
    await sut.auth()
    expect(HttpClientSpy.url).toBe(url)
  })
})
