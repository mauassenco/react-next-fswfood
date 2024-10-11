/* eslint-disable @next/next/no-img-element */
import Search from "./search"
import Image, { ImageProps } from "next/image"
const Hero = () => {
  return (
    <section className="relative flex h-[500px] w-full items-center justify-between overflow-hidden bg-primary px-[7%]">
      <div className="w-1/2 max-w-[600px] space-y-4">
        <h1 className="text-5xl font-bold text-white 2xl:text-7xl">
          Está com fome?
        </h1>
        <p className="text-sm text-white 2xl:text-lg">
          Com apenas alguns cliques, encontre refeições acessíveis perto de
          você.
        </p>
        <div className="rounded-md bg-white p-6">
          <Search />
        </div>
      </div>
      <div className="w-1/2 max-w-[450px]">
        <img
          src="/dish-banner-desktop.png"
          className="absolute -bottom-10 right-[7%] h-auto w-[50vw] max-w-[450px] object-contain"
          alt="Com apenas alguns cliques, encontre refeições acessíveis perto de você."
        />
      </div>
    </section>
  )
}

export default Hero
