import { Link } from "lucide-react"
import React from "react"
import PromoBanner from "./promo-banner"
import { db } from "../_lib/prisma"

const getBurguersCategory = db.category.findFirst({
  where: {
    name: "Hambúrgueres",
  },
})

const DoubleBanner = () => {
  return (
    <section className="hidden lg:grid lg:grid-cols-2">
      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${pizzaCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>
    </section>
  )
}

export default DoubleBanner
