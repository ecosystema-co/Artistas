"use client";

import { useState } from "react";
import db from "../../data/artist-db.json";
import Image from "next/image";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "presskit" | "booking" | "reviews" | "events">("profile");
  
  const artist = db.artist;
  const quotes = db.quotes;
  const reviews = db.reviews;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 relative">
              <Image src={artist.avatar} alt="Avatar" fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <h1 className="font-display font-black text-xl leading-none">ArtistOS</h1>
              <p className="text-zinc-400 text-xs font-medium">Dashboard • {artist.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">
              Ver Perfil Público
            </button>
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Dashboard Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-display font-black text-white mb-2">Centro de Comando</h2>
          <p className="text-zinc-400 text-lg">Administra tu presencia, tu press kit y tus negocios en un solo lugar.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`pb-4 font-bold tracking-wide transition-colors relative ${activeTab === "profile" ? "text-white" : "text-zinc-500 hover:text-white"}`}
          >
            Perfil Público (CMS)
            {activeTab === "profile" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
          </button>
          
          <button 
            onClick={() => setActiveTab("presskit")}
            className={`pb-4 font-bold tracking-wide transition-colors relative ${activeTab === "presskit" ? "text-white" : "text-zinc-500 hover:text-white"}`}
          >
            Press Kit (EPK)
            {activeTab === "presskit" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
          </button>

          <button 
            onClick={() => setActiveTab("booking")}
            className={`pb-4 font-bold tracking-wide transition-colors relative flex items-center gap-2 ${activeTab === "booking" ? "text-white" : "text-zinc-500 hover:text-white"}`}
          >
            Solicitudes de Booking
            <span className="bg-emerald-500 text-black text-xs px-2 py-0.5 rounded-full font-black">2</span>
            {activeTab === "booking" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full" />}
          </button>
          
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 font-bold tracking-wide transition-colors relative flex items-center gap-2 ${activeTab === "reviews" ? "text-white" : "text-zinc-500 hover:text-white"}`}
          >
            Moderación de Reseñas
            <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-black">1</span>
            {activeTab === "reviews" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full" />}
          </button>

          <button 
            onClick={() => setActiveTab("events")}
            className={`pb-4 font-bold tracking-wide transition-colors relative ${activeTab === "events" ? "text-white" : "text-zinc-500 hover:text-white"}`}
          >
            Mis Eventos (Ticketing)
            {activeTab === "events" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 rounded-t-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />}
          </button>
        </div>

        {/* TAB 1: PERFIL (CMS) */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h3 className="text-2xl font-display font-black text-white mb-6">Información Básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Nombre Artístico</label>
                  <input type="text" defaultValue={artist.name} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Género Musical</label>
                  <input type="text" defaultValue={artist.genre} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Biografía</label>
                <textarea defaultValue={artist.bio} rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="mt-8 flex justify-end">
                <button className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-500 transition-colors">Guardar Cambios</button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
              <h3 className="text-2xl font-display font-black text-white mb-6">Redes y Música</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-2">Enlace de Spotify (Último Lanzamiento)</label>
                  <input type="url" defaultValue="https://open.spotify.com/intl-es/artist/4xULXWkVIVDhPgAVY4K3q2" className="w-full bg-black/50 border border-emerald-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-red-400 mb-2">Enlace de YouTube (Video Destacado)</label>
                  <input type="url" defaultValue="https://youtube.com/watch?v=..." className="w-full bg-black/50 border border-red-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-500 transition-colors">Actualizar Enlaces</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRESS KIT */}
        {activeTab === "presskit" && (
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-display font-black text-white mb-2">Gestión de Press Kit</h3>
                  <p className="text-zinc-400 text-sm">Este es el documento que los promotores verán antes de enviarte una solicitud de Booking.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Opcion 1 */}
                <div className="bg-white/5 border-2 border-blue-500 p-6 rounded-xl relative cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">Activo</span>
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">Smart EPK (Autogenerado)</h4>
                  <p className="text-zinc-400 text-sm mb-4">Utiliza los datos de tu Perfil Público para generar un Press Kit interactivo y en formato PDF automáticamente.</p>
                  <button className="text-blue-400 text-sm font-bold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Vista Previa
                  </button>
                </div>

                {/* Opcion 2 */}
                <div className="bg-black/50 border border-white/10 p-6 rounded-xl relative cursor-pointer hover:bg-white/5 transition-colors">
                  <h4 className="text-xl font-black text-white mb-2">Subir PDF Manual</h4>
                  <p className="text-zinc-400 text-sm mb-4">Si ya tienes un Press Kit diseñado por un profesional, súbelo aquí para que los promotores lo descarguen.</p>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 flex flex-col items-center justify-center text-center mt-2">
                    <svg className="w-6 h-6 text-zinc-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Subir Archivo (.pdf)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKING */}
        {activeTab === "booking" && (
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-display font-black text-white mb-2">Bandeja de Entrada</h3>
            <p className="text-zinc-400 text-sm mb-4">Estas son las propuestas que los promotores te han enviado luego de ver tu Press Kit.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {quotes.map((quote: any) => (
                <div key={quote.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{quote.date}</span>
                        <h3 className="text-xl font-black text-white">{quote.promoter}</h3>
                        <p className="text-zinc-400 text-sm">{quote.email}</p>
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                        {quote.status}
                      </span>
                    </div>
                    <div className="bg-black/50 rounded-xl p-4 mb-6">
                      <p className="text-sm text-zinc-300"><strong className="text-white">Lugar:</strong> {quote.venue} ({quote.capacity} pax)</p>
                      <p className="text-sm text-zinc-300"><strong className="text-white">Presupuesto Ofrecido:</strong> <span className="text-emerald-400 font-bold">{quote.budget}</span></p>
                      <div className="mt-3 text-sm text-zinc-400 italic">"{quote.notes}"</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                      Aceptar Propuesta
                    </button>
                    <button className="flex-1 bg-zinc-800 hover:bg-red-900/50 hover:text-red-400 text-zinc-300 font-bold py-3 rounded-xl transition-colors text-sm border border-transparent hover:border-red-500/50">
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-display font-black text-white mb-2">Moderación de Reseñas</h3>
            <p className="text-zinc-400 text-sm mb-4">Aprueba los comentarios de los fans y curadores para que aparezcan en tu Smart EPK público.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review: any) => (
                <div key={review.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{review.author}</h3>
                    <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm italic mb-6">"{review.quote}"</p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-white/10 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg transition-colors text-sm">Aprobar y Publicar</button>
                    <button className="flex-1 bg-white/5 hover:bg-red-900/50 text-zinc-400 font-bold py-2 rounded-lg transition-colors text-sm">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EVENTS */}
        {activeTab === "events" && (
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-display font-black text-white mb-2">Evento Destacado</h3>
                  <p className="text-zinc-400 text-sm">Crea un evento propio (autogestión). Aparecerá en la primera historia de tu Smart EPK con un botón de compra.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={!!artist.upcomingEvent} />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  <span className="ml-3 text-sm font-bold text-white uppercase tracking-widest">Activo</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Nombre del Evento</label>
                  <input type="text" defaultValue={artist.upcomingEvent?.title} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Fecha y Hora</label>
                  <input type="text" defaultValue={artist.upcomingEvent?.date} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Lugar / Ciudad</label>
                  <input type="text" defaultValue={artist.upcomingEvent?.location} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Link de Venta (WhatsApp o Boletería)</label>
                  <input type="url" defaultValue={artist.upcomingEvent?.ticketLink} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-purple-400 focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                 <button className="bg-purple-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50">
                   Guardar Evento
                 </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
