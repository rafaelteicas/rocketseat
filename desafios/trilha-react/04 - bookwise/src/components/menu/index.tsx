'use client'

import React from 'react'
import Image from 'next/image'
import { Text } from '../text'
import { MenuLink } from './menu-link'
import backgroundMenu from '@/assets/background-menu.svg'
import Link from 'next/link'
import { SignIn, SignOut } from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '../avatar'

export interface NavProps {
  name: string
  path: string
  icon: 'chartLineUp' | 'binoculars' | 'user'
}

const navLinks: NavProps[] = [
  {
    name: 'Home',
    path: '/app',
    icon: 'chartLineUp',
  },
  {
    name: 'Explorar',
    path: '/app/explore',
    icon: 'binoculars',
  },
]

export function Menu() {
  const session = useSession()

  function handleSignOut() {
    signOut({ callbackUrl: '/auth' })
  }

  return (
    <aside
      className=" flex w-[280px] h-[calc(100vh-40px)] rounded-md flex-col items-center justify-between"
      style={{
        backgroundImage: `url(${backgroundMenu.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col items-center">
        <Image
          src={'/brand/logo.svg'}
          alt=""
          width={120}
          height={100}
          quality={100}
          priority
          className="pt-10"
        />
        <nav className="pt-16 flex justify-center flex-col gap-4">
          {navLinks.map(({ icon, name, path }) => (
            <MenuLink icon={icon} path={path} name={name} key={name} />
          ))}
          {session && (
            <MenuLink icon="user" path="/app/profile" name={'Perfil'} />
          )}
        </nav>
      </div>
      <footer className="pb-5">
        {session ? (
          <div className="flex flex-row items-center gap-3">
            <Avatar avatarUri={session.data?.user?.image as string} />
            <Text preset="textSmall" className="text-gray-200">
              {session.data?.user?.name?.split(' ')[0]}
            </Text>
            <SignOut
              size={20}
              className="fill-danger cursor-pointer"
              onClick={handleSignOut}
            />
          </div>
        ) : (
          <Link href={'/auth'} className="flex flex-row items-center gap-2">
            <Text preset="buttonMedium">Fazer login</Text>
            <SignIn size={20} className="fill-green-100" />
          </Link>
        )}
      </footer>
    </aside>
  )
}
