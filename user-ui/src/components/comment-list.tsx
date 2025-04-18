import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { toast } from 'sonner';
import { Flag, MessageSquare } from 'lucide-react';
import { Comment as CommentEntity } from '@/api/book';
import { ReportDialog } from './report-dialog';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { NavLink } from 'react-router';
import { cn, formatISO } from '@/lib/utils';
import { User } from '@/api/user';

const Comment = (comment: CommentEntity & { self?: User }) => {
    const {
        data: user,
        status,
        error,
    } = useQuery({
        queryKey: ['user', comment.username],
        queryFn: () => api.user.find(comment.username),
    });
    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <>
            <div
                key={comment.id}
                className="group relative bg-background rounded-2xl p-5 shadow-sm border border-muted/50 hover:border-primary/20 transition-colors"
            >
                <ReportDialog
                    title="Report comment"
                    report={(reason) => api.comment.report(comment.id, reason)}
                >
                    <Button
                        variant="ghost"
                        className={cn(
                            'opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute top-2 right-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-destructive',
                            comment.self?.username !== user.username ? '' : 'hidden',
                        )}
                        title="Report comment"
                    >
                        <Flag className="h-4 w-4" />
                        <span>Report</span>
                    </Button>
                </ReportDialog>
                <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage
                            src={user.avatarPath}
                            alt={comment.username}
                        />
                        <AvatarFallback>
                            {comment.username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <NavLink
                                    to={`/user/${comment.username}`}
                                    className="hover:underline"
                                >
                                    <h4 className="font-medium text-foreground">
                                        {comment.username}
                                    </h4>
                                </NavLink>
                                <span className="text-xs text-muted-foreground">
                                    {formatISO(comment.createdAt)}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed">
                            {comment.content}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export const CommentList = ({ bookId }: { bookId: string }) => {
    const {
        data: comments,
        status,
        error,
    } = useQuery({
        queryKey: ['book', bookId, 'comment'],
        queryFn: () => api.book.getComment(bookId),
    });

    const { data: self } = useQuery({
        queryKey: ['self'],
        queryFn: () => api.user.self(),
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <div className="space-y-6 pt-4">
            {comments.length === 0 ? (
                <div className="text-center py-16 bg-background rounded-2xl shadow-sm border border-muted/50">
                    <MessageSquare className="h-12 w-12 mx-auto text-primary/40 mb-3" />
                    <p className="text-muted-foreground">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                </div>
            ) : (
                comments.map((comment) => <Comment {...comment} self={self} />)
            )}
        </div>
    );
};
