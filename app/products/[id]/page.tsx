import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"
import ProductImage from "./_components/product-image"
import ProductDetails from "./_components/product-details"

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  })

  if (!product) {
    return notFound()
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <div className="lg:container">
      {/* IMAGEM */}
      <ProductImage product={JSON.parse(JSON.stringify(product))} />

      {/* TITULO E PREÇO */}
      <ProductDetails
        product={JSON.parse(JSON.stringify(product))}
        complementaryProducts={juices}
      />
    </div>
  )
}

export default ProductPage
