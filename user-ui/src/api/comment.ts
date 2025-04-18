import { fetchWrapper } from '.';

export const report = async (id: string, reason: string) => {
    const response = await fetchWrapper(
        `comment/${id}/report`,
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
        throw new Error(`Failed to report comment with id ${id}`);
    }
};
