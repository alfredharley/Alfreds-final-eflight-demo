import React, { useMemo, useState, useEffect } from 'react'
import { apiUrl } from './api'

// ——— Small helpers ———
const currency = (n) => `$ ${n.toFixed(2)}`
const Img = ({ q, h=180 }) => (
  <div style={{
    height: h, backgroundSize:'cover', backgroundPosition:'center',
    backgroundImage: `url(https://source.unsplash.com/1200x800/?${encodeURIComponent(q)})`
  }} />
)

// ——— Tabs ———
const TABS = ['Destinations','Airports','Airlines','My Flight','Island','Shop','Admin']

export default function App(){
  const [tab, setTab] = useState('Destinations')
  return (
    <div>
      <div className="container">
        <Header />
        <div className="tabs">
          {TABS.map(t =>
            <button key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</button>
          )}
        </div>

        <div style={{marginTop: 16}}>
          {tab === 'Destinations' && <Destinations />}
          {tab === 'Airports' && <Airports />}
          {tab === 'Airlines' && <Airlines />}
          {tab === 'My Flight' && <FlightSelect />}
          {tab === 'Island' && <IslandMode />}
          {tab === 'Shop' && <Shop />}
          {tab === 'Admin' && <OrdersAdmin />}
        </div>
        <Footer />
      </div>
      <SuccessOverlay />
    </div>
  )
}

function Header(){
  return (
    <div className="header">
      <div className="brand">
        <div style={{fontSize: 24}}>✈️</div>
        <div>
          <div className="badge">eflightmagazine.com</div>
          <div className="h1">eFlight Magazine</div>
        </div>
      </div>
    </div>
  )
}

function Footer(){
  return (
    <div style={{textAlign:'center', margin:'16px 0', color:'#6b7280', fontSize:12}}>
      © {new Date().getFullYear()} eFlight Magazine — Demo
    </div>
  )
}

// ——— Destinations (with your partners) ———
function HeroCard({ name, tagline, blocks }){
  return (
    <div className="card">
      <Img q={name} />
      <div className="card-header">{name} — {tagline}</div>
      <div className="card-body">
        <div className="list">
          {blocks.map((b,i)=>(
            <div key={i} style={{border:'1px solid var(--border)', borderRadius:12, padding:12}}>
              <div style={{fontWeight:700, marginBottom:6}}>{b.title}</div>
              <div style={{fontSize:14, color:'var(--muted)'}}>{b.text}</div>
              {b.links?.length>0 && (
                <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:8}}>
                  {b.links.map((l,j)=>(
                    <a key={j} className="btn" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Destinations(){
  return (
    <div className="grid grid2">
      <HeroCard
        name="St. Eustatius" tagline="The Hidden Caribbean Gem"
        blocks={[
          { title:'Know Before You Go', text:'Small Dutch Caribbean island. US dollars accepted, English widely spoken.' },
          { title:'Eat & Drink', text:'Sample fresh catch BBQ and island flavors.', links:[{label:'Golden Rock Resort', url:'https://www.goldenrockresort.com/'}] },
          { title:'What to Do', text:'Hike The Quill volcano, dive wrecks.' },
          { title:'Events', text:'Statia Day (Nov 16), Carnival.' },
          { title:'Important Numbers', text:'Emergency 911; Hospital +599-318-2211' },
        ]}
      />
      <HeroCard
        name="St. Maarten" tagline="Beaches, Shopping & Planespotting"
        blocks={[
          { title:'Eat & Drink', text:'Fine dining and beachside fun.', links:[{label:"Pineapple Pete's", url:'https://www.vacationstmaarten.com/listing/pineapple-pete/388/'}] },
          { title:'What to Do', text:'Planespot at Maho Beach, sail to nearby islands.' },
          { title:'Events', text:'Carnival, Heineken Regatta.' },
        ]}
      />
      <HeroCard
        name="St. Kitts & Nevis" tagline="Twin Island Heritage & Nature"
        blocks={[
          { title:'Eat & Drink', text:'Beach clubs and island bistros.', links:[{label:'Silver Reef', url:'https://silverreefstkitts.com/'},{label:'Four Seasons Nevis', url:'https://www.fourseasons.com/nevis/'}] },
          { title:'What to Do', text:'Brimstone Hill Fortress, Nevis Hot Springs.', links:[{label:'Golden Rock Development', url:'https://www.grcpark.com/'}] },
        ]}
      />
      <HeroCard
        name="Curaçao" tagline="Culture, Cuisine & Colorful Streets"
        blocks={[
          { title:'Eat & Drink', text:'Explore Willemstad’s colorful food scene.' },
          { title:'Events', text:'Curaçao North Sea Jazz Festival.', links:[{label:'Curaçao North Sea Jazz', url:'https://www.curacaonorthseajazz.com/en/'}] },
        ]}
      />
      <HeroCard
        name="Antigua & Barbuda" tagline="365 Beaches & Sailing Paradise"
        blocks={[
          { title:'Eat & Drink', text:'Seafood and cocktails at the beach.' },
          { title:'Events', text:'Don’t miss the Carnival Breakfast Party.', links:[
            {label:'de 268 Breakfast Fete (IG)', url:'https://www.instagram.com/de268breakfastfete/'},
            {label:'Tickets via TickeTing', url:'https://ticketingevents.com/'}
          ] },
        ]}
      />
    </div>
  )
}

// ——— Airports ———
function Airports(){
  const items = [
    { code:'SXM', name:'Princess Juliana International Airport', desc:'Famous for low-altitude beach landings; hub for NE Caribbean.' },
    { code:'JFK', name:'John F. Kennedy International Airport', desc:'Major U.S. gateway in New York with lounges and global connections.' },
    { code:'MIA', name:'Miami International Airport', desc:'Latin American & Caribbean hub; extensive shopping and dining.' },
  ]
  return (
    <div className="grid">
      {items.map((a)=>(
        <div className="card" key={a.code}>
          <Img q={`airport ${a.code}`} h={160} />
          <div className="card-header">{a.name} ({a.code})</div>
          <div className="card-body">
            <div style={{fontSize:14, color:'var(--muted)'}}>{a.desc}</div>
            <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
              <button className="btn">Wayfinding</button>
              <button className="btn">Free Wi-Fi</button>
              <button className="btn">Lounges</button>
              <button className="btn">Dining</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ——— Airlines ———
function Airlines(){
  const list = ['American Airlines','Delta Air Lines','Air France / KLM']
  return (
    <div className="card">
      <div className="card-header">Top Partner Airlines</div>
      <div className="card-body">
        <div className="list">
          {list.map((x,i)=>(<div key={i} style={{border:'1px solid var(--border)', borderRadius:10, padding:10}}>{x}</div>))}
        </div>
      </div>
    </div>
  )
}

// ——— My Flight (demo inputs) ———
function FlightSelect(){
  return (
    <div className="card">
      <div className="card-header">Select My Flight</div>
      <div className="card-body">
        <div className="list">
          <input className="input" placeholder="Airline (e.g., Delta)" />
          <input className="input" placeholder="Flight number (e.g., DL123)" />
          <input className="input" placeholder="Date (YYYY-MM-DD)" />
          <button className="btn primary">Track Flight</button>
          <div style={{fontSize:12, color:'var(--muted)'}}>Demo: would pull live flight status & gate info via API.</div>
        </div>
      </div>
    </div>
  )
}

// ——— Island Mode ———
function IslandMode(){
  return (
    <div className="card">
      <div className="card-header">Island Mode (GPS-aware)</div>
      <div className="card-body">
        <div style={{border:'1px solid var(--border)', borderRadius:12, padding:12, background:'#fff'}}>
          When you’re on an island (not in an airport or in-flight), the app shows that island’s cover with events, dining, things to do, and emergency numbers.
        </div>
        <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:8}}>
          <button className="btn">Places to dine</button>
          <button className="btn">What to do</button>
          <button className="btn">Events</button>
          <button className="btn">Important numbers</button>
        </div>
      </div>
    </div>
  )
}

// ——— Shop (cart + Stripe live button) ———
function Shop(){
  const [catalog] = useState([
    { sku:'EF-SUIT-001', title:'Carry-on Suitcase', price:149 },
    { sku:'EF-BAG-002', title:'Weekender Bag', price:89 },
    { sku:'EF-CAP-003', title:'Headgear (Cap)', price:25 },
    { sku:'EF-PIL-004', title:'Neck Pillow', price:19 },
  ])
  const [lines, setLines] = useState([])
  const [email, setEmail] = useState('')
  const [live, setLive] = useState(false)

  const add = (p) => {
    setLines(prev=>{
      const found = prev.find(l=>l.sku===p.sku)
      if (found) return prev.map(l=> l.sku===p.sku ? {...l, qty:l.qty+1} : l)
      return [...prev, { sku:p.sku, title:p.title, price:p.price, qty:1 }]
    })
  }
  const inc = (sku)=> setLines(prev=> prev.map(l=> l.sku===sku ? {...l, qty:l.qty+1} : l))
  const dec = (sku)=> setLines(prev=> prev.map(l=> l.sku===sku ? {...l, qty: Math.max(1, l.qty-1)} : l))
  const rm  = (sku)=> setLines(prev=> prev.filter(l=> l.sku!==sku))

  const subtotal = useMemo(()=> lines.reduce((s,l)=> s + l.price*l.qty, 0), [lines])
  const tax = useMemo(()=> subtotal * 0.08, [subtotal])
  const shipping = useMemo(()=> lines.length ? 9 : 0, [lines])
  const total = subtotal + tax + shipping

  const checkoutLive = async () => {
    try {
      const resp = await fetch(apiUrl('/api/checkout/stripe'), {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, lines })
      })
      const json = await resp.json()
      if (json?.url) window.location.href = json.url
      else alert('Stripe error (check server logs)')
    } catch (e) {
      console.error(e)
      alert('Checkout failed')
    }
  }

  return (
    <div className="grid grid2">
      <div className="card">
        <div className="card-header">Catalog</div>
        <div className="card-body">
          <div className="list">
            {catalog.map((p)=>(
              <div key={p.sku} style={{display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid var(--border)', borderRadius:12, padding:12}}>
                <div>
                  <div style={{fontWeight:700}}>{p.title}</div>
                  <div style={{fontSize:12, color:'var(--muted)'}}>SKU {p.sku} · {currency(p.price)}</div>
                </div>
                <button className="btn" onClick={()=>add(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Cart</div>
        <div className="card-body">
          {!lines.length && <div style={{color:'var(--muted)', fontSize:14}}>Your cart is empty.</div>}
          <div className="list">
            {lines.map(l=>(
              <div key={l.sku} style={{display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid var(--border)', borderRadius:12, padding:12}}>
                <div>
                  <div style={{fontWeight:700, fontSize:14}}>{l.title}</div>
                  <div style={{fontSize:12, color:'var(--muted)'}}>{currency(l.price)} × {l.qty}</div>
                </div>
                <div className="row">
                  <button className="btn" onClick={()=>dec(l.sku)}>-</button>
                  <button className="btn" onClick={()=>inc(l.sku)}>+</button>
                  <button className="btn" onClick={()=>rm(l.sku)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{border:'1px solid var(--border)', borderRadius:12, padding:12, marginTop:10}}>
            <div className="kv"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
            <div className="kv"><span>Tax (8%)</span><span>{currency(tax)}</span></div>
            <div className="kv"><span>Shipping</span><span>{currency(shipping)}</span></div>
            <div className="kv total" style={{marginTop:6}}><span>Total</span><span>{currency(total)}</span></div>
          </div>

          <div className="row" style={{marginTop:10}}>
            <div className="btn" onClick={()=>setLive(v=>!v)}>
              Pay with Stripe (live): {live ? 'ON' : 'OFF'}
            </div>
          </div>

          <input className="input" style={{marginTop:10}} placeholder="Email for receipt" value={email} onChange={(e)=>setEmail(e.target.value)} />

          {live ? (
            <button className="btn primary" style={{marginTop:10}} disabled={!lines.length} onClick={checkoutLive}>
              Pay with Stripe (Live)
            </button>
          ) : (
            <button className="btn" style={{marginTop:10}} disabled={!lines.length} onClick={()=>alert('Test mode: simulate success.')}>
              Stripe Checkout (Test)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ——— Success overlay (reads ?order_ref= and fetches details) ———
function SuccessOverlay(){
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const qs = new URLSearchParams(window.location.search)
    const ref = qs.get('order_ref')
    if (!ref) { setLoading(false); return; }
    (async ()=>{
      try{
        const r = await fetch(apiUrl(`/api/admin/orders?q=${encodeURIComponent(ref)}`))
        const rows = await r.json()
        setOrder(rows.find(x=> x.order_ref === ref) || null)
      } finally {
        setLoading(false)
      }
    })()
  },[])

  if (loading || !order) return null
  const close = ()=>{
    const url = new URL(window.location.href)
    url.searchParams.delete('order_ref')
    window.history.replaceState(null,'',url.toString())
    setOrder(null)
  }

  return (
    <div className="overlay" onClick={close}>
      <div className="card" style={{maxWidth:520, width:'100%'}} onClick={(e)=>e.stopPropagation()}>
        <div className="card-header">Order {order.order_ref} — Thank you!</div>
        <div className="card-body">
          <div>Email: <b>{order.email}</b></div>
          <div>Total: <b>$ {(order.total_cents/100).toFixed(2)}</b></div>
          <div>Status: <b>{order.status}</b></div>
          <button className="btn" style={{marginTop:10}} onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

// ——— Orders Admin ———
function OrdersAdmin(){
  const [q, setQ] = useState('')
  const [rows, setRows] = useState([])
  const search = async ()=>{
    try {
      const r = await fetch(apiUrl(`/api/admin/orders?q=${encodeURIComponent(q)}`))
      const json = await r.json()
      setRows(json)
    } catch (e) {
      alert('Search failed')
    }
  }
  const exportCsv = ()=>{
    const header = 'order_ref,email,total_cents,status,created_at\n'
    const body = rows.map(r=> `${r.order_ref},${r.email},${r.total_cents},${r.status},${r.created_at}`).join('\n')
    const blob = new Blob([header+body], { type:'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'orders.csv'; a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="card">
      <div className="card-header">Orders Admin</div>
      <div className="card-body">
        <div className="row" style={{gap:8}}>
          <input className="input" placeholder="Search email or order ref" value={q} onChange={(e)=>setQ(e.target.value)} />
          <button className="btn primary" onClick={search}>Search</button>
          <button className="btn" onClick={exportCsv}>Export CSV</button>
        </div>
        <div style={{overflowX:'auto', marginTop:10}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:14}}>
            <thead>
              <tr style={{background:'#f7fbff'}}>
                <th style={{textAlign:'left', padding:8, borderBottom:'1px solid var(--border)'}}>Order Ref</th>
                <th style={{textAlign:'left', padding:8, borderBottom:'1px solid var(--border)'}}>Email</th>
                <th style={{textAlign:'left', padding:8, borderBottom:'1px solid var(--border)'}}>Total</th>
                <th style={{textAlign:'left', padding:8, borderBottom:'1px solid var(--border)'}}>Status</th>
                <th style={{textAlign:'left', padding:8, borderBottom:'1px solid var(--border)'}}>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:8, borderBottom:'1px solid var(--border)'}}>{r.order_ref}</td>
                  <td style={{padding:8, borderBottom:'1px solid var(--border)'}}>{r.email}</td>
                  <td style={{padding:8, borderBottom:'1px solid var(--border)'}}>$ {(r.total_cents/100).toFixed(2)}</td>
                  <td style={{padding:8, borderBottom:'1px solid var(--border)'}}>{r.status}</td>
                  <td style={{padding:8, borderBottom:'1px solid var(--border)'}}>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td style={{padding:12, color:'var(--muted)'}} colSpan="5">No results yet. Use search above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
