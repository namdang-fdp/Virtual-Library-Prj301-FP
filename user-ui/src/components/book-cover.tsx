import { BookOpen, Copy, Download, Share } from 'lucide-react';
import { Button } from './ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { MouseEventHandler } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';

type Props = {
    coverPath: string;
    coverAlt?: string;
    onRead?: MouseEventHandler<HTMLButtonElement>;
    onDownload?: MouseEventHandler<HTMLButtonElement>;
};

export const BookCover = ({
    coverPath,
    coverAlt,
    onRead,
    onDownload,
}: Props) => {
    return (
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <div className="flex items-center justify-center relative w-64 md:w-56 lg:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group">
                <img
                    src={coverPath || '/placeholder.svg'}
                    alt={coverAlt}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    onClick={onRead}
                                    className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white text-black hover:bg-white/90"
                                >
                                    <BookOpen className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Read PDF</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    onClick={onDownload}
                                    className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                >
                                    <Download className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Download</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Dialog>
                        <DialogTrigger asChild>
                                        <Button
                                            size="icon"
                                            className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                        >
                                            <Share className="h-5 w-5" />
                                        </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Share link</DialogTitle>
                                <DialogDescription>
                                    Anyone who has this link will be able to
                                    view this.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        defaultValue={window.location.href}
                                        readOnly
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="px-3"
                                >
                                    <span className="sr-only">Copy</span>
                                    <Copy />
                                </Button>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
