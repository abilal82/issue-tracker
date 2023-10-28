// This hook is dependent on browser APIs. So, we have to convert this component into client component.
"use client";

import { Skeleton } from '@/app/components'
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const { status, data: session } = useSession();
  return (
    <nav className="border-b mb-5 px-5 py-5 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentpath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "issues" },
  ];

  return (
    <ul className="flex space-x-6 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link  className={classNames({
              "!text-zinc-950": link.href === currentpath,
              "nav-link": true,
            })}  href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width='1.75rem' height='1.75rem' circle={true}/>
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin" className="nav-link">Login</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="U"
            color="blue"
            variant="soft"
            radius="full"
            size="2"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{session!.user!.name}</DropdownMenu.Label>
          <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ E">
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default NavBar;

    // {/* {links.map( link => 
    //       <Link key={link.href} 
    //             className={`${link.href === currentpath ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`} 
    //             href={link.href}>{link.label}
    //       </Link>)} */}