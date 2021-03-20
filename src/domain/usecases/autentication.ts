import { AccountModel } from '../models/account-model'

type AutenticationParams = {
    email: string
    password: string
}

export interface Autentication {
    auth (params: AutenticationParams): Promise<AccountModel>
}