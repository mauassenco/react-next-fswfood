import Header from "@/app/_components/header"
import RestaurantItem from "@/app/_components/restaurant-item"
import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"
import { getServerSession } from "next-auth"

const RecomendedRestaurants = async () => {
  const session = await getServerSession(authOptions)
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  })

  const restaurants = await db.restaurant.findMany({})

  return (
    <div className="lg:container">
      <Header />
      <div className="px-6 py-5">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              key={restaurant.id}
              userFavoriteRestaurants={userFavoriteRestaurants}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecomendedRestaurants
