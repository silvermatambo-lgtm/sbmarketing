export type ProductCategory = 'Posters' | 'Photographs' | 'Books' | 'Magazines' | 'Motorcycles' | 'Memorabilia';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  price?: string;
}

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'poster-1', name: 'Classic Motor Racing Posters', category: 'Posters', description: 'Individually numbered A0, A1 & A2 sizes', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 'photo-1', name: 'Racing Photographs', category: 'Photographs', description: 'Classic car & motorcycle race photos', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80' },
  { id: 'book-1', name: 'Books & Biographies', category: 'Books', description: 'Motor racing & motorcycle titles', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80' },
  { id: 'mag-1', name: 'Magazines', category: 'Magazines', description: 'SA car & bike magazines', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
  { id: 'memorabilia-1', name: 'Memorabilia & Programmes', category: 'Memorabilia', description: 'Rare race programmes & collectibles', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' },
  { id: 'motorcycle-1', name: 'Motorcycle Racing', category: 'Motorcycles', description: 'Posters, photos & literature', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80' },
];

const STORAGE_KEY = 'sbmarketing-products-v1';

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PRODUCTS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: Product[]) {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function resetProducts() {
  saveProducts(DEFAULT_PRODUCTS);
}
