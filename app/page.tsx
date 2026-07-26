"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Sparkles, MailOpen, Calendar, KeyRound, ShieldAlert, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "2707") {
      setError(false);
      setIsSecretUnlocked(true);
    } else {
      setError(true);
    }
  };

  const triggerConfetti = () => {
    setIsGiftOpen(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FDE2E4", "#B88E8D", "#884A5C", "#FFFFFF"],
    });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#FFF1E6] via-[#FDE2E4] to-[#E2ECE9] text-[#5A3A42] px-4 py-8 overflow-hidden">
      
      {/* 1. LOCK SCREEN */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF1E6] px-4"
          >
            <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-md w-full text-center flex flex-col items-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center text-[#884A5C] shadow-inner">
                <Lock className="w-9 h-9" />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-semibold text-[#884A5C]">Our Digital Sanctuary</h2>
                <p className="text-sm text-[#B88E8D] mt-2 font-light">A timeless collection of our memories & love.</p>
              </div>
              <button
                onClick={() => setIsUnlocked(true)}
                className="w-full py-4 rounded-full bg-[#884A5C] text-white font-medium tracking-wide shadow-lg hover:bg-[#884A5C]/90 transition"
              >
                Tap to Unlock Experience
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {isUnlocked && (
        <div className="max-w-4xl mx-auto space-y-24 pt-12">
          
          {/* 2. HERO SECTION */}
          <section className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel text-xs text-[#884A5C] font-medium">
              <Sparkles className="w-4 h-4 text-[#B88E8D] animate-spin" />
              <span>Celebrating Our Journey</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#884A5C] tracking-tight">
              Happy Anniversary, <br />
              <span className="font-cursive text-6xl md:text-8xl text-[#B88E8D] font-normal">Saima</span>
            </h1>
            <p className="max-w-md mx-auto text-slate-700 font-light">
              Every second spent with you feels like a fairytale. Here is a celebration of us.
            </p>
          </section>

          {/* 3. LETTER SECTION (UNTOUCHED) */}
          <section className="glass-panel p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#884A5C] mb-6 flex items-center gap-2">
              <MailOpen className="w-6 h-6 text-[#B88E8D]" /> A Letter For You
            </h2>
            <div className="prose prose-rose max-w-none font-serif text-slate-800 leading-relaxed text-base md:text-lg whitespace-pre-line">
{`Thirdly,I love u saima,I rly do I dnt know how to prove it yk ami choto thakei airkm stubborn,serios and js akta jinish niye pore thaki.Tumr bepareo ami same.I rly want to make u my wife saima.I dnt know if i will succed or not but I promise I will try above my best to make u my wife and gift u the happiest life ever.I will beg uncle and aunt to give ur hand to me.I rly want to marry u,build a home where u are there,have beautiful kids and js spend everyday with u.I love u saima and I forever will I can promise that yk I dnt know future e what I will achieve but ik I will love u forever till my last breath


idk what I am writing I js hope u like it my love.jaihok I dnt know what can I ask from u I js want to request u one thing pls stay beside me like this forever in my good,bad,happy,sad,proud and disappointing times,i rly don't know how will I survive without u saima.I rly cant live a day without u my love.Pls never leave me

Happy anniversary again my love.I hope like this I can wish u forever like this and 27th may become a celebrating occasion in both of our life.I love u saima.And like 2 months ago L you❤️❤️❤️`}
            </div>
          </section>

          {/* 4. REASONS I LOVE YOU */}
          <section className="space-y-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-[#884A5C]">Reasons I Love You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Your laugh brightens up my darkest days.",
                "Your caring heart and warmth.",
                "How effortlessly we talk for hours.",
                "Your support in everything I do.",
                "Your beautiful smile that makes my heart melt.",
                "Simply because you are unconditionally Saima."
              ].map((reason, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center space-y-3">
                  <Heart className="w-6 h-6 fill-[#884A5C] text-[#884A5C]" />
                  <p className="text-sm text-slate-700">"{reason}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. PASSWORD GATE (2707) */}
          <section className="max-w-md mx-auto text-center">
            <div className="glass-panel p-8 rounded-3xl shadow-xl">
              <KeyRound className="w-12 h-12 mx-auto text-[#884A5C] mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#884A5C]">Secret Passcode</h3>
              <p className="text-xs text-[#B88E8D] mt-1 mb-6">Enter our special code to unlock the gift.</p>

              {!isSecretUnlocked ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <input
                    type="password"
                    maxLength={4}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="****"
                    className="w-full text-center tracking-widest text-2xl py-3 rounded-xl bg-white/80 border border-[#B88E8D]/30 focus:outline-none text-[#884A5C]"
                  />
                  {error && (
                    <p className="text-xs text-rose-500 flex items-center justify-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Incorrect code (Hint: 2707)
                    </p>
                  )}
                  <button type="submit" className="w-full py-3 rounded-xl bg-[#884A5C] text-white font-medium shadow-md">
                    Unlock Gift Box
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  {!isGiftOpen ? (
                    <button
                      onClick={triggerConfetti}
                      className="px-8 py-4 rounded-full bg-[#884A5C] text-white font-medium shadow-lg hover:scale-105 transition flex items-center gap-2 mx-auto"
                    >
                      <Gift className="w-5 h-5" /> Open Gift Box 🎁
                    </button>
                  ) : (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-4">
                      <Heart className="w-12 h-12 text-[#884A5C] fill-[#884A5C] mx-auto animate-bounce" />
                      <h4 className="font-serif text-2xl font-bold text-[#884A5C]">I Love You Forever, Saima!</h4>
                      <p className="text-sm text-slate-700">You are my present, my future, and my greatest blessing.</p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </section>

        </div>
      )}
    </main>
  );
}
