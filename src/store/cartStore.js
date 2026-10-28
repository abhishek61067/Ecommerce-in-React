import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(devtools(
    (set) => ({
      cart: [], // array of {id, quantity}

      addToCart: (id) =>
        set((state) => {
          const exists = state.cart.find((item) => item.id === id);
          if (exists) {
            // increment quantity if already in cart
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { cart: [...state.cart, { id, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
    }),
  {
    enabled: true, // enable devtools
    name: "cart-store", // name of the store in devtools
  }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
