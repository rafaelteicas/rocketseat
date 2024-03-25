'use client'

import React from 'react'
import Image from 'next/image'
import { Text } from '../text'
import { MenuLink } from './menu-link'
import backgroundMenu from '@/assets/background-menu.svg'
import Link from 'next/link'
import { SignIn } from '@phosphor-icons/react'

export interface NavProps {
  name: string
  path: string
  icon: 'chartLineUp' | 'binoculars'
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
  return (
    <aside
      className=" flex w-[280px] max-h-[800px] rounded-md flex-col items-center justify-between"
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
        </nav>
      </div>
      <footer className="pb-5">
        <Link href={'/auth'} className="flex flex-row items-center gap-2">
          <Text preset="buttonMedium">Fazer login</Text>
          <SignIn size={20} className="fill-green-100" />
        </Link>
      </footer>
    </aside>
  )
}
