import { QuoteItem, QuoteItemOptions } from "@/src/domain/models/Quote";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuoteState {
  items: QuoteItem[];
  
  // Actions
  addItem: (
    productSlug: string,
    productName: string,
    quantity: number,
    thumbnailUrl?: string,
    options?: QuoteItemOptions
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  updateOptions: (id: string, options: QuoteItemOptions) => void;
  clearQuote: () => void;
  
  // Computed (will be derived in the components, or use selector)
  getTotalItems: () => number;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productSlug, productName, quantity, thumbnailUrl, options) => {
        set((state) => {
          // Check if item already exists (same slug and same options)
          // Simplified: We'll just append a new item for now, or match by slug to just increment
          // A more robust way is to generate a unique ID based on properties
          
          const existingItemIndex = state.items.findIndex(
            (item) => item.productSlug === productSlug && 
                      JSON.stringify(item.options) === JSON.stringify(options)
          );

          if (existingItemIndex >= 0) {
            // Update quantity of existing item
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          // Generate a simple ID
          const id = `${productSlug}-${Date.now()}`;
          return {
            items: [
              ...state.items,
              { id, productSlug, productName, quantity, thumbnailUrl, options },
            ],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
          ),
        })),

      updateOptions: (id, options) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...options } : item
          ),
        })),

      clearQuote: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.length;
        // Or if you want total QUANTITY: return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "zeus-quote-storage", // prefix for localStorage
    }
  )
);
