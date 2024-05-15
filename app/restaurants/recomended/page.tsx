import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecomendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="px-6 py-5">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecomendedRestaurants;
