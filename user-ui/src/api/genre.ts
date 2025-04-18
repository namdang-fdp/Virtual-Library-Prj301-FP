import { fetchWrapper } from '.';

export const get = async () => {
    const response = await fetchWrapper(`genre/all`);

    if (!response.ok) {
        throw new Error('Failed to get genre list');
    }

    return (await response.json()) as string[];
};
