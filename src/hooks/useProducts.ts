import { useEffect, useState } from 'react';
import { fetchProducts, type Product } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const latest = await fetchProducts();
        if (active) { setProducts(latest); setError(''); }
      } catch(err) { if (active) setError(err instanceof Error ? err.message : 'Unable to load products'); }
      finally { if (active) setLoading(false); }
    }
    const visible = () => { if (document.visibilityState === 'visible') void refresh(); };
    void refresh();
    const timer = window.setInterval(visible, 30000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', visible);
    return () => {
      active = false; window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', visible);
    };
  }, []);
  return { products, loading, error };
}
