import Header from "@/app/_components/header"
import ProductItem from "@/app/_components/product-item"
import { db } from "@/app/_lib/prisma"

const RecomendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="lg:container">
      <Header />
      <div className="px-6 py-5">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecomendedProductsPage
