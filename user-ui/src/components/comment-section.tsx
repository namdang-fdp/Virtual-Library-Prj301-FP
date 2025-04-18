import { MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { CommentPost } from './comment-post';
import { CommentList } from './comment-list';

export const CommentSection = ({ bookId }: { bookId: string }) => {
    const { data: comments } = useQuery({
        queryKey: ['book', bookId, 'comment'],
        queryFn: () => api.book.getComment(bookId),
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Discussion
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                        ({comments?.length})
                    </span>
                </h2>
            </div>

            <Separator className="my-6" />
            <CommentPost bookId={bookId} />
            <CommentList bookId={bookId} />
        </div>
    );
};
