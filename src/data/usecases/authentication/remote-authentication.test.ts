import { RemoteAuthentication } from './remote-athentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { HttpStatusCode } from '@/data/protocols/http/http-reponse'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credential-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/autentication'
import { AccountModel } from '@/domain/models/account-model'

type SutTypes = {
  sut: RemoteAuthentication
  HttpClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const HttpClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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
    const { sut, HttpClientSpy } = makeSut()
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

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const {
      sut,
      HttpClientSpy
    } = makeSut()
    HttpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const {
      sut,
      HttpClientSpy
    } = makeSut()
    HttpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const {
      sut,
      HttpClientSpy
    } = makeSut()
    HttpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
