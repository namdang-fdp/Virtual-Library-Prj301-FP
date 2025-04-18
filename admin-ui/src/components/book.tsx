import { DataTable } from '@/components/data-table';
import { fetchWrapper } from '@/lib/utils';
import { TrashIcon } from 'lucide-react';

export const Book = () => {
    return (
        <DataTable
            dataApi="book/"
            queryKey="title"
            columns={[
                {
                    accessorKey: 'id',
                    header: 'Id',
                },
                {
                    accessorKey: 'title',
                    header: 'Title',
                },
                {
                    accessorKey: 'authors',
                    header: 'Authors',
                    cell: ({ row }) => {
                        const authors: string[] = row.getValue('authors');
                        const formatted = authors.join(', ');
                        return <div>{formatted}</div>;
                    },
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Created At',
                },
            ]}
            action={{
                delete: {
                    itemType: 'book',
                    itemNameColumn: 'title',
                    icon: TrashIcon,
                    fn: async (data) => {
                        const response = await fetchWrapper('book/', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                id: data.id,
                            }),
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!response.ok)
                            throw new Error('Failed to delete book');
                    },
                },
            }}
        />
    );
};
