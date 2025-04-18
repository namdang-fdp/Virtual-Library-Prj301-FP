import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '@/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Send } from 'lucide-react';

export const CommentPost = ({ bookId }: { bookId: string }) => {
    const { data: user, status } = useQuery({
        queryKey: ['self'],
        queryFn: () => api.user.self(),
    });
    const [content, setContent] = useState('');
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (content: string) =>
            api.book.comment(bookId, content),
        onSuccess: () => {
            toast.info('Your comment has been successfully posted.');
            queryClient.invalidateQueries({
                queryKey: ['book', bookId, 'comment'],
            });
            setContent('');
        },
        onError: (error) => toast.error(error.message),
    });

    if (status !== 'success') {
        return <div></div>;
    }

    return (
        <div className="bg-background rounded-2xl p-6 shadow-sm border border-muted/50">
            <div className="flex gap-4">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={user.avatarPath} alt="Your avatar" />
                    <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                    <Textarea
                        placeholder="Share your thoughts about this book..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[100px] resize-none bg-muted/30 border-muted focus-visible:ring-primary/30 rounded-xl"
                    />
                    <div className="flex justify-end">
                        {mutation.status === 'pending' ? (
                            <Button disabled>
                                <Loader2 className="animate-spin" />
                                Posting
                            </Button>
                        ) : (
                            <Button
                                onClick={() => mutation.mutate(content)}
                                className="gap-2 rounded-full px-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <Send className="h-4 w-4" />
                                Post Comment
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
