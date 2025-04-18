import { DeleteIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { DataTable } from './data-table';
import { fetchWrapper } from '@/lib/utils';

export const BookReport = () => {
    return (
        <DataTable
            dataApi="book/report"
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
                    accessorKey: 'reportingUser',
                    header: 'Reporting User',
                },
                {
                    accessorKey: 'reason',
                    header: 'Reason',
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Created At',
                },
            ]}
            action={{
                dismiss: {
                    itemNameColumn: 'title',
                    itemType: 'report',
                    icon: Trash2Icon,
                    fn: async (data) => {
                        const response = await fetchWrapper('book/report', {
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
                            throw new Error('Failed to dismiss report');
                    },
                },
                delete: {
                    itemNameColumn: 'title',
                    itemType: 'book',
                    icon: TrashIcon,
                    fn: async (data) => {
                        const response = await fetchWrapper('book', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                id: data.bookId,
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
