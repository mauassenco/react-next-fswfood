"use client"

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "../_helpers/price"
import { Button } from "./ui/button"
import Link from "next/link"
import { cn } from "../_lib/utils"
import { useSession } from "next-auth/react"
import useToggleFavoriteRestaurant from "../_hooks/use-toggle-favorite-restaurant"

interface RestaurantItemProps {
  restaurant: Restaurant
  className?: string
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession()
  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  )

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  })

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="relative h-[136px] w-full">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
          />
        </Link>
        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px] ">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
        {data?.user.id && (
          <Button
            className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-600 hover:bg-primary ${isFavorite && "bg-primary hover:bg-gray-600"}`}
            size="icon"
            onClick={handleFavoriteClick}
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        )}
      </div>
      <div className="pt-2">
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantItem
