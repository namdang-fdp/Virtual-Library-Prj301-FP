import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import * as api from '@/api';

type Props = {
    id: string;
    rating: number;
    ratingCount: number;
};

export const Rating = ({ id, rating, ratingCount }: Props) => {
    const [hoverRating, setHoverRating] = useState(0);

    const queryClient = useQueryClient();
    const { mutate: rate } = useMutation({
        mutationFn: ({ id, rating }: { id: string; rating: number }) =>
            api.book.rate(id, rating),
        onSuccess: (_, { id, rating }) => {
            queryClient.invalidateQueries({
                queryKey: ['book', id],
            });
            toast.info(`You rated this book ${rating} stars.`);
        },
        onError: (error) => toast.error(error.message),
    });

    return (
        <div className="flex items-center">
            <div className="flex">
                {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                        <button
                            key={i}
                            type="button"
                            className="p-0 bg-transparent border-none cursor-pointer transition-transform hover:scale-110"
                            onClick={() => rate({ id, rating: starValue })}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <Star
                                className={`h-5 w-5 transition-colors ${
                                    hoverRating
                                        ? starValue <= hoverRating
                                            ? 'text-amber-500 fill-amber-500'
                                            : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                        : starValue <= Math.floor(rating)
                                          ? 'text-amber-500 fill-amber-500'
                                          : starValue === Math.ceil(rating) &&
                                              rating % 1 >= 0.5
                                            ? 'text-amber-500 fill-amber-500/50'
                                            : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            <span className="ml-2 font-medium">
                {isNaN(rating) ? 'Not rated' : rating.toFixed(1)}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
                ({ratingCount})
            </span>
        </div>
    );
};
