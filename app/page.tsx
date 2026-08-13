"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import db from "../data/artist-db.json";

// --- WIDGET COMPONENTS (Glassmorphism & Vibrant UI) ---

const GlassPanel = ({ children, className = "", onClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl ${className}`}
  >
    {children}
  </div>
);



const BioWidget = ({ artist }: any) => (
  <div className="flex flex-col h-full justify-end px-6 pb-12 relative z-10 text-white w-full pr-24">
    
    {artist.upcomingEvent && (
      <GlassPanel className="mb-6 cursor-pointer group !p-4 hover:bg-white/20 transition-colors" onClick={(e: any) => { e.stopPropagation(); window.open(artist.upcomingEvent.ticketLink, '_blank'); }}>
         <div className="flex justify-between items-start mb-2">
           <span className="bg-gradient-to-r from-[#870160] to-[#ac255e] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Próximo Show</span>
         </div>
         <h3 className="font-display font-black text-xl text-white leading-tight mb-1 drop-shadow-md">{artist.upcomingEvent.title}</h3>
         <p className="text-white/80 text-xs font-medium mb-3">📍 {artist.upcomingEvent.location} • 📅 {artist.upcomingEvent.date}</p>
         <button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold uppercase tracking-widest text-xs py-3 rounded-full transition-colors backdrop-blur-md shadow-inner border border-white/10">
            Tickets
         </button>
      </GlassPanel>
    )}

    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] relative shrink-0">
        <Image src={artist.avatar} alt={artist.name} fill sizes="56px" className="object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight text-white leading-none drop-shadow-lg">
          {artist.name}
        </h1>
        <div className="flex items-center gap-1 mt-1 text-white/80 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Florencia, Caquetá
        </div>
      </div>
    </div>
    
    <p className="text-white/90 text-sm leading-relaxed font-normal mb-5 drop-shadow-md">
      {artist.bio}
    </p>

    <div className="flex flex-wrap gap-2">
      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors cursor-pointer" onClick={e => e.stopPropagation()}>
        🎵 Music
      </span>
      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors cursor-pointer" onClick={e => e.stopPropagation()}>
        🎬 Cinema
      </span>
      {artist.isTouring && !artist.upcomingEvent && (
        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide px-4 py-2 rounded-full flex items-center gap-2">
          ✨ Tour Activo
        </span>
      )}
    </div>
  </div>
);

const SpotifyWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-end px-6 pb-12 relative z-10 text-white w-full pr-24">
    <div className="relative w-full max-w-[200px] aspect-square mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-zinc-900 animate-[spin_10s_linear_infinite] flex items-center justify-center">
         <div className="absolute inset-4 rounded-full border border-white/10" />
         <div className="w-1/3 h-1/3 rounded-full overflow-hidden relative border-2 border-zinc-800">
           <Image src={widget.coverImage} alt="Label" fill sizes="64px" className="object-cover" />
         </div>
      </div>
      <div className="absolute top-0 -right-4 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl border border-white/30 transform rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-black/40">
        <Image src={widget.coverImage} alt="Cover" fill sizes="150px" className="object-cover opacity-90" />
      </div>
    </div>
    
    <GlassPanel>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#ac255e] mb-1">{widget.title}</p>
      <h3 className="text-3xl font-display font-black text-white mb-1 drop-shadow-md">{widget.trackName}</h3>
      <p className="text-sm text-white/80 font-medium mb-5">{widget.artistName}</p>
      <a href={widget.spotifyLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-full bg-gradient-to-r from-[#1DB954] to-[#1aa34a] text-white font-bold text-sm px-6 py-4 rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(29,185,84,0.3)]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.84.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.56.3z"/></svg>
        Escuchar en Spotify
      </a>
    </GlassPanel>
  </div>
);

const YoutubeWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-end px-6 pb-12 relative z-10 text-white w-full pr-24">
    <GlassPanel className="p-0 overflow-hidden mb-6">
      <div onClick={(e) => { e.stopPropagation(); window.open(widget.videoLink, '_blank'); }} className="relative w-full aspect-video bg-zinc-900 flex items-center justify-center group cursor-pointer">
        <Image src={widget.thumbnail} alt={widget.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center relative z-10 border border-white/40 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          <svg className="w-6 h-6 text-white ml-1 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div className="p-5 relative z-20 -mt-8">
        <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg">{widget.badge}</span>
        <h3 className="text-2xl font-display font-black text-white mt-2 mb-1 drop-shadow-md">{widget.title}</h3>
        <p className="text-xs text-white/80 font-medium leading-relaxed">{widget.description}</p>
      </div>
    </GlassPanel>
  </div>
);

const TourWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-end px-6 pb-12 relative z-10 text-white w-full pr-24">
    <h2 className="text-4xl font-display font-black text-white mb-6 drop-shadow-lg">{widget.title}</h2>
    <div className="flex flex-col gap-3">
      {widget.dates.map((date: any, i: number) => {
        const isSoldOut = date.status.toLowerCase().includes("sold out");
        return (
          <div key={i} onClick={(e) => e.stopPropagation()} className={`p-4 rounded-3xl flex items-center justify-between transition-all backdrop-blur-xl border border-white/20 shadow-lg cursor-pointer hover:bg-white/20 ${isSoldOut ? 'bg-white/5 opacity-60' : 'bg-white/10 hover:scale-[1.02]'}`}>
            <div className="flex items-center gap-4">
              <div className="text-center w-12 shrink-0 bg-white/10 rounded-2xl py-2 border border-white/10">
                <span className="block text-[10px] font-black uppercase tracking-widest text-white/80">{date.month}</span>
                <span className="block text-2xl font-display font-black leading-none mt-0.5 text-white">{date.day}</span>
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight text-white drop-shadow-sm">{date.name}</h4>
                <p className="font-medium text-xs mt-0.5 text-white/70">{date.location}</p>
              </div>
            </div>
            {isSoldOut ? (
              <span className="text-white/50 font-black uppercase text-[10px] tracking-widest border border-white/20 px-3 py-1.5 rounded-full">Sold Out</span>
            ) : (
              <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const BookingWidget = ({ widget }: any) => (
  <div className="flex flex-col h-full justify-center items-center px-6 relative z-10 text-white text-center w-full">
    <GlassPanel className="w-full max-w-sm flex flex-col items-center gap-6">
      <div className="relative w-20 h-20 flex items-center justify-center group cursor-pointer mb-2">
         <div className="absolute inset-0 bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] rounded-full blur-[20px] opacity-70 animate-pulse" />
         <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/40 transition-transform group-hover:scale-90 flex items-center justify-center">
            <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
         </div>
      </div>
      <div>
         <h2 className="text-3xl font-display font-black text-white mb-2 uppercase tracking-wide drop-shadow-md">{widget.title}</h2>
         <p className="text-white/80 text-sm leading-relaxed font-medium">{widget.description}</p>
      </div>
      <button onClick={(e) => e.stopPropagation()} className="w-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white font-black uppercase tracking-widest text-sm py-4 rounded-full hover:opacity-90 transition-opacity shadow-[0_10px_30px_rgba(255,65,108,0.4)] mt-2">
        Get Started ↗
      </button>
    </GlassPanel>
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
        { scale: 1.05 },
        { scale: 1, duration: 1.5, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [currentSlide]);

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
      className="h-[100dvh] w-screen overflow-hidden bg-[#0A0A0A] relative font-sans selection:bg-purple-500/30 cursor-pointer"
      onClick={handleTap}
    >
      
      {/* VIBRANT GRADIENT & IMAGE BACKGROUND */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src={widgets[currentSlide].bgImage || artist.avatar} 
          alt="Background" 
          fill 
          sizes="100vw"
          className="object-cover opacity-70"
          priority
        />
        {/* Magic Gradients to mimic the Dribbble reference */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F005C] via-[#5B0060]/70 to-transparent mix-blend-multiply opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#870160]/40 to-transparent mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#110022] to-transparent opacity-90" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-8 left-0 right-0 px-6 z-50 flex gap-2 pointer-events-none" aria-hidden="true">
        {widgets.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
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

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 w-full h-full flex items-center">
        {renderWidget(widgets[currentSlide])}
      </div>

    </main>
  );
}
