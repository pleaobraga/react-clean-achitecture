import { RemoteAuthentication } from './remote-athentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credential-error'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http/http-reponse'

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
    await sut.auth(mockAuthentication())
    expect(HttpClientSpy.url).toBe(url)
  })

  it('Should call HttpClient with correct body', async () => {
    const {
      sut,
      HttpClientSpy
    } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(HttpClientSpy.body).toEqual(authenticationParams)
  })

  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const {
      sut,
      HttpClientSpy
    } = makeSut()
    HttpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
