import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/prices";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>

            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className=" text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>
                  <Separator className="h-[0.5px] bg-[#EEEEEE]" />

                  <div className="flex items-center justify-between text-xs">
                    <span className=" text-muted-foreground">Descontos</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>
                  <Separator className="h-[0.5px] bg-[#EEEEEE]" />

                  <div className="flex items-center justify-between text-xs">
                    <span className=" text-muted-foreground">Entrega</span>
                    {Number(products[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(Number(products[0].restaurant.deliveryFee))
                    )}
                  </div>
                  <Separator className="h-[0.5px] bg-[#EEEEEE]" />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>
                      {Number(products[0].restaurant.deliveryFee) === 0
                        ? formatCurrency(totalPrice)
                        : formatCurrency(
                            totalPrice +
                              Number(products[0].restaurant.deliveryFee),
                          )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="mt-6 w-full">Finalizar pedido</Button>
          </>
        ) : (
          <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
        )}
      </div>
    </>
  );
};

export default Cart;