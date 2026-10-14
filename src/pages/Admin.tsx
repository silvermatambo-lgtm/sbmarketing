import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ImagePlus, LogOut, Plus, Trash2, Upload } from 'lucide-react';
import { getProducts, saveProducts, type Product, type ProductCategory } from '../data/products';

const PASSWORD = '280385';
const CATEGORIES: ProductCategory[] = ['Posters', 'Photographs', 'Books', 'Magazines', 'Motorcycles', 'Memorabilia'];

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', category: 'Magazines' as ProductCategory, description: '', price: '', image: '' });

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem('sbmarketing-admin') === 'true');
    setProducts(getProducts());
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem('sbmarketing-admin', 'true');
      setAuthenticated(true);
      setError('');
      setPassword('');
    } else setError('Incorrect password. Please try again.');
  };

  const logout = () => {
    sessionStorage.removeItem('sbmarketing-admin');
    setAuthenticated(false);
  };

  const imageToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleImage = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    if (file.size > 3 * 1024 * 1024) { setError('Please keep images under 3MB.'); return; }
    try {
      const image = await imageToDataUrl(file);
      setForm((f) => ({ ...f, image }));
      setError('');
    } catch {
      setError('Could not read that image. Please try another one.');
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.image) { setError('Please add a name, description and product image.'); return; }
    const next: Product = { id: `${Date.now()}`, name: form.name.trim(), category: form.category, description: form.description.trim(), image: form.image, ...(form.price.trim() ? { price: form.price.trim() } : {}) };
    const updated = [next, ...products];
    saveProducts(updated);
    setProducts(updated);
    setForm({ name: '', category: 'Magazines', description: '', price: '', image: '' });
    setError('');
  };

  const deleteProduct = (id: string) => {
    if (!window.confirm('Remove this item from the website?')) return;
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
  };

  if (!authenticated) return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 pt-16">
      <form onSubmit={login} className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
        <div className="flex justify-center mb-5"><img src="/logo.png" alt="S&B Marketing Motor Sport" className="h-20 w-20 object-contain" /></div>
        <h1 className="text-2xl font-bold text-stone-900 text-center">Owner Admin</h1>
        <p className="text-sm text-stone-500 text-center mt-2 mb-7">Manage magazines, books, posters and other items.</p>
        <input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-red-500" />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button className="w-full mt-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold">Login</button>
        <Link to="/" className="flex items-center justify-center gap-2 text-sm text-stone-500 mt-5 hover:text-red-600"><ArrowLeft size={16} /> Back to website</Link>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"><div><p className="section-tag">Private area</p><h1 className="text-3xl font-bold text-stone-900">Product Admin</h1><p className="text-stone-500 text-sm mt-1">Add new stock or remove items from the homepage and collection.</p></div><div className="flex gap-2"><Link to="/" className="px-4 py-2.5 bg-white rounded-xl text-sm font-medium border border-stone-200 flex items-center gap-2"><ArrowLeft size={16}/> Website</Link><button onClick={logout} className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium flex items-center gap-2"><LogOut size={16}/> Logout</button></div></div>
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          <form onSubmit={addProduct} className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 h-fit">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2"><Plus size={20}/> Add New Item</h2>
            <div className="space-y-4 mt-5">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Item / magazine name" className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-red-500" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm bg-white">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (optional) e.g. R350" className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-red-500" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description / condition / edition details" rows={4} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-red-500 resize-none" />
              <label className="block border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center cursor-pointer hover:border-red-400 transition-colors">{form.image ? <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3" /> : <ImagePlus className="mx-auto text-stone-400 mb-2" size={32}/>}<span className="text-sm font-medium text-stone-600 flex items-center justify-center gap-2"><Upload size={15}/> Choose product image</span><input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e.target.files?.[0])}/></label>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"><Plus size={18}/> Add to Collection</button>
            </div>
          </form>
          <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200"><div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold text-stone-900">Current Collection</h2><span className="text-xs bg-stone-100 rounded-full px-3 py-1 text-stone-600">{products.length} items</span></div><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{products.map((product)=><div key={product.id} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50"><img src={product.image} alt={product.name} className="w-full h-36 object-cover"/><div className="p-4"><span className="text-[10px] uppercase tracking-wider text-red-600 font-bold">{product.category}</span><h3 className="font-bold text-stone-800 mt-1 text-sm">{product.name}</h3>{product.price&&<p className="text-red-600 font-semibold text-sm mt-1">{product.price}</p>}<p className="text-xs text-stone-500 mt-2 line-clamp-2">{product.description}</p><button onClick={()=>deleteProduct(product.id)} className="mt-3 text-xs text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={14}/> Remove</button></div></div>)}</div></div>
        </div>
      </div>
    </div>
  );
}
