"use client";

import { useState } from "react";
import db from "../../data/artist-db.json";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"quotes" | "reviews" | "events">("quotes");
  
  const artist = db.artist;
  const quotes = db.quotes;
  const reviews = db.reviews;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
              OS
            </div>
            <span className="font-display font-black tracking-widest uppercase text-sm">ArtistOS</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{artist.name}</p>
              <p className="text-xs text-zinc-400">Pro Plan</p>
            </div>
            <img src={artist.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-white/20 object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-display font-black mb-2">Panel de Control</h1>
          <p className="text-zinc-400 text-lg">Gestiona tus eventos, cotizaciones y la prueba social de tu EPK.</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors">
            <h3 className="text-zinc-400 font-bold uppercase tracking-wider text-xs mb-2">Cotizaciones Pendientes</h3>
            <p className="text-4xl font-display font-black text-white">{quotes.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-yellow-500/50 transition-colors">
            <h3 className="text-zinc-400 font-bold uppercase tracking-wider text-xs mb-2">Reseñas por Aprobar</h3>
            <p className="text-4xl font-display font-black text-white">{reviews.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-zinc-400 font-bold uppercase tracking-wider text-xs mb-2">Vistas del EPK (Mes)</h3>
            <p className="text-4xl font-display font-black text-emerald-400">1,204</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto whitespace-nowrap">
          <button 
            onClick={() => setActiveTab("quotes")}
            className={`pb-4 font-bold tracking-wide transition-colors relative ${activeTab === "quotes" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Solicitudes de Booking
            {activeTab === "quotes" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 font-bold tracking-wide transition-colors relative ${activeTab === "reviews" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Aprobación de Reseñas
            {activeTab === "reviews" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab("events")}
            className={`pb-4 font-bold tracking-wide transition-colors relative ${activeTab === "events" ? "text-emerald-400" : "text-zinc-500 hover:text-emerald-400/70"}`}
          >
            Mis Eventos (Autogestión)
            {activeTab === "events" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          
          {/* QUOTES TAB */}
          {activeTab === "quotes" && (
            <div className="flex flex-col gap-4">
              {quotes.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">No tienes cotizaciones pendientes.</div>
              ) : (
                quotes.map((quote: any) => (
                  <div key={quote.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">Nueva</span>
                        <h4 className="font-display font-black text-xl">{quote.eventName}</h4>
                      </div>
                      <p className="text-zinc-400 text-sm mb-1">📅 {quote.date} • 📍 {quote.location}</p>
                      <p className="text-zinc-500 text-sm">Promotor: {quote.promoterName} ({quote.promoterEmail})</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-3">
                      <p className="text-2xl font-black text-emerald-400">{quote.budget}</p>
                      <div className="flex gap-2">
                        <button className="bg-white/10 text-white font-bold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm">Rechazar</button>
                        <button className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-zinc-200 transition-colors text-sm shadow-lg">Generar Press Kit & Aprobar</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {reviews.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">No tienes reseñas por aprobar.</div>
              ) : (
                reviews.map((review: any) => (
                  <div key={review.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/10 transition-colors">
                    <div className="max-w-2xl">
                       <div className="flex text-yellow-500 mb-3">
                         {[...Array(review.rating)].map((_, i) => <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                       </div>
                       <p className="text-lg text-white font-medium italic mb-2">"{review.comment}"</p>
                       <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">— {review.promoter}</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="bg-white/10 text-white font-bold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm text-red-400 hover:text-red-300">Eliminar</button>
                       <button className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-500 transition-colors text-sm shadow-lg shadow-emerald-900/50">Publicar en EPK</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* EVENTS TAB (Autogestión) */}
          {activeTab === "events" && (
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/30 p-8 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-black text-white mb-2">Evento Destacado</h3>
                    <p className="text-zinc-400 text-sm">Este evento aparecerá en la primera historia de tu Smart EPK.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={!!artist.upcomingEvent} />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    <span className="ml-3 text-sm font-bold text-white uppercase tracking-widest">Activo</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Nombre del Evento</label>
                    <input type="text" defaultValue={artist.upcomingEvent?.title} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Fecha y Hora</label>
                    <input type="text" defaultValue={artist.upcomingEvent?.date} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Lugar / Ciudad</label>
                    <input type="text" defaultValue={artist.upcomingEvent?.location} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Link de Venta (WhatsApp o Boletería)</label>
                    <input type="url" defaultValue={artist.upcomingEvent?.ticketLink} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-emerald-400 focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                   <button className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/50">
                     Guardar y Publicar
                   </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
