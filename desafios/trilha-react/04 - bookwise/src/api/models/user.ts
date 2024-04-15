import { BookModel } from './book'

export interface UserModel {
  id: string // 'f3aa31fb-aa7e-43ff-9959-98bb97267a0f'
  name: string // 'Rafael Teixeira de Castro'
  email: string // 'rafaelteicas@gmail.com'
  avatar_url: string // 'https://lh3.googleusercontent.com/a/ACg8ocLml2S6nRObZ_XgVzYUX0u-YXP-z3mfs7fn8h1aQ5YEnu8=s96-c'
  created_at: string // '2024-04-02T22:27:24.592Z'
  ratings: [
    {
      id: string // 'd137a3c4-5d1e-47b7-af3e-973324c2d12b'
      rate: number // 5
      description: string // 'aa'
      created_at: string // '2024-04-02T22:59:50.588Z'
      book_id: string // '375948a7-bca3-4b59-9f97-bfcde036b4ca'
      user_id: string // 'f3aa31fb-aa7e-43ff-9959-98bb97267a0f'
      book: BookModel
    },
  ]
  readPages: number
  ratedBooks: number
  authors: number
}
