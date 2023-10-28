'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {

  // This hook is dependent on browser APIs. So, we have to convert this component into client component.
  const currentpath = usePathname();
  const {status , data :session} = useSession();
  const links = [
    { href : '/', label: 'Dashboard'},
    { href : '/issues/list' , label : 'issues'}
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><AiFillBug/></Link>
        <ul className='flex space-x-6 '>
          {links.map( link => 
          <li key={link.href}>
            <Link className={classNames({
                  'text-zinc-950' : link.href === currentpath,
                  'text-zinc-500' : link.href !== currentpath,
                  'hover:text-zinc-800 transition-colors' : true
                })} 
                href={link.href}>{link.label}
          </Link>
          </li>)}
           {/* {links.map( link => 
          <Link key={link.href} 
                className={`${link.href === currentpath ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`} 
                href={link.href}>{link.label}
          </Link>)} */}
        </ul>

        <Box>
          {status === "authenticated" && (<Link href='/api/auth/signout'>Log out</Link>)}
          {status === "unauthenticated" && (<Link href='/api/auth/signin'>Login</Link>)}
        </Box>
    </nav>
  )
}

export default NavBar