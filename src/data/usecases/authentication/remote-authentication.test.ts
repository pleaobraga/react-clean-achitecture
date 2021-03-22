import { RemoteAuthentication } from './remote-athentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  HttpClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const HttpClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, HttpClientSpy)
  return {
    sut,
    HttpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const {
      sut,
      HttpClientSpy
    } = makeSut(url)
    await sut.auth()
    expect(HttpClientSpy.url).toBe(url)
  })
})
