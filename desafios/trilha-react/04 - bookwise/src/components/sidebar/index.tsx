'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  SignIn,
  SignOut,
  Binoculars,
  ChartLineUp,
  User,
} from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '../avatar'
import { NavItem } from './NavItem'
import logo from '../../assets/logo.svg'
import sidebarBg from './sidebarBg.svg'

export function Sidebar() {
  const session = useSession()

  function handleSignOut() {
    signOut({ callbackUrl: '/auth' })
  }

  return (
    <aside className="flex h-screen">
      <div
        className="fixed bottom-5 top-5 flex w-[256px] flex-1 flex-col items-center justify-center rounded-md"
        style={{
          backgroundImage: `url(${sidebarBg.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex-1">
          <Image
            src={logo}
            alt=""
            width={120}
            height={100}
            quality={100}
            priority
            className="pt-10"
          />
          <nav className="flex flex-col justify-center space-y-4 pt-16">
            <NavItem icon={ChartLineUp} path="/app" name="Home" />
            <NavItem icon={Binoculars} path="/app/explore" name="Explorar" />
            {session.data && (
              <NavItem icon={User} path="/app/profile" name={'Perfil'} />
            )}
          </nav>
        </div>
        <footer className="pb-5">
          {session.data ? (
            <div className="flex flex-row items-center gap-3">
              <Avatar avatarUri={session.data?.user?.image as string} />
              <p className="text-gray-200">
                {session.data?.user?.name?.split(' ')[0]}
              </p>
              <SignOut
                size={20}
                className="cursor-pointer fill-danger"
                onClick={handleSignOut}
              />
            </div>
          ) : (
            <Link href={'/auth'} className="flex flex-row items-center gap-2">
              <h4>Fazer login</h4>
              <SignIn size={20} className="fill-green-100" />
            </Link>
          )}
        </footer>
      </div>
    </aside>
  )
}
