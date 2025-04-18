import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
const ADMIN_API_URL =
    import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchWrapper = (url: RequestInfo | URL, init?: RequestInit) => {
    const token = localStorage.getItem('token');

    return fetch(`${ADMIN_API_URL}/api/v1/${url}`, {
        ...init,
        headers: {
            Authorization: token === null ? '' : `Bearer ${token}`,
            ...init?.headers,
        },
    });
};

export const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
