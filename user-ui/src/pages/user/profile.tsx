import { BookCardFull } from '@/components/book-card';
import { UserInfo } from '@/components/user-info';
import { UserProfileHeader } from '@/components/user-profile-header';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as api from '@/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Pagination } from '@/components/pagination';

export const UserProfile = () => {
    const { username } = useParams();
    const [pageSize, setPageSize] = useState(15);
    const [pageIndex, setPageIndex] = useState(0);

    const userQuery = useQuery({
        queryKey: ['user', username],
        queryFn: () => api.user.find(username!),
    });

    const bookQuery = useQuery({
        queryKey: ['user', username, 'postedBook', pageIndex, pageSize],
        queryFn: () =>
            api.user.postedBook(username!, {
                page: pageIndex,
                size: pageSize,
                sort: [],
            }),
    });

    const commentQuery = useQuery({
        queryKey: ['user', username, 'comment'],
        queryFn: () => api.user.countComment(username!),
    });

    if (
        userQuery.status === 'pending' ||
        bookQuery.status === 'pending' ||
        commentQuery.status === 'pending'
    ) {
        return <span>Loading...</span>;
    }

    if (userQuery.status === 'error') {
        toast.error(userQuery.error.message);
        return <div></div>;
    }

    if (bookQuery.status === 'error') {
        toast.error(bookQuery.error.message);
        return <div></div>;
    }

    if (commentQuery.status === 'error') {
        toast.error(commentQuery.error.message);
        return <div></div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <UserProfileHeader user={userQuery.data} />

            <div className="container mx-auto px-4 pb-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <UserInfo
                        user={userQuery.data}
                        comment={commentQuery.data}
                    />

                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
                                            {bookQuery.data.content.length}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Posted Books
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {bookQuery.data.content.map((book) => (
                                        <BookCardFull {...book} />
                                    ))}
                                </div>
                            </div>

                            <Pagination
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                                pageIndex={pageIndex}
                                setPageIndex={setPageIndex}
                                pageCount={bookQuery.data.totalPages ?? 0}
                                entryCount={bookQuery.data.content.length ?? 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
