import { fetchWrapper, Pageable } from '.';

export type Book = {
    id: string;
    isbn: string;
    postedUser: string;
    title: string;
    coverPath: string;
    authors: string[];
    genres: string[];
    publicationDate: string;
    summary: string;
    pdfPath: string;
    view: number;
    totalRating: number;
    ratingCount: number;
};

export type Comment = {
    id: string;
    username: string;
    content: string;
    createdAt: string;
};

type SearchRequest = {
    query?: string;
    genres?: string[];
    pageable: Pageable;
};

type SearchResponse = {
    totalPages: number;
    totalElements: number;
    content: Book[];
};

type UploadBookRequest = {
    isbn: string;
    title: string;
    authors: string[];
    genres: string[];
    publicationDate: Date;
    summary: string;
};

export const search = async ({ query, genres, pageable }: SearchRequest) => {
    const params = new URLSearchParams({
        page: pageable.page.toString(),
        size: pageable.size.toString(),
    });

    pageable.sort.forEach((sort) => params.append('sort', sort));

    if (query !== undefined) {
        params.set('query', query);
    }

    if (genres !== undefined) {
        genres.forEach((genre) => params.append('genres', genre));
    }

    const response = await fetchWrapper(`book?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch books with given datas');
    }

    return (await response.json()) as SearchResponse;
};

export const get = async (id: string) => {
    const response = await fetchWrapper(`book/${id}`);

    if (!response.ok) {
        throw new Error(`Book with id ${id} does not existed`);
    }

    return (await response.json()) as Book;
};

export const getComment = async (id: string) => {
    const response = await fetchWrapper(`book/${id}/comment`);

    if (!response.ok) {
        throw new Error(`Failed to fetch comment for book with id ${id}`);
    }

    return (await response.json()) as Comment[];
};

export const uploadBook = async (
    values: UploadBookRequest,
    coverFile: File,
    pdfFile: File,
) => {
    const formData = new FormData();

    formData.append('coverFile', coverFile);
    formData.append('pdfFile', pdfFile);
    formData.append(
        'uploadBookRequest',
        new Blob([JSON.stringify(values)], {
            type: 'application/json',
        }),
    );

    const response = await fetchWrapper(
        'book',
        {
            method: 'POST',
            body: formData,
        },
        true,
    );

    if (!response.ok) {
        throw new Error('Failed to upload book');
    }
};

export const rate = async (id: string, rating: number) => {
    const response = await fetchWrapper(
        `book/${id}/rating`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating,
            }),
        },
        true,
    );

    if (!response.ok) {
        throw new Error('Failed to rate book');
    }
};

export const comment = async (id: string, content: string) => {
    const response = await fetchWrapper(
        `book/${id}/comment`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            }),
        },
        true,
    );

    if (!response.ok) {
        throw new Error(`Failed to post comment for book with id ${id}`);
    }

    return (await response.json()) as Book;
};

export const report = async (id: string, reason: string) => {
    const response = await fetchWrapper(
        `book/${id}/report`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason }),
        },
        true,
    );

    if (!response.ok) {
        throw new Error(`Failed to report book with id ${id}`);
    }
};

export const view = async (id: string) => {
    const response = await fetchWrapper(`book/${id}/view`);

    if (!response.ok) {
        throw new Error('Failed to increase view');
    }
};
