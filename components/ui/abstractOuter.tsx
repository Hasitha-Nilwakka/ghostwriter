import React from 'react';

export const AbstractOuter: React.FC = () => {
  return (
    <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none dark:opacity-40">
      <div className="absolute -top-20 left-1/4 w-lg h-128 bg-linear-to-br from-emerald-500/8 via-teal-500/5 dark:from-emerald-500/10 dark:via-teal-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-100 h-100 bg-linear-to-l from-indigo-500/20 via-sky-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-140 h-140 bg-linear-to-t from-amber-500/10 via-slate-500/4 to-transparent rounded-full blur-3xl" />
    </div>
  );
};