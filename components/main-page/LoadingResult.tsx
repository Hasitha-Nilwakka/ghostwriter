import { Loader } from "../ui/loader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

interface LoadingResultProps {
    title?: string;
    subtitle?: string;
    type?: "email" | "social_media" | "story";
}

export default function LoadingResult({
    title = "Ghostwriter is generating your content...",
    subtitle = "Drafting paragraphs, refining tone, and polishing prose...",
    type
}: LoadingResultProps) {
    return (
        <div className="flex flex-col flex-1 w-full max-w-xl xl:max-w-2xl mx-auto justify-center items-center p-3 sm:p-6 lg:h-[680px] lg:max-h-[calc(100vh-140px)] transition-colors duration-200">
            <div className="flex flex-col items-center text-center">
                <div className="relative flex items-center justify-center size-20 sm:size-24 mb-3">
                    <Loader variant="paired-revolution" size="xl" className="text-primary" />
                    <Image
                        src="/ghost.png"
                        alt="ghost logo"
                        width={36}
                        height={36}
                        className="absolute size-8 sm:size-9 object-contain pointer-events-none animate-pulse"
                    />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-light-text-main dark:text-dark-text-main tracking-tight transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-xs sm:text-sm text-light-text-background dark:text-dark-text-background transition-colors duration-200 mt-1 max-w-md">
                    {subtitle}
                </p>
            </div>

            <div className="w-full px-1 sm:px-2 mt-6 sm:mt-8">
                <Card className="w-full p-4 sm:p-6 ring-0! bg-white/40 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-xs transition-colors duration-200">
                    <CardContent className="space-y-4 p-0!">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                            <div className="flex items-center gap-2.5 w-2/3">
                                <Skeleton className="size-6 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-3/4 rounded-md" />
                            </div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 bg-muted/60 dark:bg-zinc-800/80 px-2.5 py-0.5 rounded-md border border-border/40">
                                {type === "email" ? "Email Draft" : type === "social_media" ? "Post Preview" : type === "story" ? "Story Manuscript" : "Draft Preview"}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2.5 pt-1">
                            <Skeleton className="h-3.5 w-full rounded-md" />
                            <Skeleton className="h-3.5 w-11/12 rounded-md" />
                            <Skeleton className="h-3.5 w-4/5 rounded-md" />
                        </div>

                        <div className="flex flex-col gap-2.5 pt-2">
                            <Skeleton className="h-3.5 w-full rounded-md" />
                            <Skeleton className="h-3.5 w-5/6 rounded-md" />
                            <Skeleton className="h-3.5 w-2/3 rounded-md" />
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60 dark:border-white/10">
                            <Skeleton className="h-5 w-20 rounded-md" />
                            <Skeleton className="h-5 w-16 rounded-md" />
                            <Skeleton className="h-5 w-24 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}