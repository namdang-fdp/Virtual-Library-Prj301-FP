import { toast } from 'sonner';

const USER_API_URL =
    import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const fetchWrapper = (
    url: RequestInfo | URL,
    init?: RequestInit,
    authRequired?: boolean,
) => {
    const apiUrl = `${USER_API_URL}/api/v1/${url}`;
    if (!authRequired) {
        return fetch(apiUrl, init);
    }

    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('You must be logged in to do this action');
    }

    return fetch(apiUrl, {
        ...init,
        headers: {
            Authorization: `Bearer ${token}`,
            ...init?.headers,
        },
    });
};

export type Pageable = {
    page: number;
    size: number;
    sort: string[];
};

export * as auth from './auth';
export * as book from './book';
export * as genre from './genre';
export * as user from './user';
export * as comment from './comment';
