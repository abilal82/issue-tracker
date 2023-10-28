"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";

const NavBar = () => {
  // This hook is dependent on browser APIs. So, we have to convert this component into client component.
  const currentpath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "issues" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-5 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6 ">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-950": link.href === currentpath,
                      "text-zinc-500": link.href !== currentpath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* {links.map( link => 
          <Link key={link.href} 
                className={`${link.href === currentpath ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`} 
                href={link.href}>{link.label}
          </Link>)} */}
            </ul>
          </Flex>

          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar src={session.user!.image!} fallback="U"  color="blue" variant="soft" radius="full" size='2'/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user!.name}</DropdownMenu.Label>
                  <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item shortcut="⌘ E"><Link href="/api/auth/signout">Logout</Link></DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
