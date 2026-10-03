"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { LuFlaskConical } from "react-icons/lu";
import type { MockPreset } from "@/data/mockFormData";
import { cn } from "@/lib/utils";

interface FillMockDataButtonProps<T> {
    presets: MockPreset<T>[];
    onSelectPreset: (data: T) => void;
    className?: string;
}

export default function FillMockDataButton<T>({
    presets,
    onSelectPreset,
    className
}: FillMockDataButtonProps<T>) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        const preset = presets[index];
        if (!preset) return;

        setActiveIndex(index);
        onSelectPreset(preset.data);
        toast.success(`Loaded Test Data: ${preset.label}`, {
            description: preset.description,
            duration: 3000
        });
    };

    const handleCycle = () => {
        const nextIndex = activeIndex === null ? 0 : (activeIndex + 1) % presets.length;
        handleSelect(nextIndex);
    };

    return (
        <div
            className={cn(
                "flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-xl border border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 shadow-2xs backdrop-blur-xs transition-colors duration-200",
                className
            )}
            role="group"
            aria-label="Fill test form data presets"
        >
            <button
                type="button"
                onClick={handleCycle}
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold text-foreground hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors duration-150 cursor-pointer select-none"
                title="Click to cycle test data presets"
            >
                <LuFlaskConical size={14} className="text-primary shrink-0 animate-bounce duration-1000" />
                <span className="text-[11px] sm:text-xs">Test Data:</span>
            </button>

            <div className="flex items-center gap-1">
                {presets.map((preset, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelect(idx)}
                            className={cn(
                                "px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium cursor-pointer transition-all duration-150 select-none",
                                isActive
                                    ? "bg-primary text-primary-foreground font-semibold shadow-xs scale-102"
                                    : "bg-slate-100 dark:bg-zinc-800/80 text-muted-foreground hover:text-foreground hover:bg-slate-200/80 dark:hover:bg-zinc-700"
                            )}
                            title={`Preset ${idx + 1}: ${preset.label} — ${preset.description}`}
                            aria-pressed={isActive}
                        >
                            #{idx + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
