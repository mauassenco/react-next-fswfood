import CategoryList from "./_components/category-list"
import Header from "./_components/header"
import Search from "./_components/search"
import ProductList from "./_components/product-list"
import { Button } from "./_components/ui/button"
import { ChevronRightIcon } from "lucide-react"
import { db } from "./_lib/prisma"
import PromoBanner from "./_components/promo-banner"
import RestaurantList from "./_components/restaurant-list"
import Link from "next/link"
import Hero from "./_components/hero"

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  })

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  })

  const [products, burguersCategory, pizzaCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ])

  return { products, burguersCategory, pizzaCategory }
}

const Home = async () => {
  const { products, burguersCategory, pizzaCategory } = await fetch()

  return (
    <main className="lg:container">
      <Header />

      <div className=" px-5 pt-6 lg:hidden">
        <Search />
      </div>
      <div className=" px-5 pt-6 ">
        <Hero />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${pizzaCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recomended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={JSON.parse(JSON.stringify(products))} />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="hidden lg:grid lg:grid-cols-2">
        <div className="px-5 pt-6 ">
          <Link href={`/categories/${pizzaCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas!"
            />
          </Link>
        </div>

        <div className="px-5 pt-6 ">
          <Link href={`/categories/${burguersCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-02.png"
              alt="A partir de R$17,90 em lanches"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-4 py-6 ">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recomended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <RestaurantList />
      </div>
    </main>
  )
}

export default Home
