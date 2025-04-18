import { BookCard, BookCardFull } from '@/components/book-card';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { Eye, Search, Star, Users } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { toast } from 'sonner';
import * as api from '@/api';

const GenreSelect = ({
    selectedGenres,
    setSelectedGenres,
}: {
    selectedGenres: string[];
    setSelectedGenres: Dispatch<SetStateAction<string[]>>;
}) => {
    const {
        data: genres,
        status,
        error,
    } = useQuery({
        queryKey: ['genre'],
        queryFn: () =>
            api.genre.get().then((data) =>
                data.map((genre) => {
                    return {
                        label: genre,
                        value: genre,
                    };
                }),
            ),
    });

    if (status === 'error') {
        toast.error(error.message);
    }

    return (
        <MultiSelect
            className="w-full my-auto md:w-[180px] h-10 border-gray-200"
            placeholder="Genres"
            options={genres ?? []}
            selectedOptions={selectedGenres}
            setSelectedOptions={setSelectedGenres}
        />
    );
};

export const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState<string | undefined>(undefined);
    const [orderDirection, setOrderDirection] = useState<string | undefined>(
        undefined,
    );
    const [pageSize, setPageSize] = useState(15);
    const [pageIndex, setPageIndex] = useState(0);

    const { data, status, error } = useQuery({
        queryKey: [
            'book',
            query,
            selectedGenres,
            orderBy,
            orderDirection,
            pageIndex,
            pageSize,
        ],
        queryFn: () =>
            api.book.search({
                query,
                genres: selectedGenres,
                pageable: {
                    page: pageIndex,
                    size: pageSize,
                    sort:
                        orderBy !== undefined
                            ? [`${orderBy},${orderDirection ?? ''}`]
                            : [],
                },
            }),
    });

    if (status === 'error') {
        toast.error(error.message);
        return <div></div>;
    }

    return (
        <main className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Discover Books</h1>
                <p className="text-gray-600">
                    Browse our collection of popular books across various genres
                </p>
            </div>

            <Tabs defaultValue="grid" className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            className="pl-10 h-10 border-gray-200"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(value) => setQuery(value.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <GenreSelect
                            selectedGenres={selectedGenres}
                            setSelectedGenres={setSelectedGenres}
                        />
                        <div className="flex gap-2">
                            <Select
                                onValueChange={(value) => setOrderBy(value)}
                            >
                                <SelectTrigger className="w-[120px] my-auto h-10 border-gray-200">
                                    <SelectValue placeholder="Sort by..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="publicationDate">
                                        Publication Date
                                    </SelectItem>
                                    <SelectItem value="totalRating">
                                        Rate
                                    </SelectItem>
                                    <SelectItem value="view">View</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                onValueChange={(value) =>
                                    setOrderDirection(value)
                                }
                            >
                                <SelectTrigger className="w-[120px] my-auto h-10 border-gray-200">
                                    <SelectValue placeholder="Ascending" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">
                                        Ascending
                                    </SelectItem>
                                    <SelectItem value="desc">
                                        Descending
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <TabsList className="ml-auto h-10">
                            <TabsTrigger value="grid" className="px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        width="7"
                                        height="7"
                                        x="3"
                                        y="3"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="14"
                                        y="3"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="14"
                                        y="14"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="3"
                                        y="14"
                                        rx="1"
                                    />
                                </svg>
                            </TabsTrigger>
                            <TabsTrigger value="list" className="px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </svg>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                <TabsContent value="grid" className="mt-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {data?.content.map((book) => <BookCard {...book} />)}
                    </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                    <div className="space-y-3">
                        {data?.content.map((book) => (
                            <BookCardFull {...book} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
            <Pagination
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                pageCount={data?.totalPages ?? 0}
                entryCount={data?.totalElements ?? 0}
            />
        </main>
    );
};
