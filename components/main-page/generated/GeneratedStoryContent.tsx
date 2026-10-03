"use client";

import { useStoryPollingStore } from "@/store/storyPolling";
import LoadingResult from "../LoadingResult";
import { Button } from "@/components/ui/button";
import { useCurrentStepStore, currentStep } from "@/store/currentStep";
import ExportMenu from "./ExportMenu";
import type { ExportPayload } from "@/lib/export/exportContent";
import {
    MdArrowBack,
    MdAutoStories,
    MdCheck,
    MdContentCopy,
    MdEdit,
    MdOutlineUndo,
    MdRunningWithErrors,
    MdVisibility
} from "react-icons/md";
import Image from "next/image";
import { useState } from "react";

export default function GeneratedStoryContent() {
    const { result, status, error, reset } = useStoryPollingStore();
    const { setCurrentStep } = useCurrentStepStore();
    const [copied, setCopied] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState<string | null>(null);
    const [editedStory, setEditedStory] = useState<string | null>(null);

    const title = editedTitle ?? result?.title ?? "";
    const story = editedStory ?? result?.story ?? "";

    const isModified =
        (editedTitle !== null && editedTitle !== result?.title) ||
        (editedStory !== null && editedStory !== result?.story);

    if (!result && (status === "submitting" || status === "polling")) {
        return (
            <LoadingResult
                title="Ghostwriter is writing your story..."
                subtitle="Developing characters, weaving the plot, and bringing the narrative to life..."
                type="story"
            />
        );
    }

    if (!result && status === "failed") {
        return (
            <div className="flex flex-col lg:flex-1 w-full max-w-xl xl:max-w-2xl mx-auto justify-center items-center p-4 lg:h-[680px]">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-destructive/20 bg-destructive/5 dark:bg-destructive/10 max-w-md transition-colors duration-200 shadow-sm">
                    <MdRunningWithErrors size={40} className="text-destructive mb-3" />
                    <h3 className="text-lg font-bold text-foreground">Generation Failed</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 mb-5">
                        {error || "An error occurred while generating your story. Please try again."}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => setCurrentStep(currentStep.step2)}
                        >
                            Edit Parameters
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => setCurrentStep(currentStep.step2)}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center lg:flex-1 lg:h-[680px]">
                <p className="text-sm text-muted-foreground">No generated story yet.</p>
            </div>
        );
    }

    const wordCount = story.match(/\S+/gu)?.length ?? 0;
    const readingTimeMin = Math.max(1, Math.round(wordCount / 200));

    const handleCopy = async () => {
        const fullText = `${title}\n\n${story}`;
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRevert = () => {
        setEditedTitle(null);
        setEditedStory(null);
    };

    const handleReset = () => {
        reset();
        setCurrentStep(currentStep.step1);
    };

    const getExportPayload = (): ExportPayload => ({
        filename: `story-${(title || "narrative").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`,
        title: title || "Untitled Story",
        contentType: "story",
        sections: [
            { heading: "Narrative", body: story }
        ],
        metadata: {
            wordCount,
            readingTimeMin
        }
    });

    return (
        <div className="flex flex-col lg:flex-1 w-full max-w-xl xl:max-w-2xl mx-auto lg:h-[680px] lg:max-h-[calc(100vh-140px)]">
            <div className="shrink-0 flex justify-center items-center pb-2">
                <div className="flex gap-3 justify-center items-center p-2 sm:p-3">
                    <Image
                        src="/ghost.png"
                        alt="ghost logo"
                        height={50}
                        width={50}
                        className="size-10 sm:size-12 object-contain shrink-0"
                    />

                    <div>
                        <div className="flex text-lg sm:text-xl font-semibold items-center gap-2 text-light-text-main dark:text-dark-text-main transition-colors duration-200">
                            Your story is ready!
                            <MdAutoStories
                                size={22}
                                className="text-[#f77f00]/70 dark:text-[#f77f00]/90 transition-colors duration-200 shrink-0"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm text-light-text-background dark:text-dark-text-background transition-colors duration-200">
                                {wordCount} words (~{readingTimeMin} min read)
                            </p>
                            {isModified && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    Edited
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col w-full py-1 px-2 sm:px-4">
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 text-card-foreground shadow-xs transition-colors duration-200">
                    <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 p-3 sm:px-5 sm:py-3 border-b border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/40">
                        <div className="flex items-center gap-1.5">
                            <Button
                                type="button"
                                variant={isEditing ? "default" : "outline"}
                                size="sm"
                                onClick={() => setIsEditing(!isEditing)}
                                className="h-8 px-2.5 sm:px-3 text-xs font-medium cursor-pointer transition-colors duration-200 flex items-center gap-1"
                            >
                                {isEditing ? (
                                    <>
                                        <MdVisibility size={15} />
                                        <span>Preview</span>
                                    </>
                                ) : (
                                    <>
                                        <MdEdit size={14} />
                                        <span>Edit</span>
                                    </>
                                )}
                            </Button>

                            {isModified && isEditing && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRevert}
                                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-1"
                                    title="Revert to original AI generated content"
                                >
                                    <MdOutlineUndo size={15} />
                                    <span>Revert</span>
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 h-8 px-2.5 sm:px-3 text-xs font-medium cursor-pointer transition-colors duration-200"
                            >
                                {copied ? (
                                    <>
                                        <MdCheck size={15} className="text-emerald-500" />
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <MdContentCopy size={14} />
                                        <span>Copy</span>
                                    </>
                                )}
                            </Button>

                            <ExportMenu getPayload={getExportPayload} />
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 flex flex-col p-4 sm:p-5 overflow-y-auto">
                        {isEditing ? (
                            <div className="flex flex-col gap-3.5 flex-1">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        Story Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className="w-full text-base sm:text-lg font-serif font-bold px-3 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors duration-200"
                                        placeholder="Enter story title..."
                                    />
                                </div>

                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        Story Prose
                                    </label>
                                    <textarea
                                        value={story}
                                        onChange={(e) => setEditedStory(e.target.value)}
                                        className="w-full min-h-[240px] flex-1 font-serif text-sm sm:text-base leading-relaxed p-3.5 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-zinc-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors duration-200 resize-y"
                                        placeholder="Enter story prose..."
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3.5">
                                <div className="flex flex-col gap-1 pb-3 border-b border-slate-200/60 dark:border-white/10">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        Story Title
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold font-serif text-primary dark:text-amber-400 leading-snug break-words">
                                        {title}
                                    </h3>
                                </div>

                                <div className="pt-1">
                                    <div className="font-serif text-sm sm:text-base leading-relaxed sm:leading-loose whitespace-pre-wrap text-foreground select-text">
                                        {story}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="shrink-0 flex items-center justify-between w-full pt-4 pb-1 px-2 sm:px-4 mt-2 border-t border-slate-200/80 dark:border-white/10">
                <Button
                    type="button"
                    variant="outline"
                    className="w-auto! shrink-0 flex items-center gap-2 cursor-pointer h-10 px-4 text-sm font-medium transition-colors duration-200"
                    onClick={() => setCurrentStep(currentStep.step2)}
                >
                    <MdArrowBack size={18} />
                    Back to Edit
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    className="w-auto! shrink-0 flex items-center gap-2 cursor-pointer h-10 px-5 text-sm font-medium transition-colors duration-200"
                    onClick={handleReset}
                >
                    Start Over
                </Button>
            </div>
        </div>
    );
}
