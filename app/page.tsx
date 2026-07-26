"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, Sparkles, Mail, ShieldAlert, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

// Scratch Card Component
function ScratchCard({ imageSrc, label }: { imageSrc: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas cover styling
    ctx.fillStyle = "#FDE2E4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#884A5C";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch Me ✨", canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseUp = () => (isDrawing = false);

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-rose-100 flex flex-col items-center">
      <div className="relative w-full h-56 rounded-xl overflow-hidden bg-rose-50 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <p className="text-xs text-rose-300">Photo Slot ({label})</p>
        <canvas
          ref={canvasRef}
          width={260}
          height={224}
          className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none"
        />
      </div>
      <p className="font-serif text-xs text-slate-600 mt-3 italic">{label}</p>
    </div>
  );
}

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "2707") {
      setPassError(false);
      setIsUnlocked(true);
      // Play Elvis Presley background music upon unlocking
      if (audioRef.current) {
        audioRef.current.play().catch(() => console.log("Audio playback user gesture required"));
        setIsPlaying(true);
      }
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      setPassError(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FDF6F0] text-[#5A3A42] overflow-x-hidden p-4 md:p-8 font-sans">
      
      {/* BACKGROUND MUSIC: Can't Help Falling In Love - Elvis Presley */}
      <audio
        ref={audioRef}
        loop
        src="https://ia800300.us.archive.org/21/items/ElvisPresleyCantHelpFallingInLove_201902/Elvis%20Presley%20-%20Can%27t%20Help%20Falling%20In%20Love.mp3"
      />

      {/* MUSIC TOGGLE BUTTON */}
      {isUnlocked && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-40 p-3 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-lg text-rose-500 hover:scale-110 transition"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* 1. INTRO LOCK SCREEN WITH PASSCODE 2707 */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDF6F0] px-4"
          >
            <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl max-w-md w-full text-center border border-pink-100 shadow-2xl space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-rose-400 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-rose-900">For Saima ❤️</h2>
                <p className="text-xs text-rose-400 mt-1">Enter our passcode to unlock</p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4">
                <input
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="****"
                  className="w-full text-center tracking-widest text-2xl py-3 rounded-2xl bg-pink-50/50 border border-pink-200 focus:outline-none text-rose-900"
                />
                {passError && (
                  <p className="text-xs text-rose-500 flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Incorrect code
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-rose-400 text-white font-medium text-sm shadow-md hover:bg-rose-500 transition-all hover:scale-[1.02]"
                >
                  Unlock Experience 🗝️
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN WEBSITE CONTENT */}
      {isUnlocked && (
        <div className="max-w-4xl mx-auto space-y-12 relative z-10 py-6">
          
          {/* HEADER */}
          <header className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-rose-600 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Happy 2 Months Anniversary
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-rose-900">
              Happy Anniversary, <span className="italic font-normal text-rose-500">Saima</span>
            </h1>
          </header>

          {/* SCRATCH CARDS SECTION */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-center text-rose-900">Scratch to Reveal Our Memories ✨</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScratchCard imageSrc="/images/photo1.jpg" label="Our Special Day" />
              <ScratchCard imageSrc="/images/photo2.jpg" label="Favorite Memory" />
              <ScratchCard imageSrc="/images/photo3.jpg" label="Always Together" />
            </div>
          </section>

          {/* COMPLETE LOVE LETTER SECTION */}
          <section className="bg-white/90 p-8 md:p-12 rounded-3xl border border-rose-100 shadow-md max-w-2xl mx-auto space-y-6">
            <h3 className="font-serif font-bold text-2xl text-rose-900 flex items-center gap-2">
              <Mail className="w-6 h-6 text-rose-400" /> A Letter For You
            </h3>
            
            <div className="prose prose-rose font-serif text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
{`To Saima,my girlfriend,my better half,my other half,my wife,my jaan,my priyotoma,the most important person in my life,the person I love the most and my baby

Happy 2 months anniversary,i rly dont know how fast this 2 moths went by ami to kalker chad  rat ei L you lekhlam and tumi Love u too gng lekhla time rly doesnt w8.I dnt know what to say rly i was searching for inspo but aktao moner moto paccilam nah,so amr ja moner bhitor asche tai lekhtesi yk you are sleeping when I am writing this call e akhn 6:22 baje 26/7/2026 sokal bela context dilam.

First of all,thank u for all this love,care,kindness and affection u have shown toward me Saima.I rly didnt know 2 months age je there would be someone like u who will love me,care for me and js want my presence like you.In my life i never felt this special in 16 yearsss.This 2 months was a literal heaven for me.Thank u saima.I rly love u

Secondly,I am sorry for all the stupid mistakes i do which make u angry,mad or sad.I never had a rltn saima i rly didnt know how to understand girls or even talk to them aijonno i rly dont know how to make u happy or understand u.But ai 2 months e ig i am improved yk i rly dont know if i am improved or not but i can understand when ur mood is off,when u are sad.Ik saima i have to be better for u i am trying everyday to be better.Pls give me time I will be better js for u

Thirdly,I love u saima,I rly do I dnt know how to prove it yk ami choto thakei airkm stubborn,serios and js akta jinish niye pore thaki.Tumr bepareo ami same.I rly want to make u my wife saima.I dnt know if i will succed or not but I promise I will try above my best to make u my wife and gift u the happiest life ever.I will beg uncle and aunt to give ur hand to me.I rly want to marry u,build a home where u are there,have beautiful kids and js spend everyday with u.I love u saima and I forever will I can promise that yk I dnt know future e what I will achieve but ik I will love u forever till my last breath

idk what I am writing I js hope u like it my love.jaihok I dnt know what can I ask from u I js want to request u one thing pls stay beside me like this forever in my good,bad,happy,sad,proud and disappointing times,i rly don't know how will I survive without u saima.I rly cant live a day without u my love.Pls never leave me

Happy anniversary again my love.I hope like this I can wish u forever like this and 27th may become a celebrating occasion in both of our life.I love u saima.And like 2 months ago L you ❤️❤️❤️`}
            </div>
          </section>

        </div>
      )}
    </main>
  );
}
