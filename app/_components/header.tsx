"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import {
  CakeSliceIcon,
  ChefHatIcon,
  CupSodaIcon,
  HandPlatterIcon,
  HeartIcon,
  HomeIcon,
  JapaneseYenIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PizzaIcon,
  ScrollTextIcon,
} from "lucide-react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"

const Header = () => {
  const { data } = useSession()

  const handleSignOutClick = () => signOut()
  const handleSignInClick = () => signIn()

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
        <SheetTrigger asChild>
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
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator className="h-[0.5px] bg-[#EEEEEE]" />
          </div>

          <div className="space-y-2">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              >
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Button>
            </Link>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator className="h-[0.5px] bg-[#EEEEEE]" />
          </div>

          <div className="">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/9c281385-65f4-43af-9f53-fe41eceeb9c1/products">
                <CakeSliceIcon size={16} />
                <span className="block">Sobremesas</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/7cc22afb-639e-4104-beb7-b0e9e59a3d91/products">
                <CupSodaIcon size={16} />
                <span className="block">Sucos</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/c4f2f117-2e56-40ef-a56b-b92f0306d985/products">
                <HandPlatterIcon size={16} />
                <span className="block">Hambúrgueres</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/29f91c28-3dc2-41ec-9720-f1fdce3b1969/products">
                <PizzaIcon size={16} />
                <span className="block">Pizzas</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/48bfd0c4-b574-41d7-a018-ad895893f1eb/products">
                <ChefHatIcon size={16} />
                <span className="block">Brasileira</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/5d60817f-88f5-4778-9c1a-fd5aa3f9229d/products">
                <JapaneseYenIcon size={16} />
                <span className="block">Japonesa</span>
              </Link>
            </Button>
          </div>

          <div className="py-6">
            <Separator className="h-[0.5px] bg-[#EEEEEE]" />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Header
