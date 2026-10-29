import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ImagePlus, LogOut, Plus, RefreshCw, Trash2, Upload } from 'lucide-react';
import {
  browserSavedProducts, checkAdmin, fetchProducts, removeProduct, saveProduct,
  signIn, signOut, uploadImage, type Product, type ProductCategory
} from '../data/products';

const CATEGORIES: ProductCategory[] = ['Posters', 'Photographs', 'Books', 'Magazines', 'Motorcycles', 'Memorabilia'];
const EMPTY = { name:'', category:'Magazines' as ProductCategory, description:'', price:'', image:'' };
const errText = (e: unknown) => e instanceof Error ? e.message : 'Something went wrong. Please try again.';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [savedLocally] = useState(browserSavedProducts);
  const [form, setForm] = useState(EMPTY);

  async function refresh() {
    const latest = await fetchProducts();
    setProducts(latest);
    return latest;
  }
  useEffect(() => {
    let active = true;
    async function initialize() {
      try {
        const loggedIn = await checkAdmin();
        if (!active) return;
        setAuthenticated(loggedIn);
        if (loggedIn) await refresh();
      } catch(e) { if (active) setError(errText(e)); }
      finally { if (active) setChecking(false); }
    }
    void initialize();
    return () => { active = false; };
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(''); setNotice('');
    try { await signIn(password); setAuthenticated(true); setPassword(''); await refresh(); if (savedLocally.length) await importSaved(true); }
    catch(e) { setError(errText(e)); } finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true);
    try { await signOut(); setAuthenticated(false); setProducts([]); setError(''); setNotice(''); }
    catch(e) { setError(errText(e)); } finally { setBusy(false); }
  }
  const readImage = (file: File) => new Promise<string>((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  async function handleImage(file?: File) {
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type) || file.size > 3*1024*1024) {
      setError('Choose a JPG, PNG, WebP or GIF image under 3MB.'); return;
    }
    try { const image = await readImage(file); setForm(f=>({...f,image})); setError(''); }
    catch(e) { setError(errText(e)); }
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.image) {
      setError('Please provide a name, description and image.'); return;
    }
    setBusy(true); setError(''); setNotice('');
    try {
      const blob = await (await fetch(form.image)).blob();
      const img = new File([blob], 'product.' + blob.type.split('/')[1], {type:blob.type});
      const url = await uploadImage(img);
      await saveProduct({name:form.name.trim(),category:form.category,description:form.description.trim(),image:url,...(form.price.trim()?{price:form.price.trim()}:{})});
      await refresh();
      setForm(EMPTY);
      setNotice('Saved to the central database. Your item is now available to all visitors.');
    } catch(e) { setError(errText(e)); } finally { setBusy(false); }
  }

  async function remove(id: string) {
    if (!window.confirm('Remove this item from the website for every visitor?')) return;
    setBusy(true); setError(''); setNotice('');
    try { await removeProduct(id); await refresh(); setNotice('Item removed from the shared catalogue.'); }
    catch(e) { setError(errText(e)); } finally { setBusy(false); }
  }

  async function importSaved(automatic = false) {
    if (!automatic && !window.confirm('Import previously saved items from this browser to the shared website database? Existing matching items will not be overwritten.')) return;
    setBusy(true); setError(''); setNotice('');
    let count = 0;
    try {
      const already = await refresh();
      const ids = new Set(already.map(p=>p.id));
      for (const product of savedLocally) {
        if (ids.has(product.id)) continue;
        let url = product.image;
        if (url.startsWith('data:')) {
          const image = await (await fetch(url)).blob();
          const file = new File([image], 'imported.' + image.type.split('/')[1], {type:image.type});
          url = await uploadImage(file);
        }
        if (await saveProduct({...product,image:url},true)) { count++; ids.add(product.id); }
      }
      await refresh();
      setNotice('Successfully imported ' + count + ' previously browser-only items.');
    } catch(e) {
      await refresh().catch(()=>{});
      setError('Imported ' + count + ' items before an error: ' + errText(e));
    } finally { setBusy(false); }
  }

  if (checking) return <div className="min-h-screen bg-stone-100 flex items-center justify-center pt-20">Checking admin access...</div>;
  if (!authenticated) return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 pt-16">
      <form onSubmit={login} className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
        <div className="flex justify-center mb-5"><img src="/logo.png" alt="S&B Marketing Motor Sport" className="h-20 w-20 object-contain" /></div>
        <h1 className="text-2xl font-bold text-stone-900 text-center">Owner Admin</h1>
        <p className="text-sm text-stone-500 text-center mt-2 mb-7">Manage the shared website collection securely.</p>
        <input autoFocus required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password" className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-red-500" />
        {error && <p role="alert" className="text-red-600 text-sm mt-2">{error}</p>}
        <button disabled={busy} className="w-full mt-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold">{busy?'Signing in...':'Login'}</button>
        <Link to="/" className="flex items-center justify-center gap-2 text-sm text-stone-500 mt-5 hover:text-red-600"><ArrowLeft size={16}/> Back to website</Link>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div><p className="section-tag">Private area</p><h1 className="text-3xl font-bold text-stone-900">Product Admin</h1><p className="text-stone-500 text-sm mt-1">Updates are stored in the shared database for all website visitors.</p></div>
          <div className="flex gap-2 flex-wrap">
            <Link to="/" className="px-4 py-2.5 bg-white rounded-xl text-sm border border-stone-200 flex items-center gap-2"><ArrowLeft size={16}/> Website</Link>
            <button disabled={busy} onClick={()=>void refresh().catch(e=>setError(errText(e)))} className="px-4 py-2.5 bg-white rounded-xl text-sm border border-stone-200 flex items-center gap-2 disabled:opacity-50"><RefreshCw size={16}/> Refresh</button>
            <button disabled={busy} onClick={()=>void logout()} className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm flex items-center gap-2 disabled:opacity-50"><LogOut size={16}/> Logout</button>
          </div>
        </div>
        {error && <p role="alert" className="bg-red-50 text-red-700 rounded-xl p-4 mb-5">{error}</p>}
        {notice && <p role="status" className="bg-green-50 text-green-800 rounded-xl p-4 mb-5">{notice}</p>}
        {savedLocally.length>0 && <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mb-6">
          <p className="text-sm text-stone-700 mb-3">This browser contains {savedLocally.length} products saved before the database upgrade. Import these to make the previously uploaded images and items public on every device. Do this on the original browser used to upload the products.</p>
          <button disabled={busy} onClick={()=>void importSaved()} className="px-4 py-2 bg-amber-600 text-white rounded-xl font-medium disabled:opacity-50">{busy?'Working...':'Import Saved Browser Items'}</button>
        </div>}
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          <form onSubmit={add} className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 h-fit">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2"><Plus size={20}/> Add New Item</h2>
            <div className="space-y-4 mt-5">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Item / magazine name" maxLength={180} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm" />
              <select value={form.category} onChange={e=>setForm({...form,category:e.target.value as ProductCategory})} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm bg-white">{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
              <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price (optional) e.g. R350" maxLength={100} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm" />
              <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description / condition / edition details" rows={4} maxLength={5000} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm resize-none" />
              <label className="block border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center cursor-pointer hover:border-red-400 transition-colors">
                {form.image ? <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3" />:<ImagePlus className="mx-auto text-stone-400 mb-2" size={32}/>}
                <span className="text-sm font-medium text-stone-600 flex items-center justify-center gap-2"><Upload size={15}/> Choose product image</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={e=>void handleImage(e.target.files?.[0])} />
              </label>
              <button disabled={busy} className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"><Plus size={18}/>{busy?'Saving...':'Add to Collection'}</button>
            </div>
          </form>
          <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200">
            <div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold text-stone-900">Current Collection</h2><span className="text-xs bg-stone-100 rounded-full px-3 py-1 text-stone-600">{products.length} items</span></div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map(p=><div key={p.id} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50">
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover" />
                <div className="p-4"><span className="text-[10px] uppercase tracking-wider text-red-600 font-bold">{p.category}</span><h3 className="font-bold text-stone-800 mt-1 text-sm">{p.name}</h3>{p.price && <p className="text-red-600 font-semibold text-sm mt-1">{p.price}</p>}
                  <p className="text-xs text-stone-500 mt-2 line-clamp-2">{p.description}</p>
                  <button disabled={busy} onClick={()=>void remove(p.id)} className="mt-3 text-xs text-red-600 hover:text-red-800 flex items-center gap-1 disabled:opacity-50"><Trash2 size={14}/> Remove</button>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
