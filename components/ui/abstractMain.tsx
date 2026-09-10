import React from 'react';
import { 
  Shapes, 
  Spline,
  Orbit, 
  Grip, 
  Compass, 
  Globe, 
  Atom, 
  Disc, 
  Triangle, 
  Hexagon, 
  Crosshair,
  CircleDashed,
  Cpu,
  Boxes,
} from 'lucide-react'; 

export const AbstractBg: React.FC = () => {
  return (
    <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none opacity-70 dark:opacity-20">
      
      <div className="absolute -top-20 left-1/4 w-lg h-128 bg-linear-to-br from-emerald-500/8 via-teal-500/5 dark:from-emerald-400/18 dark:via-teal-400/12 to-transparent rounded-full blur-3xl mix-blend-plus-lighter" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-160 h-112 bg-linear-to-r from-cyan-500/6 via-indigo-500/6 to-fuchsia-500/6 dark:from-cyan-400/15 dark:via-indigo-400/15 dark:to-fuchsia-400/12 rounded-full blur-3xl opacity-60 dark:opacity-80 mix-blend-plus-lighter" />
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-100 h-100 bg-linear-to-l from-indigo-500/8 via-sky-500/5 dark:from-indigo-400/18 dark:via-sky-400/12 to-transparent rounded-full blur-3xl mix-blend-plus-lighter" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-140 h-140 bg-linear-to-t from-amber-500/6 via-slate-500/4 dark:from-amber-400/14 dark:via-cyan-900/10 to-transparent rounded-full blur-3xl mix-blend-plus-lighter" />
      
      <div className="absolute -top-8 left-[28%] opacity-35 dark:opacity-75">
        <Atom className="w-72 h-72 stroke-slate-400/30 dark:stroke-teal-500/30 fill-transparent animate-spin-slow" strokeWidth={0.25} />
      </div>

      <div className="absolute -top-12 right-[20%] opacity-35 dark:opacity-70">
        <Disc className="absolute top-16 left-16 w-36 h-36 stroke-teal-400/20 dark:stroke-teal-300/50 fill-teal-500/3 dark:fill-teal-400/10" strokeWidth={0.4} />
      </div>

      <div className="absolute top-0 left-0 opacity-40 dark:opacity-80">
        <CircleDashed className="w-52 h-52 stroke-slate-400/25 dark:stroke-slate-300/40 fill-transparent animate-spin-slow" strokeWidth={0.35} />
      </div>

      <div className="absolute top-[40%] left-[2%] opacity-35 dark:opacity-40">
        <Boxes className="w-40 h-40 stroke-indigo-400/20 dark:stroke-indigo-300/50 fill-transparent" strokeWidth={0.35} />
      </div>

      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-60">
        <Grip className="w-80 h-80 text-slate-400/10 dark:text-slate-300/25 rotate-60" strokeWidth={0.3} />
      </div>

      <div className="absolute top-[2%] right-[30%] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-80">
        <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 stroke-cyan-500/20 dark:stroke-cyan-300/60" strokeWidth={0.4} />
      </div>

      <div className="absolute top-[38%] left-[64%] opacity-40 dark:opacity-75">
        <Cpu className="w-44 h-44 stroke-slate-400/25 dark:stroke-purple-300/45 fill-transparent" strokeWidth={0.35} />
      </div>

      <div className="absolute top-[70%] left-[40%] opacity-40 dark:opacity-75">
        <Shapes className="w-48 h-48 stroke-slate-400/20 dark:stroke-slate-300/40 fill-slate-500/3 dark:fill-slate-300/5" strokeWidth={0.35} />
      </div>

      <div className="absolute bottom-6 left-[15%] opacity-40 dark:opacity-50">
        <Globe className="w-64 h-64 stroke-slate-400/20 dark:stroke-sky-300/45 fill-transparent" strokeWidth={0.3} />
      </div>

      <div className="absolute top-20 left-[70%] opacity-40 dark:opacity-80">
        <Compass className="absolute top-10 left-10 w-44 h-44 stroke-indigo-400/20 dark:stroke-indigo-300/55 fill-transparent" strokeWidth={0.4} />
      </div>

      <div className="absolute -bottom-15 left-[58%] opacity-40 dark:opacity-50">
        <Spline className="w-130 h-130 stroke-cyan-500/15 dark:stroke-cyan-300/45 fill-transparent" strokeWidth={0.35} />
        <Orbit className="absolute bottom-20 right-12 w-72 h-72 stroke-slate-400/20 dark:stroke-slate-300/40 fill-transparent animate-spin-slow" strokeWidth={0.3} />
      </div>

      <Triangle className="absolute top-[40%] left-[48%] w-3 h-3 stroke-slate-400/25 dark:stroke-cyan-300/50 fill-transparent rotate-12" strokeWidth={0.8} />
      <Hexagon className="absolute top-[52%] left-[50%] w-4 h-4 stroke-slate-400/20 dark:stroke-fuchsia-300/45 fill-transparent rotate-30" strokeWidth={0.7} />
      <div className="absolute top-[46%] left-[51%] w-2 h-2 border border-slate-400/25 dark:border-slate-300/50 rotate-45" />

      <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] dark:bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [bg-size:32px_32px] opacity-[0.025] dark:opacity-[0.05] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

    </div>
  );
};