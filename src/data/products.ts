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

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, { credentials: 'same-origin', cache: 'no-store', ...options });
  let result: Record<string, unknown>;
  try { result = await response.json(); } catch { throw new Error('Could not contact the server'); }
  if (!response.ok) throw new Error(typeof result.error === 'string' ? result.error : 'Request failed');
  return result as T;
}

export async function fetchProducts(): Promise<Product[]> {
  return (await api<{products: Product[]}>('/api/products')).products;
}

export async function checkAdmin(): Promise<boolean> {
  return (await api<{authenticated: boolean}>('/api/auth')).authenticated;
}
export async function signIn(password: string): Promise<void> {
  await api('/api/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({password}) });
}
export async function signOut(): Promise<void> {
  await api('/api/auth', { method:'DELETE' });
}
export async function saveProduct(product: Omit<Product,'id'> | Product, importExisting=false): Promise<boolean> {
  const result = await api<{inserted: boolean}>('/api/products', {
    method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...product, importExisting})
  });
  return result.inserted;
}
export async function removeProduct(id: string): Promise<void> {
  await api('/api/products?id=' + encodeURIComponent(id), {method:'DELETE'});
}
export async function uploadImage(file: File): Promise<string> {
  if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type) || file.size > 3*1024*1024) {
    throw new Error('Choose a JPG, PNG, WebP or GIF under 3MB.');
  }
  const result = await api<{url: string}>('/api/upload', {
    method:'POST', headers:{'Content-Type':file.type}, body:file
  });
  return result.url;
}
export function browserSavedProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items.filter(x=>x && typeof x === 'object' && typeof x.id === 'string') as Product[] : [];
  } catch { return []; }
}
