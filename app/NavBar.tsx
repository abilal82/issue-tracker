'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames';

const NavBar = () => {

  // This hook is dependent on browser APIs. So, we have to convert this component into client component.
  const currentpath = usePathname();
  const links = [
    { href : '/', label: 'Dashboard'},
    { href : '/issues' , label : 'issues'}
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><AiFillBug/></Link>
        <ul className='flex space-x-6 '>
          {links.map( link => 
          <Link key={link.href} 
                className={classNames({
                  'text-zinc-950' : link.href === currentpath,
                  'text-zinc-500' : link.href !== currentpath,
                  'hover:text-zinc-800 transition-colors' : true
                })} 
                href={link.href}>{link.label}
          </Link>)}
           {/* {links.map( link => 
          <Link key={link.href} 
                className={`${link.href === currentpath ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`} 
                href={link.href}>{link.label}
          </Link>)} */}
        </ul>
    </nav>
  )
}

export default NavBar