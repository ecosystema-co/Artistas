"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import db from "../data/artist-db.json";

// --- WIDGET COMPONENTS (Renderizado Condicional) ---

const BioWidget = ({ artist, widget }: any) => (
  <div className="flex flex-col h-full justify-center px-8 relative z-10 text-white w-full">
    <div className="w-full max-w-md mx-auto">
      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 mb-8 shadow-xl relative">
        <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-display font-black tracking-tight text-white mb-2 leading-tight">
        {artist.name}
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-zinc-300 mb-6">
        {artist.genre}
      </h2>
      <div className="bg-black/70 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col items-center">
        {artist.isTouring && (
          <div className="flex gap-3 items-center bg-white/10 px-4 py-2 rounded-full border border-white/5 mb-4 w-full justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Tour Activo</span>
          </div>
        )}
        <p className="text-zinc-200 text-base leading-relaxed font-normal text-center mb-4">
          {artist.bio}
        </p>
        
        {/* Testimonials (Social Proof) mapped from NoSQL JSON */}
        {widget.testimonials && widget.testimonials.length > 0 && (
           <div className="w-full border-t border-white/10 pt-4 mt-2">
             <div className="flex flex-col items-center text-center">
               <div className="flex text-yellow-500 mb-1">
                 {[...Array(5)].map((_, i) => <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
               </div>
               <p className="text-sm text-white font-medium italic drop-shadow-md">"{widget.testimonials[0].quote}"</p>
               <p className="text-xs text-zinc-400 font-bold mt-1 uppercase tracking-wider">— {widget.testimonials[0].author}</p>
             </div>
           </div>
        )}
      </div>
    </div>
  </div>
);

const SpotifyWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-center items-center px-6 relative z-10 text-white w-full">
    <div className="relative w-full max-w-xs aspect-square mb-10">
      <div className="absolute inset-4 rounded-full bg-black shadow-2xl border-4 border-zinc-900 animate-[spin_10s_linear_infinite] flex items-center justify-center">
         <div className="w-1/3 h-1/3 rounded-full overflow-hidden relative border-2 border-zinc-800">
           <Image src={widget.coverImage} alt="Label" fill className="object-cover" />
         </div>
         <div className="absolute inset-6 rounded-full border border-white/5" />
         <div className="absolute inset-10 rounded-full border border-white/5" />
      </div>
      <div className="absolute top-0 -right-4 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer bg-black/40">
        <Image src={widget.coverImage} alt="Cover" fill className="object-cover opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
          <svg className="w-14 h-14 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
    </div>
    <div className="text-center w-full max-w-sm bg-black/70 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">{widget.title}</p>
      <h3 className="text-4xl font-display font-black text-white mb-2">{widget.trackName}</h3>
      <p className="text-lg text-zinc-300 font-bold">{widget.artistName}</p>
      <a href={widget.spotifyLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="mt-6 w-full bg-[#1DB954] text-white font-bold text-lg px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(29,185,84,0.3)]">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.84.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.56.3z"/></svg>
        Escuchar en Spotify
      </a>
    </div>
  </div>
);

const TourWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-center px-6 relative z-10 text-white w-full overflow-hidden">
    <div className="absolute top-24 w-full text-center pointer-events-none opacity-10">
      <h2 className="text-8xl font-display font-black uppercase">Tour</h2>
    </div>
    <div className="w-full max-w-md mx-auto relative z-20">
      <h2 className="text-4xl font-display font-black text-white mb-8 border-b border-white/20 pb-4">{widget.title}</h2>
      <div className="flex flex-col gap-4">
        {widget.dates.map((date: any, i: number) => {
          const isSoldOut = date.status.toLowerCase().includes("sold out");
          return (
            <div key={i} onClick={(e) => e.stopPropagation()} className={`p-5 rounded-3xl flex items-center justify-between transition-all ${isSoldOut ? 'bg-black/80 backdrop-blur-md border border-white/10 opacity-60 grayscale' : 'bg-white text-black hover:scale-[1.02] cursor-pointer shadow-xl'}`}>
              <div className="flex items-center gap-5">
                <div className="text-center w-14">
                  <span className={`block text-xs font-black uppercase tracking-widest ${isSoldOut ? 'text-zinc-400' : 'text-zinc-500'}`}>{date.month}</span>
                  <span className={`block text-3xl font-display font-black leading-none mt-1 ${isSoldOut ? 'text-zinc-300' : 'text-black'}`}>{date.day}</span>
                </div>
                <div>
                  <h4 className={`font-bold text-xl leading-tight ${isSoldOut ? 'text-zinc-300' : ''}`}>{date.name}</h4>
                  <p className={`font-bold text-sm mt-1 ${isSoldOut ? 'text-zinc-500' : 'text-zinc-600'}`}>{date.location}</p>
                </div>
              </div>
              {isSoldOut ? (
                <span className="text-zinc-400 font-black uppercase text-xs border border-zinc-600 px-4 py-2 rounded-full">{date.status}</span>
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-black text-white hover:bg-white hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const BookingWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-center items-center px-6 relative z-10 text-white text-center w-full">
    <div className="w-full max-w-sm bg-black/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center group cursor-pointer mb-2">
         <div className="absolute inset-0 bg-blue-600 rounded-full blur-[40px] opacity-60 animate-pulse" />
         <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/30 transition-transform group-hover:scale-90" />
         <svg className="w-10 h-10 text-white relative z-10 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </div>
      <div>
         <h2 className="text-3xl font-display font-black text-white mb-3 uppercase tracking-wide">{widget.title}</h2>
         <p className="text-zinc-300 text-base leading-relaxed font-medium">{widget.description}</p>
      </div>
      <button onClick={(e) => e.stopPropagation()} className="w-full bg-white text-black font-black uppercase tracking-widest text-lg py-5 rounded-2xl hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-4 focus:ring-white/50 mt-2">
        Iniciar Cotización
      </button>
    </div>
  </div>
);

const YoutubeWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-center items-center px-6 relative z-10 text-white w-full">
    <div className="w-full max-w-md bg-black/80 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      <div onClick={(e) => { e.stopPropagation(); window.open(widget.videoLink, '_blank'); }} className="relative w-full aspect-video bg-zinc-900 flex items-center justify-center group cursor-pointer border-b border-white/10">
        <Image src={widget.thumbnail} alt={widget.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div className="p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-2">{widget.badge}</p>
        <h3 className="text-3xl font-display font-black text-white mb-2">{widget.title}</h3>
        <p className="text-sm text-zinc-300 font-medium">{widget.description}</p>
      </div>
    </div>
  </div>
);

// --- MAIN ENGINE ---

export default function ArtistOSDynamic() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const artist = db.artist;
  const widgets = artist.widgets;

  const handleNext = () => {
    if (currentSlide < widgets.length - 1) setCurrentSlide(prev => prev + 1);
  };
  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };
  const handleTap = (e: React.MouseEvent<HTMLElement>) => {
    // Si el usuario hace clic en un enlace o botón, no cambiamos de slide
    if ((e.target as HTMLElement).closest('button, a')) return;

    const { clientX } = e;
    if (clientX < window.innerWidth * 0.3) handlePrev();
    else handleNext();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(bgRef.current,
        { filter: "blur(15px)" },
        { filter: "blur(5px)", duration: 1, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [currentSlide]);

  // Widget Resolver
  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case "bio_card": return <BioWidget artist={artist} widget={widget} />;
      case "spotify_release": return <SpotifyWidget widget={widget} />;
      case "youtube_video": return <YoutubeWidget widget={widget} />;
      case "tour_dates": return <TourWidget widget={widget} />;
      case "booking_cta": return <BookingWidget widget={widget} />;
      default: return <div className="text-white">Widget not supported</div>;
    }
  };

  return (
    <main 
      className="h-[100dvh] w-screen overflow-hidden bg-black relative font-sans selection:bg-blue-500/30 cursor-pointer"
      onClick={handleTap}
    >
      
      {/* Dynamic Background from DB */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src={widgets[currentSlide].bgImage || artist.avatar} 
          alt="Fondo dinámico" 
          fill 
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute top-6 left-0 right-0 px-6 z-50 flex gap-2 pointer-events-none" aria-hidden="true">
        {widgets.map((_, index) => (
          <div key={index} className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ 
                width: index <= currentSlide ? "100%" : "0%",
                opacity: index === currentSlide ? 1 : index < currentSlide ? 0.3 : 0
              }}
            />
          </div>
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 w-full h-full flex items-center">
        {renderWidget(widgets[currentSlide])}
      </div>

    </main>
  );
}
