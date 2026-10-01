import { Loader } from "../ui/loader";
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from "../ui/skeleton";


export default function LoadingResult() {
    return (
        <div 
            className="
                flex flex-1 flex-col
                items-center"
        >
            <Loader variant='paired-revolution' size="xl"/>
            <p 
                className="
                    animate-bounce 
                    animate-duration-1500 
                    animate-iteration-count-infinite 
                    animate-fill-mode-both 
                    text-light-text-background
                    font-thin
                    text-lg"
            >
                Ghost is working
            </p>
            <div className="min-w-fit">
                <Card className='w-full ring-0! bg-white/40'>
                    <CardContent className='space-y-4'>
                        <div className='flex flex-col gap-3'>
                        <Skeleton className='h-2 w-48' />
                        <div className='flex items-center gap-2 flex-col'>
                            <Skeleton className='h-2 w-full' />
                            <Skeleton className='h-2 w-full' />
                        </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Skeleton className='h-2 w-48' />
                            <Skeleton className='h-2 w-48' />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}