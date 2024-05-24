"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";

const Header = () => {
  const { data, status } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      className="h-auto w-12 rounded-full object-cover"
                      src={data?.user.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <p className="font-muted-foreground block text-xs">
                      {data?.user?.email}
                    </p>
                  </div>
                </div>
                <Button size="icon" onClick={handleSignOutClick}>
                  <LogOutIcon size={20} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon">
                  <LogInIcon onClick={handleSignInClick} />
                </Button>
              </div>
            </>
          )}

          {data?.user && (
            <>
              <div className="py-6">
                <Separator className="h-[.5px] bg-[#eeeeee]" />
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
                  variant="ghost"
                >
                  <HomeIcon size={16} />
                  <span className="block">Início</span>
                </Button>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
                  variant="ghost"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
                  variant="ghost"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </div>

              <div className="py-6">
                <Separator className="h-[.5px] bg-[#eeeeee]" />
              </div>

              <Button
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                variant="ghost"
              >
                <LogOutIcon onClick={handleSignOutClick} />
                <span className="block">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
