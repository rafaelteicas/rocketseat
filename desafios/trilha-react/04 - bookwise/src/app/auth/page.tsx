'use client'

import Image from 'next/image'
import { cover, github, google, rocket, logo } from '../../assets'
import { signIn } from 'next-auth/react'
import { AuthButton } from './components/auth-button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  function handleSignInGoogle() {
    signIn('google', {
      callbackUrl: '/app',
    })
  }

  function handleSignInGitHub() {
    signIn('github', {
      callbackUrl: '/app',
    })
  }

  return (
    <main className="flex items-center justify-evenly ">
      <div className="relative h-screen p-5">
        <Image
          src={logo}
          width={232}
          height={58}
          alt="Logo"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={cover}
          className="h-full w-full rounded-[10px]"
          quality={100}
          priority
          alt="Cover Image"
        />
      </div>
      <div className="flex flex-col">
        <div className="mb-10">
          <h1 className="gray-200 text-2xl font-bold">Boas vindas!</h1>
          <p className="text-base font-normal">
            Faça seu login ou acesse como visitante.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <AuthButton
            src={google}
            title="Entrar com Google"
            onClick={handleSignInGoogle}
          />
          <AuthButton
            src={github}
            title="Entrar com GitHub"
            onClick={handleSignInGitHub}
          />
          <AuthButton
            src={rocket}
            title="Acessar como visitante"
            onClick={() => router.push('/app')}
          />
        </div>
      </div>
    </main>
  )
}
