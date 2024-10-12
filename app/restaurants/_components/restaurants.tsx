"use client"

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { notFound, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { searchForRestaurants } from "../_actions/serach"
import Header from "@/app/_components/header"
import RestaurantItem from "@/app/_components/restaurant-item"

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const searchFor = searchParams.get("search")

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurants(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor])

  if (!searchFor) {
    return notFound()
  }

  return (
    <div className="lg:container">
      <Header />
      <div className="px-5 py-6 ">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6 lg:grid lg:grid-cols-4 ">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              userFavoriteRestaurants={userFavoriteRestaurants}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Restaurants
