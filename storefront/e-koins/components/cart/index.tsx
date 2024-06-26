"use server";

import { createCart, getCart } from 'lib/medusa';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  let cart;
  cart = await createCart();

  //const cFactory = cookies();
  //const cartId = cFactory.get('cartId')?.value;

  return <CartModal cart={cart} />;
  /*
  if (cartId) {
    cart = await getCart(cartId);
  }

  // If the `cartId` from the cookie is not set or the cart is empty
  // (old carts becomes `null` when you checkout), then get a new `cartId`
  //  and re-fetch the cart.
  if (!cartId || !cart) {
    cart = await createCart();
  }

  return <CartModal cart={cart} />;
  */
}
