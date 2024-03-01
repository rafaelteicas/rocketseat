import { api } from '@/lib/axios'

export async function signOut() {
  api.post('/sign-out')
}
